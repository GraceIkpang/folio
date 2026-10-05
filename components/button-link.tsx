import type { ComponentProps } from "react";

type ButtonLinkProps = ComponentProps<"a"> & {
  variant?: "primary" | "secondary";
};

const variants = {
  primary: "border-accent bg-accent text-white hover:brightness-95",
  secondary: "border-line text-ink hover:bg-surface",
};

/** A pill-shaped link that looks like a button. */
export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ButtonLinkProps) {
  return (
    <a
      className={`inline-flex items-center gap-2 rounded-full border px-[18px] py-[10px] text-ui transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
