import { Link } from "@tanstack/react-router";
import { cityHref } from "../../data/cityLinks";
import { useCityScope } from "../../features/city/useCityScope";
import type { ButtonHTMLAttributes, ReactNode } from "react";
export function Button({
  children,
  appearance = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { appearance?: string }) {
  return (
    <button className={`button ${appearance}`} {...props}>
      {children}
    </button>
  );
}
export function ButtonLink({
  to,
  children,
  appearance = "",
}: {
  to?: string;
  children: ReactNode;
  appearance?: string;
}) {
  const slug = useCityScope();
  return (
    <Link to={to ?? cityHref(slug, "get-started")} className={`button ${appearance}`}>
      {children}
    </Link>
  );
}
