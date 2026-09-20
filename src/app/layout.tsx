import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { Playfair_Display } from "next/font/google";

import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "../lib/site";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_PH",
    images: [
      {
        url: "/images/profile-picture.jpg",
        alt: "Portrait of Cyrick Kyle B. Tapay.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/images/profile-picture.jpg"],
  },
  creator: "Cyrick Kyle B. Tapay",
  publisher: SITE_NAME,
  verification: {
    google: "_HiNKIDh3ten_H3L9z5_Ktjm7fNaBMFs6deeN-968Dg",
  },
  icons: {
    icon: "/images/profile-picture.jpg",
    shortcut: "/images/profile-picture.jpg",
  apple: "/images/profile-picture.jpg",
  },
};

const personAndWebsiteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: "en",
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Cyrick Kyle B. Tapay",
      url: SITE_URL,
      jobTitle: "Freelance Web Developer",
      homeLocation: {
        "@type": "Place",
        name: "Dolores, Eastern Samar, Philippines",
      },
      sameAs: [
        "https://github.com/tapaycyrickkyle",
        "https://www.linkedin.com/in/tapay-cyrick-3593b032b/",
        "https://x.com/cyrix0801",
        "https://web.facebook.com/cyrick.kyle.tapay.2024",
        "https://www.instagram.com/cyrick3/",
      ],
    },
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const themeScript = `
  (function () {
    try {
      var storedTheme = window.localStorage.getItem("portfolio-theme");
      var isDark = storedTheme === "dark";
      document.documentElement.classList.toggle("dark", isDark);
      document.documentElement.style.colorScheme = isDark ? "dark" : "light";
    } catch (error) {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personAndWebsiteJsonLd).replace(
              /</g,
              "\\u003c",
            ),
          }}
        />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {children}
      </body>
    </html>
  );
}
