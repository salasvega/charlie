import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Clock3,
  Sparkles,
  Flame,
  Target,
  Trophy,
  ChevronRight,
  BookOpen,
  Zap,
} from "lucide-react";
import { demoStats, demoSubjects } from "../data/demo";
export function HomePage() {
  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">UN NOUVEAU JOUR POUR APPRENDRE</p>
          <h1>
            Prêt à faire des étincelles ? <span className="hello">✦</span>
          </h1>
          <p>
            À ton rythme, avec confiance. Charlie est là pour t’accompagner.
          </p>
        </div>
        <span className="school-badge">
          <BookOpen size={16} />
          Collège & lycée
        </span>
      </div>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <span className="hero-tag">
            <Sparkles size={15} /> TON DÉCLIC DU JOUR
          </span>
          <h2 id="hero-title">
            Les grandes idées
            <br />
            commencent par
            <br />
            <span>un petit pas.</span>
          </h2>
          <p>
            Une question, une notion à revoir, une envie de comprendre ? Fais le
            premier pas avec Charlie.
          </p>
          <Link className="button button-white" to="/ma-seance">
            C’est parti pour ma séance <ArrowRight size={18} />
          </Link>
          <span className="hero-note">
            <Clock3 size={14} /> Un moment pour toi, à ton rythme
          </span>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <span className="art-symbol symbol-one">✦</span>
          <span className="art-symbol symbol-two">+</span>
          <div className="floating-note note-one">
            💡 &nbsp; Et si tu essayais ?
          </div>
          <div className="mascot">
            <div className="mascot-face">
              <i />
              <i />
              <span />
            </div>
          </div>
          <div className="mascot-shadow" />
          <div className="floating-note note-two">
            <span>✦</span> Tu peux y arriver.
          </div>
          <span className="art-dot" />
        </div>
      </section>
      <section aria-label="Statistiques fictives" className="stats-grid">
        {demoStats.map((stat, index) => {
          const Icon = [Clock3, Target, Flame][index];
          return (
            <article className="card stat-card" key={stat.label}>
              <span className={`icon-box ${stat.tone}`}>
                <Icon size={21} />
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
      <div className="dashboard-grid">
        <section>
          <div className="section-heading">
            <h2>Un peu de chaque matière</h2>
            <Link to="/mes-matieres">
              Tout voir <ArrowRight size={16} />
            </Link>
          </div>
          <div className="subjects">
            {demoSubjects.map((subject) => (
              <Link
                to="/mes-matieres"
                className="card subject-card"
                key={subject.name}
              >
                <span className={`subject-symbol ${subject.tone}`}>
                  {subject.symbol}
                </span>
                <div className="subject-content">
                  <div className="subject-title">
                    <h3>{subject.name}</h3>
                    <ChevronRight size={17} />
                  </div>
                  <p>{subject.topic}</p>
                  <div className="progress-label">
                    <span>Parcours de démonstration</span>
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
              </Link>
            ))}
          </div>
        </section>
        <section className="challenge card">
          <span className="challenge-kicker">
            <Zap size={16} /> LE DÉFI DE LA SEMAINE
          </span>
          <div className="trophy-art">
            <Trophy size={44} strokeWidth={1.5} />
            <span>✦</span>
          </div>
          <h2>La curiosité, ça se cultive.</h2>
          <p>Explore 3 matières différentes et élargis tes horizons.</p>
          <div className="challenge-progress">
            <span>Exemple fictif</span>
            <strong>2 / 3 matières</strong>
          </div>
          <div className="challenge-steps">
            <i />
            <i />
            <i />
          </div>
          <Link to="/mes-defis">
            Découvrir mes défis <ArrowUpRight size={18} />
          </Link>
        </section>
      </div>
      <div className="bottom-note">
        <span>
          <Sparkles size={20} />
        </span>
        <p>
          <strong>Tu n’as pas besoin de tout savoir.</strong> Juste d’avoir
          envie de comprendre.
        </p>
        <Link to="/studio-avatar">
          Découvre ton studio <ArrowRight size={16} />
        </Link>
      </div>
    </>
  );
}
