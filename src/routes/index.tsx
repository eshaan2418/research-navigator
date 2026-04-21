import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Wheel } from "@/components/move/Wheel";
import { FacultyBubble } from "@/components/move/FacultyBubble";
import { FacultyDialog } from "@/components/move/FacultyDialog";
import { ThemesEditor } from "@/components/move/ThemesEditor";
import {
  DEFAULT_HUB,
  DEFAULT_TAGLINE,
  DEFAULT_THEMES,
  FACULTY,
  type Faculty,
  type Theme,
  type ThemeId,
} from "@/data/move";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MOVE — Mobility Innovation Centre at York University" },
      {
        name: "description",
        content:
          "MOVE is York University's Mobility Innovation Centre at Lassonde — uniting 23 PIs across 5 themes: Autonomous, Sustainable, Analytics, IoT/Connected, and AR/VR mobility.",
      },
      { property: "og:title", content: "MOVE — Mobility Innovation Centre" },
      {
        property: "og:description",
        content:
          "Explore York University's mobility research ecosystem — click a theme to filter PIs, hover for details, click a bubble for full profiles.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: MoveIndex,
});

const STORAGE_KEY = "move-config-v1";

type Stored = {
  themes: Theme[];
  tagline: string;
  hub: string;
  colors: Record<string, string>;
};

function loadStored(): Stored | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Stored;
  } catch {
    return null;
  }
}

function MoveIndex() {
  const [themes, setThemes] = useState<Theme[]>(DEFAULT_THEMES);
  const [tagline, setTagline] = useState(DEFAULT_TAGLINE);
  const [hub, setHub] = useState(DEFAULT_HUB);
  const [colors, setColors] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<Set<ThemeId>>(new Set());
  const [openPerson, setOpenPerson] = useState<Faculty | null>(null);

  // Hydrate from localStorage on mount
  useEffect(() => {
    const s = loadStored();
    if (s) {
      setThemes(s.themes);
      setTagline(s.tagline);
      setHub(s.hub);
      setColors(s.colors ?? {});
    }
  }, []);

  // Persist
  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ themes, tagline, hub, colors } satisfies Stored),
    );
  }, [themes, tagline, hub, colors]);

  // Apply color overrides as inline CSS variables on root
  const styleOverride = useMemo(() => {
    const out: Record<string, string> = {};
    for (const [key, val] of Object.entries(colors)) {
      out[key] = val;
    }
    return out as React.CSSProperties;
  }, [colors]);

  const toggleTheme = (id: ThemeId, additive: boolean) => {
    setSelected((prev) => {
      const next = new Set(additive ? prev : prev);
      if (!additive) {
        // single-click: toggle exclusively
        if (prev.has(id) && prev.size === 1) {
          next.clear();
        } else {
          next.clear();
          next.add(id);
        }
      } else {
        if (next.has(id)) next.delete(id);
        else next.add(id);
      }
      return next;
    });
  };

  const resetFilters = () => setSelected(new Set());

  const resetEditor = () => {
    setThemes(DEFAULT_THEMES);
    setTagline(DEFAULT_TAGLINE);
    setHub(DEFAULT_HUB);
    setColors({});
  };

  const facultyVisible = (p: Faculty) => {
    if (selected.size === 0) return true;
    return p.themes.some((t) => selected.has(t));
  };

  return (
    <div
      className="min-h-screen bg-brand-cream text-foreground"
      style={styleOverride}
    >
      <h1 className="sr-only">
        MOVE — Mobility Innovation Centre at York University
      </h1>

      <main className="mx-auto flex min-h-screen w-full max-w-[1400px] flex-col gap-10 px-6 py-10 md:flex-row md:items-center md:gap-12 md:py-16">
        {/* Left: tagline + wheel */}
        <section className="flex flex-col items-center md:w-1/2">
          <p
            className="mb-6 text-center text-[11px] font-light uppercase text-foreground/80 md:text-sm"
            style={{ letterSpacing: "0.18em" }}
          >
            {tagline}
          </p>
          <Wheel
            themes={themes}
            selected={selected}
            onToggle={toggleTheme}
            onReset={resetFilters}
            hubLabel={hub}
          />
          <p className="mt-4 max-w-md text-center text-xs text-muted-foreground">
            Click a theme to filter · shift-click to combine · click{" "}
            <span className="font-semibold text-foreground">{hub}</span> to reset
          </p>
        </section>

        {/* Right: faculty grid */}
        <section className="md:w-1/2">
          <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:gap-x-6 md:gap-y-8">
            {FACULTY.map((p) => (
              <div key={p.id} className="flex justify-center">
                <FacultyBubble
                  person={p}
                  themes={themes}
                  faded={!facultyVisible(p)}
                  onOpen={() => setOpenPerson(p)}
                />
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60 py-6 text-center text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        MOVE · Lassonde School of Engineering · York University
      </footer>

      <FacultyDialog
        person={openPerson}
        themes={themes}
        onClose={() => setOpenPerson(null)}
      />

      <ThemesEditor
        themes={themes}
        tagline={tagline}
        hub={hub}
        colorOverrides={colors}
        onChangeThemes={setThemes}
        onChangeTagline={setTagline}
        onChangeHub={setHub}
        onChangeColor={(varName, val) =>
          setColors((c) => ({ ...c, [varName]: val }))
        }
        onReset={resetEditor}
      />
    </div>
  );
}
