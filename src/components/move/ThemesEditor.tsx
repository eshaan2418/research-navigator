import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings2, RotateCcw } from "lucide-react";
import type { Theme } from "@/data/move";

type Props = {
  themes: Theme[];
  tagline: string;
  hub: string;
  colorOverrides: Record<string, string>;
  onChangeThemes: (t: Theme[]) => void;
  onChangeTagline: (s: string) => void;
  onChangeHub: (s: string) => void;
  onChangeColor: (varName: string, hsl: string) => void;
  onReset: () => void;
};

export function ThemesEditor({
  themes,
  tagline,
  hub,
  colorOverrides,
  onChangeThemes,
  onChangeTagline,
  onChangeHub,
  onChangeColor,
  onReset,
}: Props) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="fixed bottom-4 right-4 z-40 gap-2 border-brand-black/20 bg-white shadow-md hover:bg-bubble"
        >
          <Settings2 className="h-4 w-4" /> Edit themes
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto p-6">
        <SheetHeader>
          <SheetTitle>Customize the ecosystem</SheetTitle>
          <SheetDescription>
            Rename themes, swap colors, or change the tagline & hub label. Changes save to this browser.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="hub-label">Hub label</Label>
            <Input
              id="hub-label"
              value={hub}
              maxLength={8}
              onChange={(e) => onChangeHub(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tagline">Tagline</Label>
            <Input
              id="tagline"
              value={tagline}
              onChange={(e) => onChangeTagline(e.target.value)}
            />
          </div>

          <div>
            <Label className="mb-3 block">Themes</Label>
            <div className="space-y-3">
              {themes.map((t, idx) => (
                <div key={t.id} className="rounded-lg border border-border p-3">
                  <div className="flex items-center gap-3">
                    <ColorPicker
                      varName={t.colorVar}
                      value={colorOverrides[t.colorVar]}
                      onChange={(v) => onChangeColor(t.colorVar, v)}
                    />
                    <Input
                      value={t.name}
                      onChange={(e) => {
                        const next = [...themes];
                        next[idx] = { ...t, name: e.target.value };
                        onChangeThemes(next);
                      }}
                      className="flex-1"
                    />
                  </div>
                  <Input
                    value={t.short}
                    onChange={(e) => {
                      const next = [...themes];
                      next[idx] = { ...t, short: e.target.value };
                      onChangeThemes(next);
                    }}
                    placeholder="Short label (shown on wheel)"
                    className="mt-2 text-xs"
                  />
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="outline"
            onClick={onReset}
            className="w-full gap-2 border-brand-red/30 text-brand-red hover:bg-brand-red/5"
          >
            <RotateCcw className="h-4 w-4" /> Reset to defaults
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function ColorPicker({
  varName,
  value,
  onChange,
}: {
  varName: string;
  value: string | undefined;
  onChange: (hex: string) => void;
}) {
  // Use a hex color input; we store as-is and apply via inline style on the root
  return (
    <input
      type="color"
      aria-label={`Color for ${varName}`}
      value={value ?? "#cccccc"}
      onChange={(e) => onChange(e.target.value)}
      className="h-9 w-9 cursor-pointer rounded-md border border-border bg-transparent"
    />
  );
}
