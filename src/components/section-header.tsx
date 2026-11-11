// Shared heading block for home sections: eyebrow pill, title and intro text.
export function SectionHeader({
  eyebrow,
  title,
  text,
}: {
  eyebrow?: string;
  title: string;
  text: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow && (
        <span className="mb-4 inline-block rounded-full border bg-card px-3 py-1 text-sm font-semibold text-primary shadow-sm">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-balance md:text-4xl">{title}</h2>
      <p className="mt-5 text-lg leading-relaxed text-muted-foreground text-pretty">{text}</p>
    </div>
  );
}
