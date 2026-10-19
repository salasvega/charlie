import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import {
  House,
  MessageCircle,
  BookOpen,
  ChartNoAxesColumnIncreasing,
  Trophy,
  UserRound,
  Focus,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
const items = [
  { path: "/", label: "Accueil", icon: House },
  { path: "/ma-seance", label: "Ma séance", icon: MessageCircle },
  { path: "/mes-matieres", label: "Mes matières", icon: BookOpen },
  {
    path: "/mes-progres",
    label: "Mes progrès",
    icon: ChartNoAxesColumnIncreasing,
  },
  { path: "/mes-defis", label: "Mes défis", icon: Trophy },
  { path: "/studio-avatar", label: "Studio Avatar", icon: UserRound },
];
export function HomeLayout({
  children,
  focus,
  onToggleFocus,
}: {
  children: ReactNode;
  focus: boolean;
  onToggleFocus: () => void;
}) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.title = "Accueil · Charlie 2.0";
    document.getElementById("home-main")?.focus({ preventScroll: true });
  }, []);
  return (
    <div className={`reference-home${focus ? " is-focus" : ""}`}>
      <a className="skip-link" href="#home-main">
        Aller au contenu
      </a>
      <header className="ref-mobile-bar">
        <span className="ref-logo">
          Charlie <b>2.0</b>
        </span>
        <button
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          aria-controls="home-mobile-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </header>
      <aside className="ref-sidebar">
        <div className="ref-brand">
          <div className="ref-logo">
            Charlie <b>2.0</b>
          </div>
          <p>
            Apprendre à ton rythme,
            <br />
            pour aller plus loin
          </p>
        </div>
        <nav aria-label="Navigation principale">
          {items.map(({ path, label, icon: Icon }) => (
            <NavLink end={path === "/"} key={path} to={path}>
              <Icon aria-hidden="true" size={29} />
              {label}
            </NavLink>
          ))}
          <button
            className="ref-focus-nav"
            onClick={onToggleFocus}
            aria-pressed={focus}
          >
            <Focus size={29} aria-hidden="true" />
            {focus ? "Quitter la concentration" : "Mode Concentration"}
          </button>
        </nav>
        <div className="ref-sidebar-landscape">
          <Sparkles size={22} aria-hidden="true" />
          <strong>
            Des questions
            <br />
            d’aujourd’hui
            <br />
            aux réussites
            <br />
            de demain !
          </strong>
        </div>
      </aside>
      {open && (
        <nav
          id="home-mobile-nav"
          className="ref-mobile-nav"
          aria-label="Navigation mobile"
        >
          {items.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/"}
              onClick={() => setOpen(false)}
            >
              <Icon size={20} aria-hidden="true" />
              {label}
            </NavLink>
          ))}
          <button
            onClick={() => {
              onToggleFocus();
              setOpen(false);
            }}
          >
            Mode Concentration
          </button>
        </nav>
      )}
      <main id="home-main" className="ref-main" tabIndex={-1}>
        {children}
      </main>
    </div>
  );
}
