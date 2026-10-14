type BlockLabelProps = {
  title: string;
  text: string;
  className?: string;
};

/** A short pink handwritten heading with a grey line under it, like the KIPA case study. */
export function BlockLabel({ title, text, className = "" }: BlockLabelProps) {
  return (
    <div className={`flex flex-col gap-0.5 ${className}`}>
      <h2 className="font-hand text-[20px] leading-7 text-accent">{title}</h2>
      <p className="text-[12px] leading-[19px] text-muted">{text}</p>
    </div>
  );
}
