import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { ArrowUpRight, Menu, X, Sparkles } from "lucide-react";
import { navigation } from "../data/navigation";
import { Brand } from "../components/Brand";
export function AppLayout() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const main = useRef<HTMLElement>(null);
  useEffect(() => {
    setOpen(false);
    document.title = `${navigation.find((n) => n.path === pathname)?.label ?? "Page introuvable"} · Charlie 2.0`;
    main.current?.focus();
  }, [pathname]);
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main">
        Aller au contenu
      </a>
      <aside className="sidebar">
        <Brand />
        <p className="nav-caption">TON ESPACE</p>
        <nav aria-label="Navigation principale">
          {navigation.map(({ path, label, icon: Icon }) => (
            <NavLink key={path} to={path} end={path === "/"}>
              <Icon size={21} aria-hidden="true" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="idea-icon">
            <Sparkles size={23} />
          </div>
          <strong>Chaque petit pas compte.</strong>
          <p>La curiosité fait le reste.</p>
          <Link to="/ma-seance">
            À toi de jouer <ArrowUpRight size={16} />
          </Link>
        </div>
        <span className="sidebar-foot">
          Un peu chaque jour. Beaucoup demain.
        </span>
      </aside>
      <div className="workspace">
        <header className="topbar">
          <div className="mobile-brand">
            <Brand />
          </div>
          <span className="desktop-crumb">
            Mon espace <span>/</span>{" "}
            <strong>
              {navigation.find((n) => n.path === pathname)?.label ??
                "Page introuvable"}
            </strong>
          </span>
          <div className="topbar-right">
            <span className="demo-pill">
              <span />
              Mode démo
            </span>
            <span className="demo-avatar" aria-label="Profil fictif">
              C
            </span>
            <button
              className="menu-button"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              onClick={() => setOpen(!open)}
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </header>
        {open && (
          <nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Navigation mobile"
          >
            {navigation.map(({ path, label, icon: Icon }) => (
              <NavLink key={path} to={path} end={path === "/"}>
                <Icon size={19} />
                {label}
              </NavLink>
            ))}
          </nav>
        )}
        <main id="main" ref={main} tabIndex={-1}>
          <Outlet />
        </main>
        <footer>
          Charlie 2.0 <span>•</span> Démonstration — toutes les données
          affichées sont fictives.
        </footer>
      </div>
    </div>
  );
}
