# Visuels du Studio Avatar

Les images suivantes ont été reconstituées avec un outil de génération d’images, en prenant la maquette officielle Studio Avatar fournie dans la conversation comme référence. Ce ne sont pas les exports originaux.

- `humans.png` : cinq portraits humains préparés (chignon/hoodie violet, blonde/hoodie gris, cheveux longs/hoodie bleu nuit, lunettes/chemise violette, boucles courtes/hoodie violet), fond transparent.
- `companions.png` : robot blanc et bleu, puis mascotte chat orange, fond transparent.
- `rooms.png` : quatre décors de travail (bureau Charlie, fenêtre, plantes, bibliothèque).

L’aperçu humain par défaut réutilise également `../ux-reference/classroom-hero.png`, déjà validé sur les écrans précédents ; le paysage de montagnes réutilise `../ux-reference/valley.png`. Les portraits et les décors sont composés/cadrés en CSS, sans découpe destructive des fichiers sources.

Les contrôles Humain utilisent des apparences préparées liées : modifier un visage, une coiffure ou une tenue applique le portrait correspondant, plutôt que de simuler un éditeur 3D indépendant. Les détails de génération, de pose et de cadrage restent des écarts à la référence, à remplacer par des assets officiels lorsqu’ils seront disponibles.
