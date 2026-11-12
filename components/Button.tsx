import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  label: string;
  /** Text revealed on hover. Defaults to `label`. */
  hoverLabel?: string;
  variant?: "primary" | "secondary";
  className?: string;
};

function ButtonText({ label, hoverLabel }: { label: string; hoverLabel?: string }) {
  return (
    <>
      <span className="text text-1">{label}</span>
      <span className="text text-2" aria-hidden="true">
        {hoverLabel ?? label}
      </span>
    </>
  );
}

const classes = (variant: ButtonProps["variant"], extra?: string) =>
  ["btn", `btn-${variant ?? "primary"}`, extra].filter(Boolean).join(" ");

/** Animated two-line button rendered as a link. */
export function ButtonLink({
  href,
  label,
  hoverLabel,
  variant,
  className,
}: ButtonProps & { href: string }) {
  const content = <ButtonText label={label} hoverLabel={hoverLabel} />;
  const cls = classes(variant, className);

  // tel:, https:, mailto: etc. are not app routes
  if (/^[a-z]+:/i.test(href)) {
    return (
      <a href={href} className={cls}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );
}

/** Same visual style, rendered as a <button>. */
export function Button({
  label,
  hoverLabel,
  variant,
  className,
  type = "button",
}: ButtonProps & { type?: "button" | "submit" }) {
  return (
    <button type={type} className={classes(variant, className)}>
      <ButtonText label={label} hoverLabel={hoverLabel} />
    </button>
  );
}

export function SectionHeading({
  subtitle,
  title,
  center = false,
  id,
  children,
}: {
  subtitle: string;
  title: string;
  center?: boolean;
  id?: string;
  children?: ReactNode;
}) {
  const align = center ? " text-center" : "";
  return (
    <>
      <p className={`section-subtitle label-2${align}`} id={id}>
        {subtitle}
      </p>
      <h2 className={`headline-1 section-title${align}`}>{title}</h2>
      {children}
    </>
  );
}
