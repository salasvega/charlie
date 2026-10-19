import { Link } from "react-router-dom";
import { ArrowRight, Clock3, Flame, Target } from "lucide-react";
import { PageHeading } from "../components/PageHeading";
import { demoStats, demoSubjects } from "../data/demo";
import { demoWeek } from "../data/activity";
export function ProgressPage() {
  return (
    <>
      <PageHeading
        title="Mes progrès"
        eyebrow="CHAQUE PETIT PAS COMPTE"
        description="Un aperçu pour imaginer ton futur carnet de progression."
      />
      <p className="demo-notice">
        Toutes les statistiques de cette page sont fictives. Les séances de
        démonstration ne les modifient pas et ne valident aucun apprentissage.
      </p>
      <section className="stats-grid" aria-label="Statistiques fictives">
        {demoStats.map((stat, index) => {
          const Icon = [Clock3, Target, Flame][index];
          return (
            <article className="card stat-card" key={stat.label}>
              <span className={`icon-box ${stat.tone}`}>
                <Icon size={21} aria-hidden="true" />
              </span>
              <div>
                <strong>{stat.value}</strong>
                <p>{stat.label}</p>
              </div>
              <span className={`stat-change ${stat.tone}`}>{stat.change}</span>
            </article>
          );
        })}
      </section>
      <div className="insights-grid">
        <section className="card insight-panel">
          <div className="section-heading">
            <h2>Une semaine de curiosité</h2>
            <span className="demo-pill">Exemple fictif</span>
          </div>
          <p>155 minutes réparties sur cinq jours.</p>
          <div className="week-chart" aria-hidden="true">
            {demoWeek.map((day) => (
              <div className="week-day" key={day.day}>
                <span>{day.minutes} min</span>
                <div className="week-column">
                  <i style={{ height: `${(day.minutes / 45) * 100}%` }} />
                </div>
                <strong>{day.short}</strong>
              </div>
            ))}
          </div>
          <details className="chart-details">
            <summary>Voir les données du graphique</summary>
            <table>
              <caption>Temps d’apprentissage fictif par jour</caption>
              <thead>
                <tr>
                  <th scope="col">Jour</th>
                  <th scope="col">Minutes</th>
                </tr>
              </thead>
              <tbody>
                {demoWeek.map((day) => (
                  <tr key={day.day}>
                    <th scope="row">{day.day}</th>
                    <td>{day.minutes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </details>
        </section>
        <section className="card insight-panel">
          <h2>Les matières en perspective</h2>
          <p className="insight-description">
            Des parcours illustratifs, sans mesure de ton niveau.
          </p>
          {demoSubjects.map((subject) => (
            <div className="subject-insight" key={subject.name}>
              <div>
                <span>{subject.name}</span>
                <strong>{subject.progress} %</strong>
              </div>
              <div
                className={`progress-track ${subject.tone}`}
                role="progressbar"
                aria-label={`Parcours fictif en ${subject.name}`}
                aria-valuenow={subject.progress}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div style={{ width: `${subject.progress}%` }} />
              </div>
            </div>
          ))}
          <Link className="button button-primary" to="/mes-matieres">
            Explorer les matières
            <ArrowRight size={16} />
          </Link>
        </section>
      </div>
    </>
  );
}
