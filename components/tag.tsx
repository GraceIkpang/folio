type TagProps = {
  children: string;
  highlighted?: boolean;
};

/** A small rounded label, e.g. "Product design" or "Web". */
export function Tag({ children, highlighted = false }: TagProps) {
  return (
    <li
      className={`rounded-full border px-2.5 py-1 text-tag ${
        highlighted
          ? "border-transparent bg-accent-soft font-medium text-accent"
          : "border-line bg-canvas text-muted"
      }`}
    >
      {children}
    </li>
  );
}
