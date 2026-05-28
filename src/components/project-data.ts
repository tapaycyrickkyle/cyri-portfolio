import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import type { ProjectItem } from "./portfolio-content";
import { fallbackProjects } from "./portfolio-content";

type RawProjectInfo = {
  projectTitle: string;
  role: string;
  projectType: string;
  year: string;
  status: string;
  overview: string;
  technologies: string;
  results: string;
  githubLink: string;
  imageAlt: string;
};

const PROJECTS_DIR = path.join(process.cwd(), "public", "images", "projects");
const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif"]);
const PROJECT_ORDER = [
  "Business-Chatbot",
  "Doro",
  "TESDA-E-Assess",
  "Bayanihan",
  "Alpha-Nova-Kids",
  "Ordering-System",
] as const;

function toFieldKey(label: string) {
  const words = label
    .trim()
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);

  return words
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join("");
}

function splitTechnologies(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => item.toUpperCase());
}

function buildFocus(project: RawProjectInfo) {
  return [project.role, project.projectType, project.year].filter(Boolean);
}

function buildOutcomes(project: RawProjectInfo) {
  return project.results
    .split(/(?:\r?\n|;)\s*/)
    .map((item) => item.trim())
    .filter(Boolean);
}

async function parseProjectInfoFile(filePath: string) {
  const content = await readFile(filePath, "utf8");
  const rawInfo: Partial<RawProjectInfo> = {};

  for (const line of content.split(/\r?\n/)) {
    if (!line.includes(":")) {
      continue;
    }

    const [label, ...valueParts] = line.split(":");
    const value = valueParts.join(":").trim();
    const key = toFieldKey(label) as keyof RawProjectInfo;

    rawInfo[key] = value;
  }

  if (!rawInfo.projectTitle || !rawInfo.overview) {
    return null;
  }

  return {
    projectTitle: rawInfo.projectTitle ?? "",
    role: rawInfo.role ?? "",
    projectType: rawInfo.projectType ?? "",
    year: rawInfo.year ?? "",
    status: rawInfo.status ?? "Project",
    overview: rawInfo.overview ?? "",
    technologies: rawInfo.technologies ?? "",
    results: rawInfo.results ?? "",
    githubLink: rawInfo.githubLink ?? "",
    imageAlt: rawInfo.imageAlt ?? "",
  } satisfies RawProjectInfo;
}

async function resolveProjectImage(folderPath: string, folderName: string) {
  const entries = await readdir(folderPath, { withFileTypes: true });
  const files = entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name);

  const preferredFile = files.find((file) =>
    /^cover\.(png|jpe?g|webp|avif)$/i.test(file),
  );

  const fallbackFile = files.find((file) =>
    IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()),
  );

  const imageFile = preferredFile ?? fallbackFile;

  if (!imageFile) {
    return null;
  }

  return `/images/projects/${folderName}/${imageFile}`;
}

async function resolveProjectImages(folderPath: string, folderName: string) {
  const entries = await readdir(folderPath, { withFileTypes: true });
  const imageFiles = entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
    .sort((left, right) =>
      left.localeCompare(right, undefined, { numeric: true }),
    );

  const preferredIndex = imageFiles.findIndex((file) =>
    /^cover\.(png|jpe?g|webp|avif)$/i.test(file),
  );

  if (preferredIndex > 0) {
    const [coverFile] = imageFiles.splice(preferredIndex, 1);
    imageFiles.unshift(coverFile);
  }

  return imageFiles.map((file) => `/images/projects/${folderName}/${file}`);
}

async function loadProjectFromFolder(
  folderName: string,
): Promise<ProjectItem | null> {
  const folderPath = path.join(PROJECTS_DIR, folderName);
  const infoPath = path.join(folderPath, "info.txt");

  try {
    const [projectInfo, imagePath, imageGallery] = await Promise.all([
      parseProjectInfoFile(infoPath),
      resolveProjectImage(folderPath, folderName),
      resolveProjectImages(folderPath, folderName),
    ]);

    if (!projectInfo || !imagePath) {
      return null;
    }

    return {
      title: projectInfo.projectTitle,
      description: projectInfo.overview,
      summary: projectInfo.overview,
      tags: splitTechnologies(projectInfo.technologies),
      image: imagePath,
      images: imageGallery,
      alt:
        projectInfo.imageAlt ||
        `${projectInfo.projectTitle} project screenshot`,
      status: projectInfo.status,
      role: projectInfo.role,
      projectType: projectInfo.projectType,
      year: projectInfo.year,
      focus: buildFocus(projectInfo),
      outcomes: buildOutcomes(projectInfo),
      githubLink: projectInfo.githubLink,
    } satisfies ProjectItem;
  } catch {
    return null;
  }
}

export async function getProjects(): Promise<ProjectItem[]> {
  try {
    const entries = await readdir(PROJECTS_DIR, { withFileTypes: true });
    const projectFolders = entries
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort((left, right) => {
        const leftIndex = PROJECT_ORDER.indexOf(
          left as (typeof PROJECT_ORDER)[number],
        );
        const rightIndex = PROJECT_ORDER.indexOf(
          right as (typeof PROJECT_ORDER)[number],
        );

        if (leftIndex === -1 && rightIndex === -1) {
          return left.localeCompare(right);
        }

        if (leftIndex === -1) {
          return 1;
        }

        if (rightIndex === -1) {
          return -1;
        }

        return leftIndex - rightIndex;
      });

    const loadedProjects = (
      await Promise.all(projectFolders.map(loadProjectFromFolder))
    ).filter((project): project is ProjectItem => project !== null);

    return loadedProjects.length > 0 ? loadedProjects : fallbackProjects;
  } catch {
    return fallbackProjects;
  }
}
