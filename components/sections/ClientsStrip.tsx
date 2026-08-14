import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { clients } from "@/data/company";

/**
 * Clients listed in the company profile.
 *
 * Logos sit on uniform white tiles rather than being recoloured or
 * desaturated, so each mark is shown as its owner intended.
 */
export function ClientsStrip({ tone = "canvas" }: { tone?: "canvas" | "white" }) {
  const withLogos = clients.filter((client) => client.logo);
  const withoutLogos = clients.filter((client) => !client.logo);

  return (
    <Section tone={tone} ariaLabelledby="clients-heading">
      <Container>
        <SectionHeading
          id="clients-heading"
          align="center"
          eyebrow="Our valued clients"
          title="Trusted by manufacturers, logistics hubs and facilities teams"
          description="A selection of the companies whose forklifts, pallet trucks, cooling systems and dock equipment we keep running."
        />

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {withLogos.map((client) => (
            <li key={client.name}>
              <div className="flex h-24 items-center justify-center rounded-xl bg-white p-5 ring-1 ring-hairline transition-shadow duration-300 hover:shadow-card">
                <Image
                  src={client.logo as string}
                  alt={client.name}
                  width={200}
                  height={80}
                  loading="lazy"
                  className="max-h-full w-auto object-contain"
                />
              </div>
            </li>
          ))}
        </ul>

        {withoutLogos.length > 0 ? (
          <p className="mt-6 text-center text-sm text-brand-500">
            Also serving {withoutLogos.map((client) => client.name).join(" and ")}.
          </p>
        ) : null}
      </Container>
    </Section>
  );
}
