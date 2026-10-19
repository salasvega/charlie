# Charlie 2.0

Fondations d’une application éducative pour collégiens et lycéens. Cette version est une démonstration locale, avec des données entièrement fictives et sans authentification, persistance, Supabase ni API OpenAI.

## Lancement

Node.js 22.12 minimum (Node 22 recommandé), npm et Git.

```sh
npm ci
npm run dev
```

Ouvrir l’URL affichée par Vite (par défaut http://localhost:5173).

```sh
npm run typecheck   # TypeScript strict
npm run build       # vérification TypeScript puis production dans dist/
npm run preview     # aperçu local du build
```

## Stack et structure

React 19, TypeScript 5, Vite 7, Tailwind CSS 4 via le plugin Vite, React Router 7 et Lucide React. Le verrou `package-lock.json` fixe les versions installées. Aucun service externe n’est requis pour exécuter l’application.

```text
src/
  app/App.tsx               Routes imbriquées et page 404
  components/Brand.tsx      Identité partagée
  layouts/AppLayout.tsx     Sidebar, menu mobile, focus et titres
  pages/HomePage.tsx        Tableau de bord de démonstration
  pages/PlaceholderPage.tsx Pages provisoires et page 404
  data/navigation.ts        Source unique des six rubriques
  data/demo.ts              Données explicitement fictives
  styles/theme.css          Design system, composants et responsive
public/                     Réservé aux futurs assets statiques
```

Le design system expose couleurs, typographie, ombres, espacements et rayons via `@theme` et des variables CSS. Les classes partagées (`card`, `button`, `demo-pill`, etc.) composent l’interface. Les breakpoints 580, 850 et 1150 px adaptent le tableau de bord et remplacent la sidebar par un menu compact. Police système locale pour ne dépendre d’aucun fournisseur de fontes.

## Navigation

`/`, `/ma-seance`, `/mes-matieres`, `/mes-progres`, `/mes-defis`, `/studio-avatar`. Les quatre dernières pages annoncent clairement les futures fonctionnalités. `/ma-seance` propose le parcours de démonstration décrit dans `docs/MISSION_02.md`. Les liens du tableau de bord mènent à ces pages ; ils ne démarrent pas de séance avec IA. Les chemins inconnus affichent une page 404 applicative.

## Netlify

Connecter le dépôt et choisir la branche à déployer, idéalement la PR pour une Deploy Preview. `netlify.toml` configure Node 22, `npm run build`, le dossier `dist` et une réécriture SPA `/* → /index.html` (200), nécessaire pour recharger directement une route React. Aucune variable d’environnement ni clé n’est nécessaire. Aucun déploiement n’est effectué dans cette mission.

## Évolutions

Les futurs services Supabase et IA pourront être isolés dans un dossier de services ajouté lors d’une mission dédiée, avec définition des permissions et stratégie de secrets. Ne jamais mettre de clé privée dans une variable `VITE_*`, exposée au navigateur.

Conventions : voir `AGENTS.md`. Proposition de PR : `docs/PULL_REQUEST.md`.

## Mission 02

`src/pages/SessionPage.tsx` remplace la page provisoire de séance. Les exemples préparés sont dans `src/data/session.ts`. Choix matière → objectif → exemple avec indice → bilan fictif, sans sauvegarde ni évaluation. Voir `docs/MISSION_02.md` pour le périmètre et les critères d’acceptation.
