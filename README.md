# Charlie 2.0

Fondations d’une application éducative pour collégiens et lycéens. Cette version est une démonstration, avec des données entièrement fictives et sans authentification, persistance, Supabase ni API OpenAI.

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

`/`, `/ma-seance`, `/mes-matieres`, `/mes-progres`, `/mes-defis`, `/studio-avatar`. Les six rubriques proposent désormais une interface de démonstration. Les progrès et défis sont fictifs ; le Studio Avatar propose un aperçu personnalisable sans sauvegarde. `/mes-matieres` propose un catalogue filtrable de démonstration. `/ma-seance` propose le parcours de démonstration décrit dans `docs/MISSION_02.md`. Les liens du tableau de bord mènent à ces pages ; ils ne démarrent pas de séance avec IA. Les chemins inconnus affichent une page 404 applicative.

## Netlify

Connecter le dépôt et choisir la branche à déployer, idéalement la PR pour une Deploy Preview. `netlify.toml` configure Node 22, `npm run build`, le dossier `dist` et une réécriture SPA `/* → /index.html` (200), nécessaire pour recharger directement une route React. Aucune variable d’environnement ni clé n’est nécessaire. Le site de démonstration est hébergé sur https://moncharlie.netlify.app/. La procédure de publication et les limites de validation sont décrites dans `docs/RELEASE_DEMO.md`.

## Évolutions

Les futurs services Supabase et IA pourront être isolés dans un dossier de services ajouté lors d’une mission dédiée, avec définition des permissions et stratégie de secrets. Ne jamais mettre de clé privée dans une variable `VITE_*`, exposée au navigateur.

Conventions : voir `AGENTS.md`. Proposition de PR : `docs/PULL_REQUEST.md`.

## Mission 02

`src/pages/SessionPage.tsx` remplace la page provisoire de séance. Les exemples préparés sont dans `src/data/session.ts`. Choix matière → objectif → exemple avec indice → bilan fictif, sans sauvegarde ni évaluation. Voir `docs/MISSION_02.md` pour le périmètre et les critères d’acceptation.

## Mission 03

Catalogue : `src/pages/SubjectsPage.tsx` et `src/data/subjects.ts`. Recherche et filtre combinables, notions disponibles ou à venir, accès à la séance avec matière présélectionnée via `?matiere=maths|francais|sciences`. Aucune progression sauvegardée. Détails : `docs/MISSION_03.md`.

## Démonstrateur complet et tests

Les pages `ProgressPage.tsx`, `ChallengesPage.tsx` et `AvatarPage.tsx` complètent les six rubriques. Les données fictives partagées sont dans `src/data/activity.ts` et `src/data/avatar.ts` ; les composants partagés incluent `PageHeading` et `AvatarPreview`.

Les tests de parcours utilisent Playwright (dépendance de développement, sans effet sur le bundle livré) :

```sh
npm run build
npx playwright install chromium
npm run test:e2e
```

`npm run check` exécute typage, build et tests (après installation du navigateur). Le workflow GitHub exécute les mêmes contrôles. Voir `docs/RELEASE_DEMO.md` pour le périmètre, le déploiement et le retour arrière.

## Réalignement UX/UI — Accueil en validation

La branche `feat/ux-realignment-home` applique la maquette officielle à l’Accueil uniquement. Le thème est isolé dans `src/styles/home-reference.css`, les données fictives de référence dans `src/data/homeReference.ts`, et la navigation de l’Accueil dans `src/layouts/HomeLayout.tsx`. La police Nunito Sans est embarquée localement via Fontsource ; aucun service de police externe n’est appelé.

Comparaison, plan des écrans, captures réelles et écarts restants : `docs/ux/REALIGNEMENT.md`. Les illustrations sont des reconstitutions de la référence et restent à remplacer par les exports originaux pour une correspondance exacte. La correction des autres écrans et toute fusion attendent la validation de l’Accueil.

## Réalignement UX/UI — Ma séance V2 en validation

Après validation de l’Accueil, la branche `feat/ux-realignment-session-v2` reprend la maquette officielle V2. La route `/ma-seance` ouvre la conversation scénarisée de fonctions. Les liens contenant `matiere` conservent la préparation avec présélection ; le bouton « + » permet aussi de préparer une séance. Le bilan et les anciens exemples restent accessibles.

Composition, comportement, limites et captures réelles : `docs/ux/MA_SEANCE_V2.md`. Styles isolés dans `src/styles/session-reference.css`, contenus préparés dans `src/data/sessionV2.ts`, outils dans `src/components/session`. La calculatrice effectue les quatre opérations localement ; le brouillon conserve temporairement des notes textuelles dans trois onglets. La police manuscrite Caveat est embarquée localement via Fontsource. Aucun envoi, correction IA, caméra, microphone ou sauvegarde. La PR reste en brouillon, sans fusion ni mise à jour de la branche de production.
