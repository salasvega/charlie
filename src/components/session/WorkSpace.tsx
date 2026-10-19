import { useRef, useState } from "react";
import { Pencil, Undo2, Redo2, Trash2 } from "lucide-react";
type Tab = "Brouillon" | "Calculs" | "Schéma";
const tabs: Tab[] = ["Brouillon", "Calculs", "Schéma"];
export function WorkSpace({ initialNote }: { initialNote: string }) {
  const [tab, setTab] = useState<Tab>("Brouillon");
  const [notes, setNotes] = useState<Record<Tab, string>>({
    Brouillon: initialNote,
    Calculs: "",
    Schéma: "",
  });
  const [past, setPast] = useState<Record<Tab, string[]>>({
    Brouillon: [],
    Calculs: [],
    Schéma: [],
  });
  const [future, setFuture] = useState<Record<Tab, string[]>>({
    Brouillon: [],
    Calculs: [],
    Schéma: [],
  });
  const [color, setColor] = useState("#161080");
  const textarea = useRef<HTMLTextAreaElement>(null);
  function update(value: string) {
    setPast({ ...past, [tab]: [...past[tab], notes[tab]].slice(-100) });
    setFuture({ ...future, [tab]: [] });
    setNotes({ ...notes, [tab]: value });
  }
  function undo() {
    if (!past[tab].length) return;
    setFuture({ ...future, [tab]: [notes[tab], ...future[tab]] });
    setNotes({ ...notes, [tab]: past[tab].at(-1)! });
    setPast({ ...past, [tab]: past[tab].slice(0, -1) });
  }
  function redo() {
    if (!future[tab].length) return;
    setPast({ ...past, [tab]: [...past[tab], notes[tab]] });
    setNotes({ ...notes, [tab]: future[tab][0] });
    setFuture({ ...future, [tab]: future[tab].slice(1) });
  }
  return (
    <>
      <div
        className="v2-work-tabs"
        role="tablist"
        aria-label="Espace de travail"
      >
        {tabs.map((item, index) => (
          <button
            role="tab"
            key={item}
            id={`work-tab-${index}`}
            aria-controls="work-panel"
            aria-selected={tab === item}
            tabIndex={tab === item ? 0 : -1}
            onClick={() => setTab(item)}
            onKeyDown={(event) => {
              if (
                ["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)
              ) {
                event.preventDefault();
                const next =
                  event.key === "Home"
                    ? 0
                    : event.key === "End"
                      ? 2
                      : (index + (event.key === "ArrowRight" ? 1 : 2)) % 3;
                setTab(tabs[next]);
                document.getElementById(`work-tab-${next}`)?.focus();
              }
            }}
          >
            {item}
          </button>
        ))}
      </div>
      <div
        id="work-panel"
        role="tabpanel"
        aria-labelledby={`work-tab-${tabs.indexOf(tab)}`}
      >
        <label className="ref-sr-only" htmlFor="work-note">
          {tab} — notes locales
        </label>
        <textarea
          id="work-note"
          ref={textarea}
          className="v2-grid-paper"
          value={notes[tab]}
          onChange={(event) => update(event.target.value)}
          style={{ color }}
          maxLength={4000}
          spellCheck={false}
          placeholder={
            tab === "Schéma"
              ? "Décris ici ton schéma (notes textuelles)…"
              : "Note tes idées ici…"
          }
        />
      </div>
      <div className="v2-work-toolbar">
        <button
          aria-label="Écrire dans le brouillon"
          onClick={() => textarea.current?.focus()}
        >
          <Pencil size={22} />
        </button>
        <button
          aria-label="Annuler la dernière modification"
          disabled={!past[tab].length}
          onClick={undo}
        >
          <Undo2 size={20} />
        </button>
        <button
          aria-label="Rétablir la modification"
          disabled={!future[tab].length}
          onClick={redo}
        >
          <Redo2 size={20} />
        </button>
        <div role="group" aria-label="Couleur des notes">
          {[
            { value: "#151515", name: "Noir" },
            { value: "#2476ff", name: "Bleu" },
            { value: "#fa3c64", name: "Rose" },
            { value: "#1ab79c", name: "Turquoise" },
          ].map((item) => (
            <button
              key={item.name}
              className="v2-ink"
              aria-label={item.name}
              aria-pressed={color === item.value}
              style={{ background: item.value }}
              onClick={() => setColor(item.value)}
            />
          ))}
        </div>
        <button
          aria-label="Effacer les notes de cet onglet"
          onClick={() => update("")}
          disabled={!notes[tab]}
        >
          <Trash2 size={20} />
        </button>
      </div>
    </>
  );
}
