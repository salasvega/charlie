import { useEffect, useRef } from "react";
import { X, RotateCcw } from "lucide-react";
import type { SessionScenario } from "../../data/sessionV2";
export function SummaryDialog({
  scenario,
  goal,
  onClose,
  onRestart,
}: {
  scenario: SessionScenario;
  goal: string;
  onClose: () => void;
  onRestart: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = dialog.current;
    element?.showModal();
    return () => element?.close();
  }, []);
  return (
    <dialog
      className="v2-dialog"
      ref={dialog}
      onCancel={onClose}
      aria-labelledby="summary-title"
    >
      <button
        className="v2-dialog-close"
        onClick={onClose}
        aria-label="Fermer le bilan"
      >
        <X size={20} />
      </button>
      <p className="v2-dialog-kicker">BILAN FICTIF</p>
      <h2 id="summary-title">Un premier pas de fait.</h2>
      <p className="v2-tool-copy">{scenario.takeaway}</p>
      <p className="v2-dialog-note">
        Objectif choisi : {goal || "Explorer une notion"}. Aucun score ni
        apprentissage validé. Les indicateurs affichés sont fictifs et
        indépendants de tes messages.
      </p>
      <button className="v2-primary" onClick={onRestart}>
        <RotateCcw size={16} />
        Nouvelle séance
      </button>
    </dialog>
  );
}
