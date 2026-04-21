import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import type { Faculty, Theme } from "@/data/move";

type Props = {
  person: Faculty;
  themes: Theme[];
  faded: boolean;
  onOpen: () => void;
};

export function FacultyBubble({ person, themes, faded, onOpen }: Props) {
  const personThemes = themes.filter((t) => person.themes.includes(t.id));

  return (
    <HoverCard openDelay={150} closeDelay={80}>
      <HoverCardTrigger asChild>
        <button
          type="button"
          onClick={onOpen}
          className="group flex flex-col items-center transition-opacity"
          style={{ opacity: faded ? 0.3 : 1 }}
          aria-label={`Open profile for ${person.first} ${person.last}`}
        >
          <span
            className="flex h-20 w-20 items-center justify-center rounded-full border border-brand-black/80 bg-bubble text-center px-1 leading-tight transition-transform group-hover:scale-105 group-focus-visible:scale-105 group-focus-visible:ring-2 group-focus-visible:ring-brand-red group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-brand-cream"
            style={{ fontSize: 11, fontWeight: 700 }}
          >
            <span>
              {person.first}
              <br />
              {person.last}
            </span>
          </span>
        </button>
      </HoverCardTrigger>
      <HoverCardContent
        side="top"
        align="center"
        className="w-72 border-brand-black/10 bg-card p-4 shadow-lg"
      >
        <div className="space-y-2">
          <div>
            <p className="text-sm font-bold text-foreground">
              {person.first} {person.last}
            </p>
            <p className="text-xs text-muted-foreground">{person.title}</p>
            <p className="text-xs text-muted-foreground">{person.department}</p>
          </div>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {personThemes.map((t) => (
              <span
                key={t.id}
                className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                style={{
                  backgroundColor: `var(${t.colorVar})`,
                  color: "var(--brand-black)",
                }}
              >
                {t.short}
              </span>
            ))}
          </div>
          <p className="pt-1 text-[10px] text-muted-foreground italic">
            Click to view full profile
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
