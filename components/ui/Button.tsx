import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "@/components/ui/icons";

export type ButtonVariant = "primary" | "accent" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "group/btn inline-flex items-center justify-center gap-2 rounded-md font-medium tracking-tight " +
  "transition-[background-color,color,box-shadow,transform,border-color] duration-200 ease-out " +
  "disabled:pointer-events-none disabled:opacity-55 aria-disabled:pointer-events-none aria-disabled:opacity-55";

const variants: Record<ButtonVariant, string> = {
  /** Default action on light surfaces. */
  primary:
    "bg-brand-900 text-white shadow-subtle hover:bg-brand-800 hover:shadow-lift active:translate-y-px",
  /** Default action on dark surfaces. */
  accent:
    "bg-accent-600 text-white shadow-subtle hover:bg-accent-500 hover:shadow-lift active:translate-y-px",
  /** Companion action on light surfaces. */
  secondary:
    "bg-white text-brand-900 ring-1 ring-inset ring-brand-200 hover:bg-brand-50 hover:ring-brand-300",
  /** Companion action on dark surfaces. */
  outline: "text-white ring-1 ring-inset ring-white/30 hover:bg-white/10 hover:ring-white/50",
  ghost: "text-brand-700 hover:bg-brand-50 hover:text-brand-900",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-12 px-6 text-base",
};

type SharedProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Optional trailing icon; slides on hover for affordance. */
  icon?: IconName;
  className?: string;
  children: ReactNode;
};

type AnchorProps = SharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & { href: string };

type NativeButtonProps = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & { href?: never };

export type ButtonProps = AnchorProps | NativeButtonProps;

function isExternal(href: string): boolean {
  return /^(https?:)?\/\//.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");
}

/**
 * One button component for every call to action on the site, rendering an
 * anchor when given `href` and a native button otherwise — so links stay
 * links (keyboard, middle-click, prefetch) and actions stay buttons.
 */
export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", icon, className, children } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  const content = (
    <>
      {children}
      {icon ? (
        <Icon
          name={icon}
          className="size-4 shrink-0 transition-transform duration-200 ease-out group-hover/btn:translate-x-0.5"
        />
      ) : null}
    </>
  );

  if ("href" in props && typeof props.href === "string") {
    const { href, variant: _v, size: _s, icon: _i, className: _c, children: _ch, ...rest } = props;

    if (isExternal(href)) {
      const externalRel = href.startsWith("http") ? "noopener noreferrer" : undefined;
      return (
        <a
          href={href}
          className={classes}
          rel={externalRel}
          target={href.startsWith("http") ? "_blank" : undefined}
          {...rest}
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  const { variant: _v, size: _s, icon: _i, className: _c, children: _ch, ...rest } =
    props as NativeButtonProps;

  return (
    <button className={classes} {...rest}>
      {content}
    </button>
  );
}
