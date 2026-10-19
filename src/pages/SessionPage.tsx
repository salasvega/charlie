import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Lightbulb,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { sessionSubjects, sessionGoals } from "../data/session";
type Stage = "subject" | "goal" | "session" | "summary";
const stages: Stage[] = ["subject", "goal", "session", "summary"];
export function SessionPage() {
  const [stage, setStage] = useState<Stage>("subject");
  const [subjectId, setSubjectId] = useState("");
  const [goal, setGoal] = useState("");
  const [hint, setHint] = useState(false);
  const title = useRef<HTMLHeadingElement>(null);
  const subject = sessionSubjects.find((item) => item.id === subjectId);
  useEffect(() => {
    title.current?.focus();
  }, [stage]);
  function restart() {
    setSubjectId("");
    setGoal("");
    setHint(false);
    setStage("subject");
  }
  return (
    <div className="session-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">UN PETIT PAS, À TON RYTHME</p>
          <h1>Ma séance</h1>
          <p>Choisis ton point de départ. On avance ensemble.</p>
        </div>
        <span className="demo-pill">
          <Sparkles size={14} aria-hidden="true" />
          Parcours de démonstration
        </span>
      </div>
      <ol className="session-stepper" aria-label="Étapes de la séance">
        {["Matière", "Objectif", "Séance", "Bilan"].map((label, index) => (
          <li
            key={label}
            aria-current={stages[index] === stage ? "step" : undefined}
            className={index <= stages.indexOf(stage) ? "reached" : ""}
          >
            <span>
              {index < stages.indexOf(stage) ? (
                <Check size={15} aria-hidden="true" />
              ) : (
                index + 1
              )}
            </span>
            {label}
          </li>
        ))}
      </ol>
      <section className="card session-panel" aria-labelledby="session-title">
        <p className="eyebrow">ÉTAPE {stages.indexOf(stage) + 1} SUR 4</p>
        <h2 id="session-title" ref={title} tabIndex={-1}>
          {stage === "subject"
            ? "Quelle matière t’inspire aujourd’hui ?"
            : stage === "goal"
              ? "Qu’aimerais-tu explorer ?"
              : stage === "session"
                ? "Un moment pour réfléchir."
                : "Un premier pas de fait."}
        </h2>
        {stage === "subject" && (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (subject) setStage("goal");
            }}
          >
            <fieldset>
              <legend>Choisis une matière</legend>
              <div className="session-options">
                {sessionSubjects.map((item) => (
                  <label key={item.id} className="session-option">
                    <input
                      type="radio"
                      name="subject"
                      required
                      value={item.id}
                      checked={subjectId === item.id}
                      onChange={() => setSubjectId(item.id)}
                    />
                    <span className={`subject-symbol ${item.tone}`}>
                      {item.symbol}
                    </span>
                    <span>
                      <strong>{item.label}</strong>
                      <small>{item.topic}</small>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="session-actions">
              <Link to="/" className="session-back">
                <ArrowLeft size={16} />
                Accueil
              </Link>
              <button
                className="button button-primary"
                disabled={!subject}
                type="submit"
              >
                Continuer
                <ArrowRight size={16} />
              </button>
            </div>
          </form>
        )}
        {stage === "goal" && subject && (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (goal) setStage("session");
            }}
          >
            <p className="session-context">
              {subject.label} · {subject.topic}
            </p>
            <fieldset>
              <legend>Choisis ton objectif</legend>
              <div className="session-options">
                {sessionGoals.map((item) => (
                  <label className="session-option" key={item}>
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
            <p className="session-disclaimer">
              Les trois objectifs ouvrent le même exemple scénarisé. La
              personnalisation viendra plus tard.
            </p>
            <div className="session-actions">
              <button
                className="session-back"
                type="button"
                onClick={() => setStage("subject")}
              >
                <ArrowLeft size={16} />
                Matière
              </button>
              <button
                className="button button-primary"
                disabled={!goal}
                type="submit"
              >
                Ouvrir ma séance
                <ArrowRight size={16} />
              </button>
            </div>
          </form>
        )}
        {stage === "session" && subject && (
          <>
            <p className="session-context">
              {subject.label} · {subject.topic} · {goal}
            </p>
            <div className="session-prompt">
              <span className="icon-box purple">
                <Sparkles size={22} aria-hidden="true" />
              </span>
              <div>
                <strong>Charlie · exemple préparé</strong>
                <p>{subject.prompt}</p>
              </div>
            </div>
            <p className="session-disclaimer">
              Réfléchis à voix haute ou sur papier. Cette démonstration ne
              recueille pas de réponse et ne vérifie pas tes connaissances.
            </p>
            <button
              type="button"
              className="session-hint"
              aria-expanded={hint}
              aria-controls="session-hint"
              onClick={() => setHint(!hint)}
            >
              <Lightbulb size={17} />
              {hint ? "Masquer l’indice" : "Voir un indice"}
            </button>
            <div id="session-hint" hidden={!hint} className="hint-content">
              {subject.hint}
            </div>
            <div className="session-actions">
              <button className="session-back" onClick={() => setStage("goal")}>
                <ArrowLeft size={16} />
                Objectif
              </button>
              <button
                className="button button-primary"
                onClick={() => setStage("summary")}
              >
                Voir le bilan démo
                <ArrowRight size={16} />
              </button>
            </div>
          </>
        )}
        {stage === "summary" && subject && (
          <>
            <span className="session-complete">
              <Check size={28} aria-hidden="true" />
            </span>
            <p className="session-context">
              Tu as parcouru l’exemple « {subject.topic} » en{" "}
              {subject.label.toLowerCase()}.
            </p>
            <div className="session-recap">
              <strong>Le repère à retenir</strong>
              <p>{subject.takeaway}</p>
            </div>
            <p className="session-disclaimer">
              Bilan fictif : aucun score ni apprentissage validé. Ton objectif
              choisi : {goal.toLowerCase()}. Les progrès du tableau de bord ne
              sont pas modifiés.
            </p>
            <div className="session-actions">
              <Link className="session-back" to="/">
                <ArrowLeft size={16} />
                Accueil
              </Link>
              <button className="button button-primary" onClick={restart}>
                <RotateCcw size={16} />
                Nouvelle séance
              </button>
            </div>
          </>
        )}
      </section>
      <p className="session-footnote">
        Démonstration sans IA ni sauvegarde. Quitter cette rubrique ou recharger
        la page réinitialise le parcours.
      </p>
    </div>
  );
}
