import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChevronRight,
  ChevronDown,
  Search,
  Bell,
  X,
  Sparkles,
  CalendarDays,
  Trophy,
  Target,
  Flame,
  Star,
  Moon,
  Paperclip,
  Mic,
  Brain,
  Leaf,
  UserRound,
  Check,
  BookOpen,
} from "lucide-react";
import { HomeLayout } from "../layouts/HomeLayout";
import { HomeSymbol } from "../components/HomeSymbol";
import {
  referenceSubjects,
  referencePriorities,
  referenceChallenges,
} from "../data/homeReference";
import "../styles/home-reference.css";
export function HomePage() {
  const [focus, setFocus] = useState(false);
  const [panel, setPanel] = useState<
    "search" | "notifications" | "profile" | null
  >(null);
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const [notice, setNotice] = useState("");
  const [completed, setCompleted] = useState<string[]>([]);
  const normalize = (value: string) =>
    value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  const subjects = referenceSubjects.filter((item) =>
    normalize(item.name).includes(normalize(query)),
  );
  function togglePanel(value: typeof panel) {
    setPanel(panel === value ? null : value);
  }
  return (
    <HomeLayout focus={focus} onToggleFocus={() => setFocus(!focus)}>
      <section className="ref-hero" aria-labelledby="home-title">
        <div className="ref-hero-shade" />
        <div className="ref-top-actions">
          <span className="ref-demo-badge">Profil fictif · Démo</span>
          <div className="ref-action-cluster">
            <button
              aria-label="Rechercher une matière"
              aria-expanded={panel === "search"}
              aria-controls="home-action-panel"
              onClick={() => togglePanel("search")}
            >
              <Search size={25} />
            </button>
            <button
              aria-label="Voir les notifications de démonstration"
              aria-expanded={panel === "notifications"}
              aria-controls="home-action-panel"
              onClick={() => togglePanel("notifications")}
            >
              <Bell size={25} />
              <span className="ref-notification-count">3</span>
            </button>
          </div>
          <button
            className="ref-profile"
            aria-expanded={panel === "profile"}
            aria-controls="home-action-panel"
            onClick={() => togglePanel("profile")}
          >
            <span>N</span>
            <span>
              <strong>Nina</strong>
              <small>Seconde</small>
            </span>
            <ChevronDown size={17} />
          </button>
        </div>
        {panel && (
          <section
            className="ref-action-panel"
            id="home-action-panel"
            aria-label={
              panel === "search"
                ? "Recherche"
                : panel === "profile"
                  ? "Profil de démonstration"
                  : "Notifications de démonstration"
            }
          >
            <button
              className="ref-panel-close"
              aria-label="Fermer le panneau"
              onClick={() => setPanel(null)}
            >
              <X size={18} />
            </button>
            {panel === "search" ? (
              <>
                <label htmlFor="home-search">
                  Rechercher dans les matières
                </label>
                <input
                  id="home-search"
                  autoFocus
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Mathématiques, français…"
                />
                <p role="status">
                  {subjects.length} matière(s) affichée(s) dans le tableau de
                  bord.
                </p>
              </>
            ) : panel === "profile" ? (
              <>
                <strong>Nina · Seconde</strong>
                <p>
                  Profil fictif repris de la maquette. Aucun compte personnel
                  n’est connecté.
                </p>
              </>
            ) : (
              <>
                <strong>Les nouvelles de Charlie</strong>
                <ul>
                  <li>Ton programme de démonstration est prêt.</li>
                  <li>Trois défis fictifs à découvrir.</li>
                  <li>Le Studio Avatar t’attend.</li>
                </ul>
              </>
            )}
          </section>
        )}
        <div className="ref-greeting">
          <Sparkles
            className="ref-greeting-mark"
            aria-hidden="true"
            size={28}
          />
          <h1 id="home-title">
            Bonjour Nina ! <span aria-hidden="true">👋</span>
          </h1>
          <p>
            "Chaque effort compte et te rapproche
            <br className="ref-desktop-break" /> de tes objectifs !"
          </p>
          <Link className="ref-charlie-message" to="/ma-seance">
            <span className="ref-charlie-symbol">
              <Sparkles size={23} />
            </span>
            <span>
              <strong>Charlie</strong>
              <span>
                Prête pour une nouvelle journée ?<br />
                Ton programme de démonstration
                <br className="ref-desktop-break" /> t’attend. On commence ?
              </span>
            </span>
            <span className="ref-round-arrow">
              <ArrowRight size={21} />
            </span>
          </Link>
        </div>
      </section>
      <div className="ref-dashboard">
        <section
          className="ref-card ref-subjects"
          aria-labelledby="ref-subjects-title"
        >
          <div className="ref-section-title">
            <h2 id="ref-subjects-title">
              <Sparkles className="ref-cyan" aria-hidden="true" />
              Mes matières
            </h2>
            <Link to="/mes-matieres">
              Voir toutes
              <ArrowRight size={15} />
            </Link>
          </div>
          <div className="ref-subject-grid">
            {subjects.map((subject) => (
              <Link
                key={subject.id}
                to={subject.target}
                className={`ref-subject ref-tone-${subject.tone}`}
                aria-label={`Explorer ${subject.name}${["histoire", "anglais", "svt"].includes(subject.id) ? " dans le catalogue" : ""}`}
              >
                <HomeSymbol symbol={subject.symbol} tone={subject.tone} />
                <h3>{subject.name}</h3>
                <div
                  className="ref-subject-progress"
                  role="progressbar"
                  aria-label={`Progression fictive en ${subject.name}`}
                  aria-valuenow={subject.progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <i style={{ width: `${subject.progress}%` }} />
                  <span>{subject.progress}%</span>
                </div>
              </Link>
            ))}
          </div>
          {subjects.length === 0 && (
            <div className="ref-no-subjects">
              <p>Aucune matière trouvée.</p>
              <button onClick={() => setQuery("")}>
                Réinitialiser la recherche
              </button>
            </div>
          )}
        </section>
        <aside
          className="ref-progress"
          aria-label="Progression de démonstration"
        >
          <div className="ref-card ref-global">
            <h2>Ma progression globale</h2>
            <div className="ref-global-inner">
              <div
                className="ref-progress-ring"
                role="img"
                aria-label="Progression globale fictive : 62 pour cent"
              >
                <svg viewBox="0 0 110 110" aria-hidden="true">
                  <defs>
                    <linearGradient id="home-ring" x1="0" x2="1" y1="1" y2="0">
                      <stop stopColor="#00c8c6" />
                      <stop offset="1" stopColor="#2698ff" />
                    </linearGradient>
                  </defs>
                  <circle cx="55" cy="55" r="44" />
                  <circle className="ref-ring-value" cx="55" cy="55" r="44" />
                </svg>
                <strong>
                  62<small>%</small>
                </strong>
              </div>
              <p>
                <strong>Très bien !</strong>
                <br />
                Tu progresses
                <br />
                régulièrement.
              </p>
            </div>
          </div>
          <div className="ref-achievement">
            <span className="ref-achievement-icon fire">
              <Flame size={34} fill="currentColor" />
            </span>
            <p>
              <strong>12</strong>
              <span>jours consécutifs</span>
            </p>
          </div>
          <div className="ref-achievement">
            <span className="ref-achievement-icon star">
              <Star size={36} />
            </span>
            <p>
              <strong>28</strong>
              <span>badges obtenus</span>
            </p>
          </div>
          <Link
            className="ref-card ref-current-goal"
            to="/ma-seance?matiere=maths"
          >
            <Target size={38} />
            <span>
              <strong>Mon objectif actuel</strong>
              <span>
                Améliorer mes résultats
                <br />
                en mathématiques
              </span>
            </span>
            <ChevronRight size={19} />
          </Link>
          <span className="ref-fictitious">
            Indicateurs fictifs · aucune maîtrise évaluée
          </span>
        </aside>
        <section
          className="ref-card ref-priorities"
          aria-labelledby="priorities-title"
        >
          <div className="ref-section-title">
            <h2 id="priorities-title">
              <CalendarDays className="ref-orange" aria-hidden="true" />
              Mes priorités du jour
            </h2>
            <span className="ref-date">
              <CalendarDays size={19} />
              Exemple de journée
            </span>
          </div>
          <div className="ref-priority-list">
            {referencePriorities.map((priority) => (
              <div
                className={`ref-priority${completed.includes(priority.id) ? " checked" : ""}`}
                key={priority.id}
              >
                <button
                  className="ref-task-check"
                  aria-label={`Marquer ${priority.title} comme ${completed.includes(priority.id) ? "à faire" : "terminé"} dans la démo`}
                  aria-pressed={completed.includes(priority.id)}
                  onClick={() =>
                    setCompleted(
                      completed.includes(priority.id)
                        ? completed.filter((id) => id !== priority.id)
                        : [...completed, priority.id],
                    )
                  }
                >
                  {completed.includes(priority.id) && <Check size={16} />}
                </button>
                <HomeSymbol symbol={priority.symbol} tone={priority.tone} />
                <div>
                  <h3>{priority.title}</h3>
                  <p>{priority.description}</p>
                </div>
                <Link className="ref-pill-button" to={priority.target}>
                  {priority.id === "anglais" ? "Explorer" : "Commencer"}
                  <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </section>
        <section
          className="ref-card ref-challenges"
          aria-labelledby="challenges-title"
        >
          <div className="ref-section-title">
            <h2 id="challenges-title">
              <Trophy className="ref-orange" aria-hidden="true" />
              Les défis du jour
            </h2>
            <Link to="/mes-defis">
              Voir tous
              <ArrowRight size={15} />
            </Link>
          </div>
          <div className="ref-challenge-list">
            {referenceChallenges.map((challenge) => {
              const Icon =
                challenge.symbol === "target"
                  ? Target
                  : challenge.symbol === "brain"
                    ? Brain
                    : Leaf;
              return (
                <Link
                  to="/mes-defis"
                  key={challenge.title}
                  className={`ref-day-challenge ref-${challenge.tone}`}
                >
                  <Icon size={36} aria-hidden="true" />
                  <span>
                    <h3>{challenge.title}</h3>
                    <p>{challenge.description}</p>
                  </span>
                  <span
                    className="ref-reward"
                    aria-label={`${challenge.reward} points fictifs`}
                  >
                    +{challenge.reward}
                    <Star size={14} fill="currentColor" />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
        <div className="ref-bottom-grid">
          <section className="ref-card ref-goals" aria-labelledby="goals-title">
            <div className="ref-goals-heading">
              <Target size={35} aria-hidden="true" />
              <div>
                <h2 id="goals-title">Parlons de tes objectifs</h2>
                <p>
                  Tu veux améliorer une matière, préparer un contrôle
                  <br className="ref-desktop-break" /> ou simplement revoir un
                  point ? Dis-moi ce dont tu as besoin !
                </p>
              </div>
            </div>
            <form
              className="ref-goal-form"
              onSubmit={(event) => {
                event.preventDefault();
                setNotice(
                  "Démonstration : ton message n’est ni envoyé ni enregistré. Retrouve les exemples dans Ma séance.",
                );
                setMessage("");
              }}
            >
              <label className="ref-sr-only" htmlFor="home-goal">
                Ton objectif de démonstration
              </label>
              <input
                id="home-goal"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Écris ton message ici…"
                maxLength={500}
              />
              <button
                type="button"
                aria-label="Pièce jointe indisponible dans cette démonstration"
                onClick={() =>
                  setNotice(
                    "Les pièces jointes seront disponibles lors d’une prochaine étape.",
                  )
                }
              >
                <Paperclip size={20} />
              </button>
              <button
                type="button"
                aria-label="Microphone indisponible dans cette démonstration"
                onClick={() =>
                  setNotice(
                    "La saisie vocale n’est pas activée dans cette démonstration.",
                  )
                }
              >
                <Mic size={21} />
              </button>
              <button
                className="ref-round-arrow"
                disabled={!message.trim()}
                aria-label="Essayer l’envoi en démonstration"
              >
                <ArrowRight size={26} />
              </button>
            </form>
            {notice && (
              <p className="ref-goal-notice" role="status">
                {notice}
                <Link to="/ma-seance">
                  Ma séance
                  <ArrowRight size={14} />
                </Link>
              </p>
            )}
          </section>
          <section
            className="ref-card ref-concentration"
            aria-labelledby="focus-title"
          >
            <Moon className="ref-moon" size={39} aria-hidden="true" />
            <div>
              <h2 id="focus-title">Mode Concentration</h2>
              <p>
                Un environnement calme pour te concentrer
                <br className="ref-desktop-break" /> sur l’essentiel, sans
                distractions.
              </p>
              <button
                className="ref-focus-button"
                aria-pressed={focus}
                onClick={() => setFocus(!focus)}
              >
                {focus ? "Quitter le mode" : "Activer le mode"}
                <ArrowRight size={19} />
              </button>
            </div>
          </section>
          <section
            className="ref-card ref-avatar-teaser"
            aria-labelledby="avatar-teaser-title"
          >
            <div>
              <UserRound size={36} aria-hidden="true" />
              <span>
                <h2 id="avatar-teaser-title">Studio Avatar</h2>
                <p>
                  Personnalise ton compagnon Charlie :<br />
                  apparence, voix et personnalité à venir.
                </p>
              </span>
            </div>
            <Link
              to="/studio-avatar"
              className="ref-avatar-gallery"
              aria-label="Découvrir le Studio Avatar"
            >
              <span className="ref-portrait portrait-girl" />
              <span className="ref-portrait portrait-robot" />
              <span className="ref-portrait portrait-boy" />
              <span className="ref-portrait portrait-cat" />
              <ChevronRight size={19} />
            </Link>
          </section>
        </div>
        <p className="ref-demo-footnote">
          <BookOpen size={13} aria-hidden="true" />
          Démonstration — Nina, ses priorités, progressions et récompenses sont
          fictives. Aucun message n’est envoyé.
        </p>
      </div>
    </HomeLayout>
  );
}
