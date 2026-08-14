import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/icons";
import type { Service } from "@/data/services";

type ServiceCardProps = {
  service: Service;
  /** `full` adds the benefit list used on the services page. */
  variant?: "compact" | "full";
};

/**
 * Service summary card. The whole card is clickable via a stretched link, so
 * there is still exactly one focusable link per card for keyboard users.
 */
export function ServiceCard({ service, variant = "compact" }: ServiceCardProps) {
  return (
    <Card as="article" interactive className="flex h-full flex-col group">
      <span className="inline-flex size-12 items-center justify-center rounded-lg bg-brand-50 text-brand-800 ring-1 ring-inset ring-brand-100 transition-colors duration-300 group-hover:bg-accent-50 group-hover:text-accent-700 group-hover:ring-accent-200">
        <Icon name={service.icon} className="size-6" />
      </span>

      <h3 className="mt-6 text-h3 text-brand-900">
        <Link
          href={`/services/${service.id}`}
          className="after:absolute after:inset-0 after:rounded-xl after:content-['']"
        >
          {service.title}
        </Link>
      </h3>

      <p className="mt-3 text-[0.9375rem] leading-relaxed text-brand-600">{service.summary}</p>

      {variant === "full" ? (
        <ul className="mt-5 space-y-2.5 border-t border-hairline pt-5">
          {service.benefits.slice(0, 3).map((benefit) => (
            <li key={benefit} className="flex items-start gap-2.5 text-sm text-brand-600">
              <Icon name="check" className="mt-0.5 size-4 shrink-0 text-accent-600" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      ) : null}

      <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-brand-800 transition-colors group-hover:text-accent-700">
        Learn more
        <Icon
          name="arrowRight"
          className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
        />
      </span>
    </Card>
  );
}
