import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Trophy } from "lucide-react";
import { PageHeading } from "../components/PageHeading";
import { demoChallenges } from "../data/activity";
type Filter = "all" | "ongoing" | "completed";
export function ChallengesPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const items = demoChallenges.filter(
    (item) =>
      filter === "all" ||
      (filter === "completed"
        ? item.current === item.total
        : item.current < item.total),
  );
  return (
    <>
      <PageHeading
        title="Mes défis"
        eyebrow="UN PEU DE CURIOSITÉ, BEAUCOUP D’ÉLAN"
        description="Des idées pour varier les découvertes, sans pression ni classement."
      />
      <p className="demo-notice">
        Défis et avancements fictifs. Explorer une rubrique ne débloque ni point
        ni récompense dans cette démonstration.
      </p>
      <div
        className="challenge-filters"
        role="group"
        aria-label="Filtrer les défis"
      >
        {(
          [
            { value: "all", label: "Tous les défis" },
            { value: "ongoing", label: "En cours" },
            { value: "completed", label: "Terminés" },
          ] as const
        ).map((option) => (
          <button
            type="button"
            key={option.value}
            aria-pressed={filter === option.value}
            onClick={() => setFilter(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
      <p className="catalog-count" role="status">
        {items.length} défi{items.length > 1 ? "s" : ""} affiché
        {items.length > 1 ? "s" : ""}
      </p>
      <div className="challenge-catalog">
        {items.map((item) => (
          <article className="card challenge-detail" key={item.id}>
            <span className={`icon-box ${item.tone}`}>
              <Trophy size={23} aria-hidden="true" />
            </span>
            <span className="challenge-state">
              {item.current === item.total
                ? "Terminé · exemple fictif"
                : "En cours · exemple fictif"}
            </span>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <div className="challenge-progress">
              <span>Avancement fictif</span>
              <strong>
                {item.current} / {item.total} {item.unit}
              </strong>
            </div>
            <div
              className={`progress-track ${item.tone}`}
              role="progressbar"
              aria-label={`Avancement fictif : ${item.title}`}
              aria-valuenow={item.current}
              aria-valuemin={0}
              aria-valuemax={item.total}
            >
              <div style={{ width: `${(item.current / item.total) * 100}%` }} />
            </div>
            <Link className="button button-primary" to={item.target}>
              {item.action}
              <ArrowRight size={16} />
            </Link>
          </article>
        ))}
      </div>
    </>
  );
}
