# Réalignement — Ma séance V2

## Référence et périmètre

Maquette reçue après validation de l’Accueil : image 1536 × 1024, séance de fonctions avec conversation centrale, avatar secondaire et outils pédagogiques dans un rail droit. Branche basée sur l’Accueil validé mais non fusionné ; aucune fusion automatique ni modification des écrans suivants.

| Zone | Version antérieure | Référence V2 | Plan |
| --- | --- | --- | --- |
| Navigation | Sidebar blanche, en-tête de page classique | Sidebar bleu nuit identique à l’Accueil | Réutiliser le layout validé, actif Ma séance |
| Haut | Titre et quatre étapes | Six matières, ajout, niveau, séance du jour | Barre compacte fidèle, matières non disponibles vers catalogue |
| Contenu | Formulaire séquentiel et une question | Carte d’exercice au-dessus d’une conversation dominante | Vue V2 directe sur /ma-seance ; préparation préservée dans un dialogue |
| Avatar | Icône abstraite | Personnage dans le décor, bulle et commandes | Réutiliser l’illustration validée, cadrage secondaire ; statut démo |
| Conversation | Aucune conversation visuelle | Bulles Charlie/élève, saisie et indices accessibles | Scénario préparé, saisie locale explicitement non évaluée |
| Outils | Indice unique | Six outils et espace de travail avec trois onglets | Panneaux préparés, calculatrice locale bornée, notes locales |
| Progression | Étapes de préparation | Anneau, liste d’activités et objectif | Indicateurs fictifs, aucune maîtrise déduite |
| Responsive | Formulaire centré | Maquette desktop uniquement | Conversation prioritaire, avatar réduit et outils accessibles sur mobile |

## Contraintes conservées

Pas d’IA, backend, connexion Supabase, compte réel, sauvegarde ni envoi de contenu. Pas de statut « En ligne » fictif ni d’activation audio/caméra implicite. Les réponses saisies ne sont pas évaluées. La préparation de séance, les trois matières existantes, la présélection d’URL, les indices et le bilan restent accessibles.

L’URL /ma-seance montre le scénario de fonctions de la référence. Un lien contenant `matiere` conserve la préparation avec la matière présélectionnée ; un paramètre inconnu ouvre la préparation sans sélection. Après préparation, les trois exemples antérieurs restent disponibles. Recharger réinitialise l’état local.

## Ordre d’implémentation

1. Réutiliser le layout validé sans changer le rendu de l’Accueil.
2. Ajouter la composition V2 et la conversation préparée de référence.
3. Préserver la préparation, le bilan et les liens ; brancher les outils locaux.
4. Adapter le mobile ; tests, captures réelles, comparaison puis validation utilisateur.

## Livraison à valider

Captures réelles Chromium : `captures/ma-seance-v2-1536.png` et `captures/ma-seance-v2-390.png`. Largeur desktop identique à la référence, adaptation mobile vérifiée sur plusieurs tailles.

### Composition reproduite

- Sidebar bleu nuit et état actif Ma séance, logo et slogan de l’Accueil validé. La carte paysage reprend le texte de cette nouvelle référence.
- Barre des six matières, ajout/préparation, niveau indicatif et avancement fictif de la séance.
- Avatar secondaire à gauche ; carte de fonctions et conversation au centre ; saisie, quatre aides accessibles et accès au bilan.
- Six outils pédagogiques, espace de travail à trois onglets, anneau de progression, liste des activités et objectif du jour dans le rail droit.
- Sur mobile : avatar réduit, matières défilantes, aides sur deux colonnes et accès explicite aux outils sans bouton masquant les messages.

### Comportements et limites

- Le scénario de fonctions et ses échanges sont préparés. Les réponses saisies sont affichées uniquement en mémoire ; elles ne sont ni envoyées ni corrigées.
- Le choix de niveau est indicatif ; il ne fabrique pas un exercice adapté. Les progressions restent fictives, y compris après une réponse.
- Les fiches, exemples, formules, explications et indices affichent un contenu préparé. « Aide personnalisée » ouvre une aide guidée explicitement non personnalisée.
- La calculatrice gère deux nombres et les quatre opérations, y compris le cas de division par zéro, sans `eval`.
- Le brouillon propose trois zones de notes textuelles indépendantes. Couleurs, annulation/rétablissement et effacement agissent localement. L’onglet Schéma permet une description textuelle, pas un éditeur de dessin manuscrit.
- Aucune autorisation audio, vidéo ou de fichier n’est demandée. Les commandes concernées indiquent leur indisponibilité.
- Préparation accessible via « + », matière et objectif conservés ; un nouveau départ utilise `?preparer=1`, sans matière sélectionnée. Un lien avec matière inconnue conserve la validation obligatoire.

### Écarts graphiques restants

1. Le personnage, le décor et les portraits réutilisent les reconstitutions de l’Accueil déjà validé. Le cadrage et les détails ne sont pas strictement identiques au visuel de séance ; les exports originaux permettraient une reproduction exacte.
2. Les icônes Lucide remplacent les pictogrammes en volume. Nunito Sans et Caveat sont des polices locales proches de la direction artistique ; les familles officielles ne sont pas connues.
3. Certaines formulations sont adaptées : pas de statut fictif « En ligne », de correction réelle de réponse ou d’annonce de maîtrise. Les horodatages sont signalés comme exemples.
4. La préparation et le bilan sont conservés en dialogues, en complément de la composition V2. Les outils sont bornés au mode démonstration.
5. L’adaptation mobile est déduite de la maquette desktop ; aucune référence mobile n’a été fournie.

### Vérifications

Installation reproductible, TypeScript strict et build de production réussis. Suite de 20 tests Playwright couvrant les parcours existants et V2 : réponses locales sans POST, aides, calculatrice (division par zéro et fermeture clavier), notes/onglets/couleurs/annulation/rétablissement, rechargement et contrôle du débordement à 360, 390, 768, 1024, 1366 et 1536 px. Captures desktop et mobile inspectées puis ajustées.

L’Accueil validé conserve son thème et sa composition par défaut. Studio Avatar, Mes progrès et Mes défis ne sont pas modifiés. Aucun push vers main ou vers la branche Netlify de production. Attendre la validation de Ma séance V2 avant de poursuivre.

Contrôle de non-régression visuelle : une nouvelle capture de l’Accueil à 1536 × 1024 est strictement identique au PNG de la version validée (comparaison binaire réussie).
