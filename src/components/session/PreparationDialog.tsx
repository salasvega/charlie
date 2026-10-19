import { useEffect, useRef, useState } from "react";
import { X, ArrowLeft, ArrowRight } from "lucide-react";
import { sessionSubjects, sessionGoals } from "../../data/session";
export function PreparationDialog({
  initialSubjectId,
  initialGoal = "",
  initialStep = "subject",
  onStart,
  onClose,
}: {
  initialSubjectId: string;
  initialGoal?: string;
  initialStep?: "subject" | "goal";
  onStart: (subjectId: string, goal: string) => void;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [step, setStep] = useState(initialStep);
  const [subjectId, setSubjectId] = useState(initialSubjectId);
  const [goal, setGoal] = useState(initialGoal);
  useEffect(() => {
    const el = dialog.current;
    el?.showModal();
    return () => el?.close();
  }, []);
  return (
    <dialog
      className="v2-dialog v2-preparation"
      ref={dialog}
      onCancel={onClose}
      aria-labelledby="prepare-title"
    >
      <button
        className="v2-dialog-close"
        onClick={onClose}
        aria-label="Fermer la préparation"
      >
        <X size={20} />
      </button>
      <p className="v2-dialog-kicker">PRÉPARATION · DÉMONSTRATION</p>
      <h2 id="prepare-title">
        {step === "subject"
          ? "Quelle matière t’inspire aujourd’hui ?"
          : "Qu’aimerais-tu explorer ?"}
      </h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (step === "subject" && subjectId) setStep("goal");
          else if (goal && subjectId) onStart(subjectId, goal);
        }}
      >
        <fieldset>
          <legend>
            {step === "subject"
              ? "Choisis une matière"
              : "Choisis ton objectif"}
          </legend>
          <div className="session-options">
            {step === "subject"
              ? sessionSubjects.map((subject) => (
                  <label key={subject.id} className="session-option">
                    <input
                      type="radio"
                      name="subject"
                      required
                      checked={subject.id === subjectId}
                      onChange={() => setSubjectId(subject.id)}
                    />
                    <span className={`subject-symbol ${subject.tone}`}>
                      {subject.symbol}
                    </span>
                    <span>
                      <strong>{subject.label}</strong>
                      <small>{subject.topic}</small>
                    </span>
                  </label>
                ))
              : sessionGoals.map((item) => (
                  <label key={item} className="session-option">
                    <input
                      type="radio"
                      name="goal"
                      required
                      checked={goal === item}
                      onChange={() => setGoal(item)}
                    />
                    <strong>{item}</strong>
                  </label>
                ))}
          </div>
        </fieldset>
        <p className="v2-dialog-note">
          Les objectifs ouvrent le même exemple préparé par matière. Aucun
          apprentissage n’est évalué et aucune donnée n’est envoyée.
        </p>
        <div className="v2-dialog-actions">
          {step === "goal" ? (
            <button
              type="button"
              className="v2-quiet"
              onClick={() => setStep("subject")}
            >
              <ArrowLeft size={16} />
              Matière
            </button>
          ) : (
            <button type="button" className="v2-quiet" onClick={onClose}>
              Retour à la séance
            </button>
          )}
          <button
            type="submit"
            className="v2-primary"
            disabled={step === "subject" ? !subjectId : !goal}
          >
            {step === "subject" ? "Continuer" : "Ouvrir ma séance"}
            <ArrowRight size={16} />
          </button>
        </div>
      </form>
    </dialog>
  );
}
