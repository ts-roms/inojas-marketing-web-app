import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { Icon } from "@/components/ui/icons";
import { fill, t } from "@/lib/i18n";
import { site, textVars } from "@/data/site";

export type LegalSection = {
  heading: string;
  paragraphs: string[];
};

/** Split on the placeholder so only the address becomes a link, while the
 *  sentence stays a single translatable string in the locale file. */
const [questionsBefore = "", questionsAfter = ""] = t.legal.questions.split("{email}");

type LegalPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  sections: LegalSection[];
};

/**
 * Shared shell for the placeholder legal pages.
 *
 * The pages exist so no footer link is broken, and they say clearly that the
 * text is a structural placeholder rather than reviewed legal wording.
 */
export function LegalPage({ eyebrow, title, description, sections }: LegalPageProps) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} description={description} />

      <Section tone="white">
        <Container width="prose">
          <div className="flex gap-4 rounded-xl bg-amber-50 p-5 ring-1 ring-inset ring-amber-200">
            <Icon name="alert" className="mt-0.5 size-5 shrink-0 text-amber-700" />
            <p className="text-sm leading-relaxed text-amber-900">
              <strong className="font-semibold">{t.legal.notice.label}</strong>{" "}
              {fill(t.legal.notice.body, textVars)}
            </p>
          </div>

          <div className="mt-12 space-y-12">
            {sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-h3 text-brand-900">{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="mt-4 leading-relaxed text-brand-600">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>

          <p className="mt-14 border-t border-hairline pt-6 text-sm text-brand-500">
            {questionsBefore}
            <a
              href={`mailto:${site.contact.email}`}
              className="text-accent-700 underline underline-offset-4 hover:text-accent-800"
            >
              {site.contact.email}
            </a>
            {questionsAfter}
          </p>
        </Container>
      </Section>
    </>
  );
}
