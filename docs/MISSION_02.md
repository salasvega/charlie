# Mission 02 — Ma séance en démonstration

## Périmètre

Un parcours en quatre étapes sur `/ma-seance` : choisir une matière, choisir un objectif, parcourir un exemple scénarisé et consulter un bilan fictif. Trois matières (mathématiques, français, sciences), trois objectifs. Tous les objectifs utilisent le même exemple de la matière sélectionnée ; l’interface le précise avant le démarrage.

Aucun chat, saisie personnelle, évaluation, génération IA, backend, score ou sauvegarde. Les seules interactions sont les choix, retours, indice facultatif, bilan et redémarrage. Recharger ou quitter la rubrique réinitialise l’état en mémoire. Les statistiques d’accueil restent fictives et inchangées.

## Critères d’acceptation

- Impossible de continuer sans matière puis sans objectif.
- Retour arrière conservant les choix pendant le parcours.
- Exemple et indice correspondant à la matière ; indice masquable.
- Bilan explicitement fictif et redémarrage effaçant tous les choix.
- Navigation clavier via contrôles natifs, focus sur le titre à chaque étape, étape courante annoncée.
- Affichage sans débordement à 360, 390, 768, 1024 et 1440 px.

## Architecture

`src/data/session.ts` contient les exemples et objectifs typés. `src/pages/SessionPage.tsx` gère l’état éphémère. Les styles réutilisent le design system dans `src/styles/theme.css`. Aucune dépendance supplémentaire.

## Proposition de PR

Titre : `feat: créer le parcours Ma séance en démonstration`.

Base : `feat/mission-01-foundations`, tant que la PR #1 n’est pas fusionnée. Rebaser et recibler vers `main` après intégration de la Mission 01, sans fusion automatique.

## Vérifications réalisées

`npm ci`, `npm run typecheck`, `npm run build` et `git diff --check` réussis. Chromium : 15 parcours complets (3 matières × 5 largeurs), 60 contrôles de débordement sur les quatre étapes ; validations obligatoires, conservation des choix au retour, indice masquable, bilan, redémarrage et rechargement vérifiés. Focus sur le titre vérifié à chaque étape, aucune erreur JavaScript détectée. Correction du layout pour préserver le focus déjà placé par une page.
