# Version de démonstration complète

Les six rubriques sont maintenant accessibles. Les Missions 01, 02 et 03 ont été intégrées à `main` après vérification des contrôles GitHub et des parcours locaux, conformément à l’autorisation d’autonomie du propriétaire.

## Fonctionnalités

- Accueil : chiffres fictifs, accès au catalogue et aux séances.
- Ma séance : matière, objectif, exemple préparé, indice, bilan fictif et redémarrage ; présélection par lien validée.
- Mes matières : recherche, filtre, notions disponibles et à venir.
- Mes progrès : statistiques fictives partagées avec l’accueil, graphique de 155 minutes (tableau accessible) et parcours illustratifs.
- Mes défis : trois défis fictifs, filtres tous/en cours/terminés, liens vers les rubriques. Aucune récompense attribuée.
- Studio Avatar : quatre couleurs, trois expressions, trois accessoires, combinaison aléatoire et remise à zéro. État éphémère, sans image téléversée, profil réel ni sauvegarde.

Correction de revue : changer de matière masque désormais l’indice de la matière précédente. Le pied de page de séance explique la présélection conservée dans l’URL.

## Contrôles automatisés

`npm ci`, `npm run typecheck`, `npm run build` puis `npm run test:e2e`.

Les tests Playwright utilisent le build de production et couvrent les six routes à 360, 768 et 1440 px, le menu mobile, les filtres et liens, le parcours séance, un paramètre invalide, l’indice après changement de matière, la cohérence du graphique, les filtres de défis, le studio avatar et la page 404.

Pour préparer Chromium : `npx playwright install chromium`. En environnement avec Chromium système : `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e`. Le workflow GitHub installe Chromium avec ses dépendances et exécute les tests après le build.

## Déploiement et retour arrière

Netlify est relié au dépôt `salasvega/charlie`, projet `moncharlie`. La dernière branche indiquée par le propriétaire est `feat/mission-03-subjects-catalog`. Pour publier la version intégrée, cette branche peut être avancée en fast-forward au commit validé de `main`, sans réécriture d’historique. Le push doit déclencher le build automatique si cette intégration Netlify est toujours active.

À terme, utiliser `main` comme branche de production dans Netlify et garder les branches de travail pour les Deploy Previews. Modifier ce réglage nécessite un accès Netlify.

Un push n’est pas une preuve de publication : vérifier le résultat Netlify et l’URL. Pour revenir à une version précédente, republier un déploiement réussi depuis Netlify ou créer un commit de revert via PR ; ne pas forcer la branche distante.

## Limites de la version

Cette livraison termine le démonstrateur, pas une plateforme pédagogique avec IA. Aucun compte, Supabase, appel OpenAI, suivi réel, paiement ou collecte de données personnelles. Les intégrations de production demandent une mission dédiée, la configuration des services et des contrôles adaptés aux données des élèves.
