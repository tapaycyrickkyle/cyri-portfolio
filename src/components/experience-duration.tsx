"use client";

import { useEffect, useState } from "react";

type ExperienceDurationProps = {
  startMonth: string;
  initialDuration: string;
};

function getCalendarMonthIndex(date: Date) {
  return date.getFullYear() * 12 + date.getMonth();
}

function formatExperienceDuration(startMonth: string, now: Date) {
  const [yearText, monthText] = startMonth.split("-");
  const year = Number(yearText);
  const month = Number(monthText);

  if (!Number.isInteger(year) || !Number.isInteger(month) || month < 1 || month > 12) {
    return null;
  }

  const startMonthIndex = year * 12 + (month - 1);
  const elapsedMonths = Math.max(
    1,
    getCalendarMonthIndex(now) - startMonthIndex + 1,
  );
  const years = Math.floor(elapsedMonths / 12);
  const months = elapsedMonths % 12;

  if (years === 0) {
    return `${elapsedMonths} ${elapsedMonths === 1 ? "mo" : "mos"}`;
  }

  const yearLabel = `${years} ${years === 1 ? "yr" : "yrs"}`;
  const monthLabel = months
    ? ` ${months} ${months === 1 ? "mo" : "mos"}`
    : "";

  return `${yearLabel}${monthLabel}`;
}

function getDelayUntilNextMonth(now: Date) {
  const nextMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    1,
    0,
    0,
    1,
  );

  return Math.max(1000, nextMonth.getTime() - now.getTime());
}

export default function ExperienceDuration({
  startMonth,
  initialDuration,
}: ExperienceDurationProps) {
  const [duration, setDuration] = useState(initialDuration);

  useEffect(() => {
    let timer: number | undefined;

    function updateDuration() {
      const now = new Date();
      const nextDuration = formatExperienceDuration(startMonth, now);

      if (nextDuration) {
        setDuration(nextDuration);
      }

      timer = window.setTimeout(
        updateDuration,
        getDelayUntilNextMonth(now),
      );
    }

    updateDuration();

    return () => {
      if (timer !== undefined) {
        window.clearTimeout(timer);
      }
    };
  }, [startMonth]);

  return <>{duration}</>;
}
