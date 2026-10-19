import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";
import { navigation } from "../data/navigation";
type Section = (typeof navigation)[number];
export function PlaceholderPage({ section }: { section: Section }) {
  const Icon = section.icon;
  return (
    <>
      <p className="eyebrow">TON ESPACE CHARLIE</p>
      <h1>{section.label}</h1>
      <section className="card placeholder">
        <span className="placeholder-icon">
          <Icon size={38} />
        </span>
        <span className="demo-pill">
          <Sparkles size={14} />
          Bientôt dans Charlie
        </span>
        <h2>La suite prend forme.</h2>
        <p>{section.description}</p>
        <p>
          Cette page est provisoire. Les fonctionnalités seront ajoutées lors
          des prochaines missions.
        </p>
        <Link to="/" className="button button-primary">
          <ArrowLeft size={17} />
          Revenir à l’accueil
        </Link>
      </section>
    </>
  );
}
export function NotFoundPage() {
  return (
    <section className="card placeholder">
      <p className="eyebrow">ERREUR 404</p>
      <h1>On a perdu le fil.</h1>
      <p>Cette page n’existe pas. Retrouve ton espace en un clic.</p>
      <Link className="button button-primary" to="/">
        Revenir à l’accueil
      </Link>
    </section>
  );
}
