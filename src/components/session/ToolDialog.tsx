import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import type { SessionScenario } from "../../data/sessionV2";
export type ToolId =
  "course" | "example" | "diagram" | "calculator" | "formulas" | "help";
const titles: Record<ToolId, string> = {
  course: "Fiche de cours",
  example: "Exemple similaire",
  diagram: "Schéma explicatif",
  calculator: "Calculatrice",
  formulas: "Tableau de formules",
  help: "Aide guidée · démonstration",
};
function Calculator() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [operation, setOperation] = useState("+");
  const [result, setResult] = useState("");
  return (
    <form
      className="v2-calculator"
      onSubmit={(event) => {
        event.preventDefault();
        const x = Number(a);
        const y = Number(b);
        if (
          a.trim() === "" ||
          b.trim() === "" ||
          !Number.isFinite(x) ||
          !Number.isFinite(y)
        ) {
          setResult("Saisis deux nombres valides.");
          return;
        }
        if (operation === "/" && y === 0) {
          setResult("La division par zéro n’est pas définie.");
          return;
        }
        const value =
          operation === "+"
            ? x + y
            : operation === "−"
              ? x - y
              : operation === "×"
                ? x * y
                : x / y;
        setResult(
          Number.isFinite(value)
            ? String(value)
            : "Ce résultat dépasse les limites de cette calculatrice.",
        );
      }}
    >
      <label>
        Premier nombre
        <input
          type="number"
          step="any"
          value={a}
          onChange={(event) => setA(event.target.value)}
          required
        />
      </label>
      <label>
        Opération
        <select
          aria-label="Opération"
          value={operation}
          onChange={(event) => setOperation(event.target.value)}
        >
          {["+", "−", "×", "/"].map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </label>
      <label>
        Deuxième nombre
        <input
          type="number"
          step="any"
          value={b}
          onChange={(event) => setB(event.target.value)}
          required
        />
      </label>
      <button className="v2-primary" type="submit">
        Calculer
      </button>
      <output role="status">{result}</output>
    </form>
  );
}
export function ToolDialog({
  tool,
  scenario,
  onClose,
}: {
  tool: ToolId;
  scenario: SessionScenario;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = dialog.current;
    element?.showModal();
    return () => element?.close();
  }, []);
  return (
    <dialog
      ref={dialog}
      className="v2-dialog"
      aria-labelledby="tool-title"
      onCancel={onClose}
    >
      <button
        className="v2-dialog-close"
        onClick={onClose}
        aria-label="Fermer l’outil"
      >
        <X size={20} />
      </button>
      <p className="v2-dialog-kicker">OUTIL LOCAL · CONTENU PRÉPARÉ</p>
      <h2 id="tool-title">{titles[tool]}</h2>
      {tool === "calculator" ? (
        <Calculator />
      ) : tool === "diagram" ? (
        <div className="v2-method-diagram">
          <span>Repérer la question</span>
          <b>↓</b>
          <span>Choisir une démarche</span>
          <b>↓</b>
          <span>Noter puis vérifier les étapes</span>
          <p>
            Schéma de méthode préparé. Aucun schéma n’est généré à partir de ta
            réponse.
          </p>
        </div>
      ) : (
        <div className="v2-tool-copy">
          {tool === "course"
            ? scenario.course
            : tool === "example"
              ? scenario.example
              : tool === "formulas"
                ? scenario.id === "functions"
                  ? "Pour f(x) = ax² + bx + c : α = −b/(2a), β = f(α), Δ = b² − 4ac. Si Δ > 0, les racines sont (−b ± √Δ)/(2a)."
                  : scenario.takeaway
                : `Cette aide est préparée et ne tient pas compte d’un profil personnel. ${scenario.hints[0]}`}
        </div>
      )}
      <p className="v2-dialog-note">
        Démonstration sans IA ni sauvegarde. Fermer cet outil conserve
        uniquement tes notes pendant cette visite.
      </p>
    </dialog>
  );
}
