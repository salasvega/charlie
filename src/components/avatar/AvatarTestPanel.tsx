import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Paperclip,
  Mic,
  ArrowRight,
  Orbit,
  BookOpen,
  MessageCircle,
  NotebookPen,
} from "lucide-react";
import { PortraitSprite } from "./PortraitSprite";
import type { StudioConfig } from "../../data/avatarStudio";
const prompts = [
  {
    text: "Aide-moi en maths",
    icon: Orbit,
    reply:
      "On peut commencer par un exemple de mathématiques. Quelle étape aimerais-tu comprendre ?",
    target: "/ma-seance?matiere=maths",
  },
  {
    text: "Explique-moi une notion",
    icon: Sparkles,
    reply:
      "Une bonne première étape : nommer la notion, puis repérer ce que tu sais déjà. Les exemples préparés sont dans Mes matières.",
    target: "/mes-matieres",
  },
  {
    text: "Pose-moi une question",
    icon: MessageCircle,
    reply:
      "Question préparée : quelle matière aimerais-tu explorer aujourd’hui, et pourquoi ?",
    target: null,
  },
  {
    text: "On révise ensemble",
    icon: NotebookPen,
    reply:
      "Choisis une matière, fixe un petit objectif, puis prends le temps de reformuler ce que tu as compris.",
    target: "/ma-seance",
  },
];
export function AvatarTestPanel({
  config,
  onNotice,
}: {
  config: StudioConfig;
  onNotice: (text: string) => void;
}) {
  const [draft, setDraft] = useState("");
  const [reply, setReply] = useState<{
    message: string;
    target: string | null;
  } | null>(null);
  const scroll = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scroll.current) scroll.current.scrollTop = scroll.current.scrollHeight;
  }, [reply]);
  const intro =
    config.tone === "relaxed"
      ? "Salut ! Prête à faire un petit pas ensemble ? 😊"
      : config.tone === "focused"
        ? "Bonjour. Choisissons un objectif clair pour commencer."
        : "Bonjour ! Je suis ravie de t’accompagner !\nPose-moi une question ou choisis un sujet.\nOn commence ? 😊";
  return (
    <section
      className="studio-card studio-test"
      aria-labelledby="studio-test-title"
    >
      <h2 id="studio-test-title">
        <Sparkles size={20} />
        5. Teste ton avatar
      </h2>
      <div
        className="studio-test-chat"
        ref={scroll}
        role="log"
        aria-label="Conversation préparée du Studio Avatar"
      >
        <div className="studio-test-message">
          <PortraitSprite
            kind={config.style === "human" ? "human" : "companion"}
            index={
              config.style === "human"
                ? config.appearance
                : config.style === "robot"
                  ? 0
                  : 1
            }
            zoom
          />
          <p>{intro}</p>
        </div>
        {reply && (
          <div className="studio-test-reply">
            <p>{reply.message}</p>
            {reply.target && (
              <Link to={reply.target}>
                Ouvrir l’exemple
                <ArrowRight size={13} />
              </Link>
            )}
            <small>Réponse préparée · sans IA</small>
          </div>
        )}
      </div>
      <div className="studio-suggestions">
        {prompts.map((prompt) => {
          const Icon = prompt.icon;
          return (
            <button
              key={prompt.text}
              onClick={() =>
                setReply({
                  message: `${config.teaching[0] ? "" : "Repère de démonstration : "}${prompt.reply}`,
                  target: prompt.target,
                })
              }
            >
              <Icon size={16} />
              {prompt.text}
            </button>
          );
        })}
      </div>
      <form
        className="studio-test-form"
        onSubmit={(event) => {
          event.preventDefault();
          if (draft.trim()) {
            setReply({
              message: `Ton message « ${draft.trim()} » est affiché uniquement ici. Ce test est préparé : aucune réponse personnalisée n’est générée.`,
              target: "/ma-seance",
            });
            setDraft("");
          }
        }}
      >
        <label className="ref-sr-only" htmlFor="studio-test-input">
          Message de test local
        </label>
        <input
          id="studio-test-input"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          maxLength={500}
          placeholder="Écris ton message ici…"
        />
        <button
          type="button"
          aria-label="Pièce jointe indisponible dans le studio"
          onClick={() =>
            onNotice(
              "Les pièces jointes ne sont pas activées. Aucun fichier n’est envoyé.",
            )
          }
        >
          <Paperclip size={22} />
        </button>
        <button
          type="button"
          aria-label="Microphone indisponible dans le studio"
          onClick={() =>
            onNotice(
              "Le microphone ne sera pas activé. Aucun son n’est enregistré.",
            )
          }
        >
          <Mic size={22} />
        </button>
        <button
          className="studio-send"
          type="submit"
          aria-label="Tester mon message localement"
          disabled={!draft.trim()}
        >
          <ArrowRight size={27} />
        </button>
      </form>
      <p className="studio-test-note">
        <BookOpen size={11} />
        Conversation de démonstration · messages non envoyés
      </p>
    </section>
  );
}
