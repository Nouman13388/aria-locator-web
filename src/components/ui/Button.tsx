import { Link } from "@tanstack/react-router";
import type { ButtonHTMLAttributes, ReactNode } from "react";
export function Button({
  children,
  variant = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: string }) {
  return (
    <button className={`button ${variant}`} {...props}>
      {children}
    </button>
  );
}
export function ButtonLink({
  to = "/get-started",
  children,
  variant = "",
}: {
  to?: string;
  children: ReactNode;
  variant?: string;
}) {
  return (
    <Link to={to} className={`button ${variant}`}>
      {children}
    </Link>
  );
}
