import { Link } from "@tanstack/react-router";
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
  to = "/get-started",
  children,
  appearance = "",
}: {
  to?: string;
  children: ReactNode;
  appearance?: string;
}) {
  return (
    <Link to={to} className={`button ${appearance}`}>
      {children}
    </Link>
  );
}
