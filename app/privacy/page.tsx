import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/layout/LegalPage";
import { site } from "@/data/site";

const title = "Privacy Policy";
const description = `How ${site.name} handles personal information submitted through this website. Placeholder document pending legal review.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

const sections: LegalSection[] = [
  {
    heading: "What this policy covers",
    paragraphs: [
      "This policy is intended to explain what personal information is collected through this website, why it is collected, how long it is kept and who it is shared with.",
      "The final wording must comply with the Philippine Data Privacy Act of 2012 (Republic Act No. 10173) and should be reviewed by the company's legal adviser before launch.",
    ],
  },
  {
    heading: "Information collected through this site",
    paragraphs: [
      "The only personal information this website asks for is what a visitor enters into the contact form: name, email address, optional phone number, subject and message.",
      "Form submissions are validated in the browser and again on the server, then passed to whichever delivery service the company configures. Until that service is configured, submissions are not stored or forwarded anywhere.",
    ],
  },
  {
    heading: "Cookies and analytics",
    paragraphs: [
      "As built, this website sets no cookies and loads no third-party analytics, advertising or tracking scripts. If any are added later, this section must be updated and an appropriate consent mechanism introduced.",
    ],
  },
  {
    heading: "Your rights",
    paragraphs: [
      "Describe here how visitors can request access to, correction of, or deletion of their personal data, and how long enquiries are retained.",
    ],
  },
  {
    heading: "Contact",
    paragraphs: [
      "Name the data controller, the postal address for written requests, and a contact route for privacy questions.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title={title}
      description="A structural placeholder describing how information submitted through this site is handled."
      sections={sections}
    />
  );
}
