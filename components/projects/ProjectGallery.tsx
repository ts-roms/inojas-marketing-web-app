"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import { fill, t } from "@/lib/i18n";
import { projectPhotos, type ProjectPhoto } from "@/data/company";

type Discipline = ProjectPhoto["discipline"] | "all";

const filters: { id: Discipline; label: string }[] = [
  { id: "all", label: t.projects.gallery.all },
  { id: "hydraulics", label: t.projects.disciplines.hydraulics },
  { id: "cooling", label: t.projects.disciplines.cooling },
  { id: "motors", label: t.projects.disciplines.motors },
  { id: "fabrication", label: t.projects.disciplines.fabrication },
];

const SIZES = "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw";

/**
 * Gallery of completed work, filtered by discipline. Every photograph is the
 * company's own, taken from the profile document — captions describe what is
 * actually in the frame.
 */
export function ProjectGallery() {
  const [active, setActive] = useState<Discipline>("all");

  const visible = useMemo(
    () =>
      active === "all"
        ? projectPhotos
        : projectPhotos.filter((photo) => photo.discipline === active),
    [active],
  );

  return (
    <div>
      <div className="flex flex-col gap-5 border-b border-hairline pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div role="group" aria-label={t.projects.gallery.groupLabel} className="flex flex-wrap gap-2">
          {filters.map((filter) => {
            const isActive = filter.id === active;
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActive(filter.id)}
                aria-pressed={isActive}
                className={cn(
                  "inline-flex h-10 items-center rounded-md px-4 text-sm font-medium transition-colors duration-200",
                  isActive
                    ? "bg-brand-900 text-white"
                    : "bg-white text-brand-600 ring-1 ring-inset ring-brand-200 hover:bg-brand-50 hover:text-brand-900",
                )}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        <p aria-live="polite" className="text-sm text-brand-500">
          {fill(t.projects.gallery.count, {
            visible: visible.length,
            total: projectPhotos.length,
          })}
        </p>
      </div>

      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((photo, index) => (
          <li key={photo.src}>
            <figure className="group overflow-hidden rounded-xl bg-brand-950 ring-1 ring-hairline">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes={SIZES}
                  priority={index < 3}
                  loading={index < 3 ? undefined : "lazy"}
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
              </div>
              <figcaption className="flex items-center gap-2 bg-white px-4 py-3.5 text-sm font-medium text-brand-800">
                <span
                  aria-hidden="true"
                  className="size-1.5 shrink-0 rounded-full bg-accent-500"
                />
                {photo.caption}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
}
