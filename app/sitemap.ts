import type { MetadataRoute } from "next";
import { vendorProjects } from "@/data/company";
import { equipment } from "@/data/products";
import { site } from "@/data/site";

type Frequency = MetadataRoute.Sitemap[number]["changeFrequency"];

/** Static routes. Add new top-level pages here when they are created. */
const staticRoutes: { path: string; priority: number; changeFrequency: Frequency }[] = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/about", priority: 0.8, changeFrequency: "yearly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/equipment", priority: 0.9, changeFrequency: "monthly" },
  { path: "/projects", priority: 0.8, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticEntries = staticRoutes.map((route) => ({
    url: `${site.url}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Detail pages are generated from the same data as the pages themselves, so
  // the sitemap can never fall behind the catalogue.
  const equipmentEntries = equipment.map((item) => ({
    url: `${site.url}/equipment/${item.id}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const projectEntries = vendorProjects.map((project) => ({
    url: `${site.url}/projects/${project.id}`,
    lastModified,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...equipmentEntries, ...projectEntries];
}
