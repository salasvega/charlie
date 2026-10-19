import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Search, Sparkles } from "lucide-react";
import { normalizeSearch, subjectsCatalog } from "../data/subjects";

export function SubjectsPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const search = normalizeSearch(query);
  const subjects = subjectsCatalog.filter(
    (subject) =>
      (filter === "all" || subject.id === filter) &&
      normalizeSearch(
        [subject.label, subject.topic, ...subject.upcoming].join(" "),
      ).includes(search),
  );
  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">LA CURIOSITÉ N’A PAS DE FRONTIÈRES</p>
          <h1>Mes matières</h1>
          <p>Une notion à explorer, un nouveau déclic à trouver.</p>
        </div>
        <span className="demo-pill">
          <Sparkles size={14} aria-hidden="true" />
          Catalogue de démonstration
        </span>
      </div>
      <div className="subjects-intro">
        <span className="icon-box purple">
          <BookOpen size={22} aria-hidden="true" />
        </span>
        <p>
          <strong>Trois matières, trois points de départ.</strong> Explore les
          exemples disponibles et découvre les notions à venir. Ce catalogue
          illustratif ne constitue pas un programme scolaire complet.
        </p>
      </div>
      <section
        className="card catalog-tools"
        aria-label="Rechercher dans le catalogue"
      >
        <div className="catalog-search">
          <label htmlFor="subject-search">
            Rechercher une matière ou une notion
          </label>
          <div>
            <Search size={18} aria-hidden="true" />
            <input
              id="subject-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Équations, français, système solaire…"
              maxLength={100}
            />
          </div>
        </div>
        <div className="catalog-filter">
          <label htmlFor="subject-filter">Matière</label>
          <select
            id="subject-filter"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
          >
            <option value="all">Toutes les matières</option>
            {subjectsCatalog.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.label}
              </option>
            ))}
          </select>
        </div>
      </section>
      <p className="catalog-count" role="status">
        {subjects.length} matière{subjects.length > 1 ? "s" : ""} affichée
        {subjects.length > 1 ? "s" : ""}
      </p>
      {subjects.length === 0 ? (
        <section className="card catalog-empty">
          <Search size={30} aria-hidden="true" />
          <h2>Aucune matière trouvée</h2>
          <p>Essaie un autre mot ou affiche toutes les matières.</p>
          <button
            className="button button-primary"
            onClick={() => {
              setQuery("");
              setFilter("all");
            }}
          >
            Réinitialiser les filtres
          </button>
        </section>
      ) : (
        <div className="catalog-grid">
          {subjects.map((subject) => (
            <section
              className="card catalog-card"
              key={subject.id}
              aria-labelledby={`subject-${subject.id}`}
            >
              <div className="catalog-heading">
                <span
                  className={`subject-symbol ${subject.tone}`}
                  aria-hidden="true"
                >
                  {subject.symbol}
                </span>
                <div>
                  <h2 id={`subject-${subject.id}`}>{subject.label}</h2>
                  <p>1 exemple disponible · 2 notions à venir</p>
                </div>
              </div>
              <ul className="catalog-topics">
                <li className="catalog-available">
                  <span className="catalog-status">Exemple disponible</span>
                  <h3>{subject.topic}</h3>
                  <p>
                    Une question pour réfléchir, un indice et un repère à
                    retenir.
                  </p>
                  <Link
                    className="button button-primary"
                    to={`/ma-seance?matiere=${subject.id}`}
                    aria-label={`Explorer ${subject.topic} en ${subject.label}`}
                  >
                    Explorer cette notion
                    <ArrowRight size={16} />
                  </Link>
                </li>
                {subject.upcoming.map((topic) => (
                  <li className="catalog-upcoming" key={topic}>
                    <h3>{topic}</h3>
                    <span>À venir</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
      <p className="session-footnote">
        Exemples préparés, sans IA ni sauvegarde. Aucun niveau ni progrès
        personnel n’est déduit de ces données.
      </p>
    </>
  );
}
