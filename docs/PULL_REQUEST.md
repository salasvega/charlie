# feat: initialiser les fondations de Charlie 2.0

## Résultat

Initialisation de React + TypeScript strict + Vite avec Tailwind CSS 4, Lucide et React Router. Ajout d’un tableau de bord lumineux, d’un layout responsive (sidebar et menu mobile), des six rubriques demandées et d’une page 404. Les cinq rubriques futures sont explicitement provisoires ; toutes les données sont fictives.

Design system centralisé, configuration Netlify avec réécriture SPA, README, conventions AGENTS.md et workflow GitHub Actions pour vérifier les prochaines PR.

Aucun service Supabase, appel OpenAI, secret ou donnée personnelle. Aucun déploiement ni fusion automatique.

## Validation

- Installation reproductible par `npm ci`.
- `npm run typecheck` et `npm run build` réussis.
- Chromium : les six routes à 360, 390, 768, 1024 et 1440 px ; aucun débordement horizontal.
- Navigation desktop/mobile, fermeture du menu après navigation, CTA, retour accueil et route inconnue vérifiés.
- Aucune erreur JavaScript détectée ; inspection visuelle des captures mobile et desktop.
- `git diff --check` réussi.

## Limites

La réécriture Netlify est configurée, mais aucun déploiement Netlify réel n’a été demandé ni testé. Les fonctionnalités pédagogiques sont volontairement reportées.

Branche : `feat/mission-01-foundations` → `main`.
