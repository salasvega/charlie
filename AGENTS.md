# Conventions de développement — Charlie 2.0

- Utiliser React, TypeScript strict, Vite, Tailwind CSS, Lucide React et React Router.
- Travailler sur une branche dédiée. Ne jamais fusionner automatiquement dans `main`.
- Garder les composants en PascalCase et les données et utilitaires en camelCase.
- Placer les routes dans `src/app`, les layouts dans `src/layouts`, les pages dans `src/pages`, les composants partagés dans `src/components` et les données fictives dans `src/data`.
- Centraliser les tokens et composants visuels réutilisables dans `src/styles/theme.css`. Les tokens `@theme` sont aussi accessibles comme utilitaires Tailwind.
- Préférer les liens pour naviguer et les boutons pour agir. Conserver des labels accessibles, un focus visible, les titres hiérarchisés et le support clavier.
- Vérifier mobile, tablette et ordinateur, ainsi que l’absence de débordement horizontal.
- Ne pas ajouter de données personnelles, de secrets, de connexion Supabase ou d’API OpenAI pendant cette mission.
- Identifier explicitement les données fictives. Aucun comportement pédagogique avancé à cette étape.
- Avant livraison : `npm ci`, `npm run typecheck`, `npm run build`, puis contrôle de la navigation et du responsive si un navigateur est disponible. Rapporter les limites de vérification.
- Documenter toute nouvelle dépendance et mettre à jour le README si l’architecture ou les commandes changent.
