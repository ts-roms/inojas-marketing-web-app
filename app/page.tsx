import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Introduction } from "@/components/sections/Introduction";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { ValueProps } from "@/components/sections/ValueProps";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { ProjectsPreview } from "@/components/sections/ProjectsPreview";
import { ClientsStrip } from "@/components/sections/ClientsStrip";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Introduction />
      <ServicesOverview />
      <ValueProps />
      <ProductShowcase />
      <ProjectsPreview />
      <ClientsStrip tone="white" />
      <ProcessSection />
      <TrustSection />
      <AboutPreview />
      <CtaBanner />
    </>
  );
}
