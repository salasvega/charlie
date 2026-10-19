# Réalignement — Studio Avatar

## Référence

Maquette reçue après validation de l’Accueil et de Ma séance V2, 1536 × 1024. Cette mission corrige uniquement le Studio Avatar ; les autres écrans restent figés. Branche basée sur Ma séance V2 validée, sans fusion automatique.

| Zone | Version précédente | Référence officielle | Correction prévue |
| --- | --- | --- | --- |
| Structure | Aperçu géométrique et petits groupes de contrôles | Deux colonnes denses, grand personnage à gauche | Grille, dimensions et hiérarchie de la référence |
| Navigation | Sidebar blanche | Sidebar bleu nuit, actif violet | Réutiliser le layout validé |
| En-tête | Titre simple et mention de démonstration | Titre/sous-titre, Aperçu/Personnalisation, Enregistrer | Reproduire l’en-tête et rendre les commandes explicites |
| Style | Un seul robot stylisé | Humain, Robot, Mascotte | Trois styles illustrés dans l’univers validé |
| Apparence | Couleurs, expression et accessoire abstraits | Visage, coiffure, tenue et arrière-plan | Apparences préparées, options cohérentes et aperçu réactif |
| Voix | Absente | Lecture, langue, quatre intentions vocales | Préécoute navigateur si voix locale compatible, sinon état indisponible honnête |
| Personnalité | Absente | Trois curseurs, ton et cinq cases | Réglages locaux, sans prétendre modifier une IA |
| Test | Absent | Message d’accueil, suggestions et saisie | Échanges de démonstration locaux, non évalués |

## Contraintes

Pas de backend, appel IA, compte, clé, collecte personnelle ou envoi de messages. L’enregistrement est limité à une configuration non personnelle sur l’appareil, uniquement après action explicite. Les sources originales des illustrations ne sont pas disponibles ; les visuels seront reconstruits d’après la référence et les écarts signalés.

## Plan

Composition et thème isolé → portraits et apparences préparées → commandes locales → responsive → captures réelles et comparaison → validation utilisateur avant les écrans suivants.

## Livraison à valider

Captures réelles : `captures/studio-avatar-1536.png` et `captures/studio-avatar-390.png`. La capture desktop utilise les dimensions de la référence. La page inclut des mentions supplémentaires pour distinguer une démonstration des futurs services.

### Corrections réalisées

- Navigation bleu nuit, actif Studio Avatar et carte paysage, dans le layout partagé déjà validé.
- En-tête avec titre, modes Aperçu/Personnalisation (navigation vers les zones de travail) et bouton d’enregistrement.
- Composition en deux colonnes, grand personnage/décor/bulle à gauche ; cartes styles, apparence et test à droite ; voix et personnalité sous l’aperçu.
- Trois styles : Humain, Robot et Mascotte. Cinq apparences humaines préparées ; visage/coiffure/tenue liés et annoncés comme tels. Décor indépendant parmi cinq arrière-plans. Les contrôles humains sont désactivés pour Robot et Mascotte.
- Remise à zéro d’apparence, galerie, combinaison aléatoire et réinitialisation complète. Les anciens composants du compagnon géométrique restent présents dans le dépôt ; leur affichage a été remplacé pour respecter l’univers officiel.
- Trois curseurs, ton et cinq préférences d’enseignement. Ces réglages constituent une configuration locale, pas un moteur pédagogique connecté.
- Quatre intentions vocales ; préécoute explicitement demandée par l’utilisateur, uniquement si une voix locale compatible est disponible via le navigateur. Aucun service vocal externe ni microphone. L’environnement de tests ne fournit pas de voix locale : le cas indisponible est vérifié.
- Zone de test avec suggestions et réponses préparées. Le texte saisi est uniquement affiché en mémoire, jamais envoyé ni enregistré dans la configuration.

### Enregistrement local

« Enregistrer mon avatar » écrit uniquement les champs de configuration connus dans `localStorage` (`charlie.studio-avatar.v1`), après action explicite. Aucune sauvegarde automatique, aucun profil, nom ou message. Les données relues sont validées (version, choix autorisés, bornes des curseurs et cases booléennes). Une sauvegarde incompatible ou un stockage indisponible n’empêche pas d’utiliser le studio. La galerie permet d’oublier cette sauvegarde locale. Les choix non enregistrés sont abandonnés au rechargement.

### Écarts restants

1. Les illustrations restent des reconstitutions : les personnages, vêtements, poses, cadrages et décors ne sont pas strictement identiques aux exports originaux. Le grand aperçu humain initial réutilise le visuel déjà validé pour préserver la continuité.
2. La personnalisation d’apparence applique un portrait préparé complet ; visage, coiffure et tenue ne sont pas combinés indépendamment. Ce lien est indiqué sous les choix. Aucun modèle 3D ni génération à la demande.
3. Les icônes Lucide et la police locale Nunito Sans remplacent certains pictogrammes illustrés et la famille exacte inconnue.
4. Préécoute dépendante des voix locales installées ; personnalité et conversation bornées à une démonstration. Aucun effet sur une IA réelle.
5. Adaptation mobile issue de la composition desktop : colonnes empilées, contrôles répartis et accès direct aux zones via les modes de l’en-tête ; aucune maquette mobile officielle reçue.

### Vérifications

Installation reproductible (`npm ci`), typage strict et build de production réussis. Suite Playwright : **31 tests réussis**. Contrôles du Studio sur six largeurs (360, 390, 768, 1024, 1366, 1536 px), des apparences liées, sauvegarde explicite et suppression, données incompatibles, quota indisponible, voix absente, suggestions et messages sans POST. Captures réelles inspectées et ajustées.

Contrôle de non-régression : nouvelles captures de l’Accueil et de Ma séance V2 à 1536 × 1024 strictement identiques aux PNG validés (comparaison binaire réussie pour les deux).

**Point d’arrêt : attendre la validation du Studio Avatar avant Mes progrès et Mes défis. Aucune fusion automatique, aucune mise à jour de la branche Netlify de production.**
