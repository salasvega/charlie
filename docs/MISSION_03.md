# Mission 03 — Mes matières

Catalogue illustratif de trois matières, alimenté par les exemples de `src/data/session.ts`. Chaque matière présente une notion disponible et deux notions explicitement à venir, sans lien inactif ni faux cours. Aucun programme scolaire complet, suivi de niveau ou progrès réel n’est annoncé.

## Comportement

- Recherche sur les matières et notions, insensible à la casse et aux accents, combinable avec le filtre matière.
- Une recherche conserve la carte entière de la matière correspondante pour contextualiser la notion ; les notions à venir restent identifiées.
- État vide avec réinitialisation des deux filtres et décompte annoncé.
- Les liens d’exploration ouvrent `/ma-seance?matiere=maths`, `francais` ou `sciences` avec la matière cochée. L’utilisateur peut la modifier avant de continuer.
- Paramètre absent ou inconnu : aucune sélection par défaut. Modifier les paramètres du lien réinitialise le parcours.
- Nouvelle séance supprime les paramètres et efface les choix. Recharger un lien présélectionné conserve seulement la présélection du lien, jamais la progression.

## Structure

`src/data/subjects.ts` étend les exemples existants avec les notions futures et normalise les recherches. `src/pages/SubjectsPage.tsx` affiche le catalogue et ses filtres. `SessionPage.tsx` valide les paramètres d’URL et isole l’état éphémère par lien. Design system existant, aucune dépendance supplémentaire, IA, Supabase ou sauvegarde.

## Livraison

Branche `feat/mission-03-subjects-catalog`, basée sur `feat/mission-02-session-demo`. La PR dépend de la Mission 02 ; rebaser et recibler après intégration des PR précédentes. Aucune fusion automatique.

## Vérifications

- Installation reproductible `npm ci`, typage strict `npm run typecheck`, build de production et `git diff --check` réussis.
- Chromium : catalogue et filtres à 360, 390, 768, 1024 et 1440 px, sans débordement horizontal.
- Recherche sans accents et en majuscules, combinaison recherche/filtre, état vide et réinitialisation vérifiés.
- 15 parcours depuis le catalogue (3 matières × 5 largeurs) avec présélection, objectif, exemple, bilan et nouvelle séance.
- Paramètre inconnu ignoré, choix modifiable, rechargement conservant uniquement la matière du lien, redémarrage effaçant le paramètre.
- Captures mobile et desktop inspectées ; aucune erreur JavaScript détectée.

La publication Netlify reste à effectuer : le projet hébergé était configuré pour la branche Mission 02. La validation décrite ci-dessus est locale.
