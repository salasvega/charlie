# Réalignement UX/UI — référence officielle

## Source et périmètre

Référence reçue dans la conversation : image de l’Accueil Charlie 2.0, 1536 × 1024. Elle est désormais prioritaire sur les choix visuels antérieurs. La maquette Ma séance V2 a été reçue après validation de l’Accueil : sa comparaison est dans `MA_SEANCE_V2.md`. Les maquettes Studio Avatar, Mes progrès et Mes défis restent à recevoir.

Cette branche corrige uniquement l’Accueil et sa navigation. Les routes, parcours de séance, catalogue et autres écrans restent préservés. Aucun changement n’est fusionné automatiquement, ni propagé à la branche Netlify existante. Validation de l’Accueil requise avant de poursuivre.

## Comparaison Accueil

| Élément | Version existante | Maquette officielle | Correction |
| --- | --- | --- | --- |
| Composition | Tableau de bord aéré, bandeau violet autonome | Illustration plein bandeau, cartes superposées, densité élevée | Reconstruire la grille et les superpositions |
| Navigation | Sidebar blanche de 244 px, petit logo | Sidebar bleu nuit de 244 px, grand logo et slogan, sélection violette | Sidebar spécifique à l’Accueil |
| En-tête | Fil d’Ariane et pastille démo | Bonjour Nina, citation, actions et profil sur l’illustration | En-tête superposé avec profil fictif explicite |
| Couleurs | Fond presque blanc, pastels discrets | Bleu nuit, violet vif, cyan, fond lavande | Tokens dédiés au nouveau thème |
| Typographie | Police système, petits libellés | Sans arrondie, titres compacts et gras | Police locale choisie pour se rapprocher de la référence |
| Matières | Trois lignes | Six cartes compactes sur une ligne | Six cartes illustrées, données de démo isolées |
| Priorités | Absentes | Trois tâches avec actions | Reconstituer la liste ; actions vers les exemples disponibles |
| Défis | Une grande carte | Trois lignes pastel avec récompenses | Reprendre les trois lignes, récompenses fictives |
| Progrès | Trois statistiques horizontales | Rail droit, anneau 62 %, régularité, badges et objectif | Reconstituer le rail sans modifier la page Mes progrès |
| Bas de page | Une note | Objectifs, concentration et aperçu avatar | Reconstituer les trois cartes |
| Illustration | Mascotte géométrique CSS | Adolescente brune en hoodie violet dans sa chambre/bureau | Reconstruction guidée par la référence ; sources originales nécessaires pour une identité exacte |

## Plan écran par écran

1. **Accueil** : composition et navigation → design system isolé → illustrations → responsive → captures réelles desktop et mobile → bilan des écarts → validation.
2. **Ma séance V2** : attendre la référence V2 ; conserver les parcours techniques compatibles et donner la dominance à la conversation centrale selon la maquette. Aucun appel IA implicite.
3. **Studio Avatar** : attendre la référence, comparer les zones de personnalisation et l’aperçu avant correction.
4. **Mes progrès** : attendre la référence, distinguer les indicateurs illustratifs de toute mesure réelle de maîtrise.
5. **Mes défis** : attendre la référence de l’île des connaissances et ses illustrations avant correction.

## Mobile

Conserver le bleu nuit et le violet ; remplacer la sidebar par un menu compact, réorganiser les matières et le rail en pleine largeur, maintenir les cibles tactiles et une lecture sans débordement. La référence fournie est desktop : l’adaptation mobile sera une déclinaison, pas une maquette mobile officielle.

## Première livraison Accueil — à valider

Captures réelles Chromium : `captures/accueil-1536.png` et `captures/accueil-390.png`. Capture desktop prise à la même largeur que la référence. La hauteur totale de page inclut une mention de démonstration additionnelle.

### Corrections réalisées

- Sidebar bleu nuit, logo texte, slogan, état actif violet et carte paysage.
- Bandeau illustré avec salutation, citation, message de Charlie, recherche, notifications et profil fictif.
- Grille de six matières, priorités cochables localement, trois défis avec récompenses explicitement fictives, rail de progression 62 %, régularité, badges et objectif.
- Cartes inférieures : saisie d’objectif de démonstration, mode concentration masquant les panneaux secondaires, galerie renvoyant au Studio Avatar existant.
- Recherche fonctionnelle dans les six matières ; messages de démonstration sans envoi, pas de microphone ni de pièce jointe actifs.
- Trois matières supplémentaires illustrent la référence mais n’ajoutent pas de faux parcours : Histoire-Géo, Anglais et SVT renvoient au catalogue existant. Mathématiques, Français et Sciences conservent leur présélection de séance.
- Thème isolé dans `src/styles/home-reference.css`, layout `HomeLayout` uniquement pour `/`. Les autres pages utilisent toujours `AppLayout` et leur design précédent.
- Nunito Sans embarquée localement (sous-ensemble latin) ; aucune dépendance à un serveur de polices.

### Écarts restants par rapport à la référence

1. **Illustrations** : reconstitutions guidées par la maquette, proches de son univers mais pas identiques aux exports originaux. Personnage, paysage et portraits ont des différences de détail/cadrage.
2. **Pictogrammes** : Lucide et symboles typographiques remplacent certaines icônes illustrées en volume. Les couleurs, emplacements et dimensions suivent la référence, mais leur dessin n’est pas identique.
3. **Police** : Nunito Sans est une approximation ; la famille exacte et les fichiers typographiques de la maquette ne sont pas disponibles.
4. **Contenu** : messages, date d’exemple, priorités et libellés sont adaptés à une démonstration honnête. Aucun programme réellement personnalisé, apprentissage évalué, gain de points ou voix d’avatar n’est annoncé comme fonctionnel.
5. **Mobile** : adaptation ergonomique créée depuis la composition desktop, faute de maquette mobile officielle. Sidebar remplacée par menu ; matières sur trois colonnes, puis rail et cartes empilés.

### Vérifications

Installation reproductible, TypeScript strict, build de production, tests de parcours existants et tests ajoutés pour la recherche, notifications, concentration, objectifs et priorités locales. Vérification responsive à 360, 390, 768, 1024, 1366 et 1536 px, aucune erreur JavaScript ni débordement horizontal. Captures desktop et mobile inspectées visuellement puis ajustement du cadrage du personnage et des espacements.

**Point d’arrêt : validation utilisateur de l’Accueil avant toute correction des autres écrans. Aucune fusion automatique ni mise à jour de la branche de production.**

## Validation et étape suivante

L’Accueil a été validé explicitement dans la conversation. Le travail se poursuit uniquement sur Ma séance V2, sur une branche distincte basée sur cette version de l’Accueil. La validation visuelle n’autorise pas de fusion automatique dans main.
