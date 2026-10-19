import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Plus,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Sparkles,
  Volume2,
  Mic,
  Camera,
  Paperclip,
  Send,
  Lightbulb,
  NotebookPen,
  BookOpen,
  FileText,
  Image,
  Calculator,
  List,
  MessageCircleHeart,
  Settings,
  Hand,
  Target,
  CheckCircle2,
  CheckCheck,
  PanelRightOpen,
  PanelRightClose,
} from "lucide-react";
import { HomeLayout } from "../layouts/HomeLayout";
import { HomeSymbol } from "../components/HomeSymbol";
import { referenceSubjects } from "../data/homeReference";
import { sessionSubjects } from "../data/session";
import { functionsScenario, scenarioForSubject } from "../data/sessionV2";
import type { SessionScenario } from "../data/sessionV2";
import { PreparationDialog } from "../components/session/PreparationDialog";
import { ToolDialog } from "../components/session/ToolDialog";
import type { ToolId } from "../components/session/ToolDialog";
import { WorkSpace } from "../components/session/WorkSpace";
import { SummaryDialog } from "../components/session/SummaryDialog";
import "../styles/home-reference.css";
import "../styles/session-reference.css";
const tools: [ToolId, string, typeof BookOpen, string][] = [
  ["course", "Fiche de cours", BookOpen, "gold"],
  ["example", "Exemple similaire", FileText, "purple"],
  ["diagram", "Schéma explicatif", Image, "blue"],
  ["calculator", "Calculatrice", Calculator, "indigo"],
  ["formulas", "Tableau de formules", List, "teal"],
  ["help", "Aide personnalisée", MessageCircleHeart, "pink"],
];
export function SessionPage() {
  const [params, setParams] = useSearchParams();
  const requested = params.get("matiere");
  const subject = sessionSubjects.find((item) => item.id === requested);
  return (
    <SessionWorkbench
      key={params.toString()}
      initialSubjectId={subject?.id ?? ""}
      initiallyPreparing={requested !== null || params.get("preparer") === "1"}
      onRestart={() => setParams({ preparer: "1" }, { replace: true })}
    />
  );
}
function MessageCopy({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((line, index) => (
        <p key={index}>{line || <br />}</p>
      ))}
    </>
  );
}
function SessionWorkbench({
  initialSubjectId,
  initiallyPreparing,
  onRestart,
}: {
  initialSubjectId: string;
  initiallyPreparing: boolean;
  onRestart: () => void;
}) {
  const [scenario, setScenario] = useState<SessionScenario>(() =>
    initialSubjectId ? scenarioForSubject(initialSubjectId) : functionsScenario,
  );
  const [preparation, setPreparation] = useState<"subject" | "goal" | null>(
    initiallyPreparing ? "subject" : null,
  );
  const [selectedSubject, setSelectedSubject] = useState(initialSubjectId);
  const [goal, setGoal] = useState("");
  const [focus, setFocus] = useState(false);
  const [level, setLevel] = useState("Seconde");
  const [tool, setTool] = useState<ToolId | null>(null);
  const [summary, setSummary] = useState(false);
  const [hint, setHint] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [support, setSupport] = useState("");
  const [notice, setNotice] = useState("");
  const [rail, setRail] = useState(false);
  const [workspaceKey, setWorkspaceKey] = useState(0);
  const chat = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (chat.current)
      chat.current.scrollTop =
        messages.length || hint || support ? chat.current.scrollHeight : 0;
  }, [messages, hint, support, scenario.id]);
  function start(subjectId: string, nextGoal: string) {
    setScenario(
      preparation === "goal" && subjectId === scenario.subjectId
        ? scenario
        : scenarioForSubject(subjectId),
    );
    setSelectedSubject(subjectId);
    setGoal(nextGoal);
    setPreparation(null);
    setHint(false);
    setSupport("");
    setDraft("");
    setMessages([]);
    setWorkspaceKey(workspaceKey + 1);
    setNotice("Exemple préparé ouvert. Tes réponses ne sont pas évaluées.");
  }
  function selectSubject(id: string) {
    if (scenario.subjectId === id) return;
    if (!sessionSubjects.some((item) => item.id === id)) return;
    setScenario(scenarioForSubject(id));
    setSelectedSubject(id);
    setHint(false);
    setSupport("");
    setDraft("");
    setMessages([]);
    setWorkspaceKey(workspaceKey + 1);
    setNotice("Matière modifiée. Un nouvel exemple préparé est affiché.");
  }
  function restart() {
    setScenario(functionsScenario);
    setDraft("");
    setMessages([]);
    setSupport("");
    setNotice("");
    setWorkspaceKey(workspaceKey + 1);
    setSummary(false);
    setSelectedSubject("");
    setGoal("");
    setHint(false);
    setPreparation("subject");
    onRestart();
  }
  return (
    <HomeLayout
      pageTitle="Ma séance"
      variant="session"
      focus={focus}
      onToggleFocus={() => setFocus(!focus)}
    >
      <div className={`session-v2${rail ? " rail-open" : ""}`}>
        <h1 className="ref-sr-only">Ma séance</h1>
        <div className="v2-background" />
        <header className="v2-header">
          <div
            className="v2-subjects"
            role="group"
            aria-label="Matières de la séance"
          >
            {referenceSubjects.map((item) =>
              sessionSubjects.some((subject) => subject.id === item.id) ? (
                <button
                  key={item.id}
                  className={scenario.subjectId === item.id ? "selected" : ""}
                  aria-pressed={scenario.subjectId === item.id}
                  onClick={() => selectSubject(item.id)}
                >
                  <HomeSymbol symbol={item.symbol} tone={item.tone} />
                  <span>{item.name}</span>
                </button>
              ) : (
                <Link
                  to="/mes-matieres"
                  key={item.id}
                  aria-label={`Explorer ${item.name} dans le catalogue`}
                >
                  <HomeSymbol symbol={item.symbol} tone={item.tone} />
                  <span>{item.name}</span>
                </Link>
              ),
            )}
          </div>
          <button
            className="v2-add"
            aria-label="Préparer une séance"
            onClick={() => setPreparation("subject")}
          >
            <Plus size={28} />
          </button>
          <div className="v2-day">
            <label className="v2-level">
              <span>Niveau</span>
              <select
                aria-label="Niveau indicatif"
                value={level}
                onChange={(event) => {
                  setLevel(event.target.value);
                  setNotice(
                    "Niveau indicatif modifié. L’exemple de démonstration reste identique.",
                  );
                }}
              >
                {["Seconde", "Première", "Terminale"].map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
              <ChevronDown size={18} />
            </label>
            <div>
              <strong>Séance du jour</strong>
              <div className="v2-day-track">
                <i />
                <span>3 / 5 activités</span>
              </div>
              <small>Avancement fictif</small>
            </div>
          </div>
        </header>
        <button
          className="v2-mobile-tools"
          aria-expanded={rail}
          onClick={() => setRail(!rail)}
        >
          {rail ? <PanelRightClose size={19} /> : <PanelRightOpen size={19} />}
          Outils pédagogiques
          {rail ? <ChevronUp size={17} /> : <ChevronDown size={17} />}
        </button>
        <div className="v2-session-body">
          <div className="v2-center">
            <aside
              className="v2-avatar"
              aria-label="Avatar secondaire de Charlie"
            >
              <div className="v2-avatar-illustration" />
              <div className="v2-avatar-bubble">
                <strong>On y va ! 💪</strong>
                <p>
                  Je suis là pour t’aider à comprendre,
                  <br />
                  pas juste pour te donner la réponse !
                </p>
              </div>
              <div className="v2-avatar-controls">
                {[
                  { name: "Son", Icon: Volume2 },
                  { name: "Microphone", Icon: Mic },
                  { name: "Caméra", Icon: Camera },
                ].map(({ name, Icon }) => (
                  <button
                    key={name}
                    aria-label={`${name} indisponible dans cette démonstration`}
                    onClick={() =>
                      setNotice(
                        `${name} non activé. Aucun accès à ton appareil n’est demandé.`,
                      )
                    }
                  >
                    <Icon size={23} />
                  </button>
                ))}
                <span>
                  <strong>Charlie</strong>
                  <small>
                    <i />
                    Mode démo
                  </small>
                </span>
              </div>
            </aside>
            <section
              className="v2-conversation"
              aria-label="Conversation centrale de démonstration"
            >
              <details className="v2-exercise" open>
                <summary>
                  <h2>
                    <Sparkles size={23} />
                    {scenario.title}
                  </h2>
                  <span className="v2-difficulty">
                    Niveau <i />
                    <i />
                    <i />
                  </span>
                  <ChevronUp size={20} />
                </summary>
                <div className="v2-exercise-paper">
                  <p>{scenario.intro}</p>
                  {scenario.formula && (
                    <p className="v2-formula">{scenario.formula}</p>
                  )}
                  <ol>
                    {scenario.questions.map((question) => (
                      <li key={question}>{question}</li>
                    ))}
                  </ol>
                </div>
              </details>
              <div className="v2-script-badge">
                Conversation scénarisée · sans IA
              </div>
              <div
                className="v2-chat"
                ref={chat}
                role="log"
                aria-label="Messages de la séance"
              >
                <div className="v2-message v2-first-message">
                  <span
                    className="v2-coach-portrait"
                    role="img"
                    aria-label="Charlie"
                  />
                  <div className="v2-bubble v2-coach">
                    <MessageCopy text={scenario.coach} />
                  </div>
                  <time>14:32 · exemple</time>
                </div>
                <div className="v2-message v2-student-message">
                  <div className="v2-bubble v2-student">
                    <MessageCopy text={scenario.student} />
                    <small>
                      14:34 <CheckCheck size={14} />
                    </small>
                  </div>
                </div>
                <div className="v2-message v2-followup">
                  <span
                    className="v2-coach-portrait"
                    role="img"
                    aria-label="Charlie"
                  />
                  <div className="v2-bubble v2-coach">
                    <MessageCopy text={scenario.followup} />
                  </div>
                  <time>14:34 · exemple</time>
                </div>
                {hint && (
                  <div id="session-hint" className="v2-inline-support">
                    <Lightbulb size={20} />
                    <p>{scenario.hints[0]}</p>
                  </div>
                )}
                {support && (
                  <div className="v2-inline-support" role="status">
                    <Sparkles size={20} />
                    <p>{support}</p>
                  </div>
                )}
                {messages.map((message, index) => (
                  <div className="v2-local-exchange" key={index}>
                    <div className="v2-message v2-student-message">
                      <div className="v2-bubble v2-student">
                        <p>{message}</p>
                        <small>Note locale · non envoyée</small>
                      </div>
                    </div>
                    <p className="v2-local-feedback">
                      Message affiché uniquement ici. Ce scénario préparé ne
                      corrige pas ta réponse. Tu peux explorer un indice ou la
                      méthode.
                    </p>
                  </div>
                ))}
              </div>
              <div className="v2-composer-area">
                <form
                  className="v2-composer"
                  onSubmit={(event) => {
                    event.preventDefault();
                    if (draft.trim()) {
                      setMessages([...messages, draft.trim()]);
                      setDraft("");
                      setNotice(
                        "Message ajouté localement, sans envoi ni évaluation.",
                      );
                    }
                  }}
                >
                  <label className="ref-sr-only" htmlFor="v2-response">
                    Ta réponse de démonstration
                  </label>
                  <input
                    id="v2-response"
                    placeholder="Écris ta réponse ici…"
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    maxLength={1500}
                  />
                  <button
                    type="button"
                    aria-label="Pièce jointe indisponible"
                    onClick={() =>
                      setNotice(
                        "Les pièces jointes ne sont pas activées. Aucun fichier n’est transmis.",
                      )
                    }
                  >
                    <Paperclip size={25} />
                  </button>
                  <button
                    type="button"
                    aria-label="Saisie vocale indisponible"
                    onClick={() =>
                      setNotice(
                        "Le microphone n’est pas activé. Aucun son n’est enregistré.",
                      )
                    }
                  >
                    <Mic size={25} />
                  </button>
                  <button
                    type="submit"
                    className="v2-send"
                    aria-label="Afficher ma réponse localement"
                    disabled={!draft.trim()}
                  >
                    <Send size={25} />
                  </button>
                </form>
                <div className="v2-help-actions">
                  <button
                    aria-label={hint ? "Masquer l’indice" : "Voir un indice"}
                    aria-expanded={hint}
                    aria-controls="session-hint"
                    onClick={() => setHint(!hint)}
                  >
                    <Lightbulb size={24} />
                    <span>{hint ? "Masquer l’indice" : "1er indice"}</span>
                  </button>
                  <button onClick={() => setSupport(scenario.hints[1])}>
                    <Lightbulb size={24} />
                    <span>Autre indice</span>
                  </button>
                  <button
                    onClick={() =>
                      setSupport(`Autrement dit : ${scenario.takeaway}`)
                    }
                  >
                    <NotebookPen size={23} />
                    <span>Explique-moi autrement</span>
                  </button>
                  <button onClick={() => setSupport(scenario.method)}>
                    <BookOpen size={24} />
                    <span>Voir la méthode</span>
                  </button>
                </div>
              </div>
              <footer className="v2-session-footer">
                <span>
                  Démonstration · messages non envoyés · notes effacées en
                  quittant
                </span>
                <button onClick={() => setPreparation("goal")}>Objectif</button>
                <button onClick={() => setSummary(true)}>
                  Voir le bilan démo
                </button>
              </footer>
            </section>
          </div>
          <aside className="v2-rail" aria-label="Outils et progression">
            <details className="v2-panel v2-tools-panel" open>
              <summary>
                <h2>
                  <Settings size={21} />
                  Outils pédagogiques
                </h2>
                <ChevronUp size={18} />
              </summary>
              <div className="v2-tools-grid">
                {tools.map(([id, label, Icon, tone]) => (
                  <button key={id} onClick={() => setTool(id)}>
                    <span className={`v2-tool-icon v2-tool-${tone}`}>
                      <Icon size={29} />
                    </span>
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </details>
            <details className="v2-panel v2-work-panel" open>
              <summary>
                <h2>
                  <Hand size={21} />
                  Mon espace de travail
                </h2>
                <ChevronUp size={18} />
              </summary>
              <WorkSpace
                key={`${scenario.id}-${workspaceKey}`}
                initialNote={scenario.scratch}
              />
            </details>
            <details className="v2-panel v2-progress-panel" open>
              <summary>
                <h2>
                  <Sparkles size={22} />
                  Ma progression dans cette séance
                </h2>
                <ChevronUp size={18} />
              </summary>
              <div className="v2-progress-content">
                <div
                  className="v2-ring"
                  role="img"
                  aria-label="Progression fictive de 60 pour cent"
                >
                  <svg viewBox="0 0 110 110" aria-hidden="true">
                    <defs>
                      <linearGradient
                        id="session-ring"
                        x1="0"
                        x2="1"
                        y1="1"
                        y2="0"
                      >
                        <stop stopColor="#04c8bf" />
                        <stop offset="1" stopColor="#2598ff" />
                      </linearGradient>
                    </defs>
                    <circle cx="55" cy="55" r="43" />
                    <circle className="v2-ring-value" cx="55" cy="55" r="43" />
                  </svg>
                  <strong>
                    60<small>%</small>
                  </strong>
                </div>
                <ol>
                  {scenario.steps.map((step, index) => (
                    <li
                      key={step}
                      className={
                        index === 0 ? "done" : index === 1 ? "current" : ""
                      }
                    >
                      {index === 0 ? <CheckCircle2 size={17} /> : <i />}
                      <span>
                        {index + 1}. {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
              <p>Illustration fictive · aucune maîtrise évaluée</p>
            </details>
            <section className="v2-panel v2-objective">
              <div>
                <h2>
                  <Target size={31} />
                  Objectif du jour
                </h2>
                <button onClick={() => setPreparation("goal")}>
                  Voir tous
                  <ArrowRight size={15} />
                </button>
              </div>
              <p>{scenario.objective}</p>
              <div>
                <span>
                  <i />
                </span>
                <strong>60 %</strong>
              </div>
            </section>
          </aside>
        </div>
        {notice && (
          <div className="v2-notice" role="status">
            <span>{notice}</span>
            <button onClick={() => setNotice("")}>Fermer</button>
          </div>
        )}
        {preparation && (
          <PreparationDialog
            initialSubjectId={
              preparation === "goal"
                ? selectedSubject || scenario.subjectId
                : selectedSubject
            }
            initialGoal={goal}
            initialStep={preparation}
            onStart={start}
            onClose={() => setPreparation(null)}
          />
        )}
        {tool && (
          <ToolDialog
            tool={tool}
            scenario={scenario}
            onClose={() => setTool(null)}
          />
        )}
        {summary && (
          <SummaryDialog
            scenario={scenario}
            goal={goal}
            onClose={() => setSummary(false)}
            onRestart={restart}
          />
        )}
      </div>
    </HomeLayout>
  );
}
