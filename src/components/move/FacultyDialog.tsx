import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@/components/move/VisuallyHidden";
import type { Faculty, Theme } from "@/data/move";
import { Mail } from "lucide-react";

type Props = {
  person: Faculty | null;
  themes: Theme[];
  onClose: () => void;
};

export function FacultyDialog({ person, themes, onClose }: Props) {
  const open = person !== null;
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-[950px] p-0 overflow-hidden bg-white border-0 sm:rounded-xl">
        <VisuallyHidden>
          <DialogTitle>
            {person ? `${person.first} ${person.last} — MOVE PI Profile` : ""}
          </DialogTitle>
        </VisuallyHidden>
        {person && (
          person.slide ? (
            <img
              src={person.slide}
              alt={`${person.first} ${person.last} — MOVE research capability slide`}
              className="block w-full h-auto"
            />
          ) : (
            <FallbackCard person={person} themes={themes} />
          )
        )}
      </DialogContent>
    </Dialog>
  );
}

function FallbackCard({ person, themes }: { person: Faculty; themes: Theme[] }) {
  const personThemes = themes.filter((t) => person.themes.includes(t.id));
  const initials = `${person.first[0] ?? ""}${person.last[0] ?? ""}`;

  return (
    <article className="flex flex-col bg-white" style={{ aspectRatio: "16/10" }}>
      {/* Red header */}
      <header className="bg-brand-red px-10 py-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/90">
          MOVE Member · Mobility Innovation Centre
        </p>
        <h2 className="mt-1 text-2xl font-bold text-white">
          {person.first} {person.last}
        </h2>
      </header>

      {/* Body */}
      <div className="flex flex-1 gap-8 p-10">
        <div className="flex flex-col items-center gap-4">
          <div
            className="flex h-40 w-40 items-center justify-center rounded-full border-4 border-brand-black bg-bubble text-5xl font-bold text-brand-black"
            aria-hidden="true"
          >
            {initials}
          </div>
        </div>
        <div className="flex-1 space-y-4">
          <div>
            <p className="text-sm font-semibold text-brand-black">{person.title}</p>
            <p className="text-sm text-muted-foreground">{person.department}</p>
          </div>
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Research Themes
            </p>
            <div className="flex flex-wrap gap-2">
              {personThemes.map((t) => (
                <span
                  key={t.id}
                  className="rounded-full px-3 py-1 text-xs font-semibold"
                  style={{
                    backgroundColor: `var(${t.colorVar})`,
                    color: "var(--brand-black)",
                  }}
                >
                  {t.name}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Contact
            </p>
            <a
              href={`mailto:${person.email}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-brand-red hover:underline"
            >
              <Mail className="h-4 w-4" />
              {person.email}
            </a>
          </div>
          <p className="pt-2 text-xs italic text-muted-foreground">
            Full research capability slide coming soon.
          </p>
        </div>
      </div>

      {/* Black footer */}
      <footer className="bg-brand-black px-10 py-3 text-xs uppercase tracking-[0.2em] text-white/80">
        Lassonde School of Engineering · York University
      </footer>
    </article>
  );
}
