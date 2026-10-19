// Profil, statistiques, priorités et récompenses entièrement fictifs.
// Le contenu de cette maquette n’est pas une mesure de maîtrise pédagogique.
export const referenceSubjects = [
  {
    id: "maths",
    name: "Mathématiques",
    symbol: "Σ",
    progress: 75,
    tone: "maths",
    target: "/ma-seance?matiere=maths",
  },
  {
    id: "francais",
    name: "Français",
    symbol: "book",
    progress: 60,
    tone: "french",
    target: "/ma-seance?matiere=francais",
  },
  {
    id: "histoire",
    name: "Histoire-Géo",
    symbol: "globe",
    progress: 45,
    tone: "history",
    target: "/mes-matieres",
  },
  {
    id: "anglais",
    name: "Anglais",
    symbol: "🇬🇧",
    progress: 70,
    tone: "english",
    target: "/mes-matieres",
  },
  {
    id: "sciences",
    name: "Sciences",
    symbol: "flask",
    progress: 55,
    tone: "science",
    target: "/ma-seance?matiere=sciences",
  },
  {
    id: "svt",
    name: "SVT",
    symbol: "leaf",
    progress: 40,
    tone: "biology",
    target: "/mes-matieres",
  },
] as const;
export const referencePriorities = [
  {
    id: "maths",
    title: "Mathématiques",
    description: "Équations : s’entraîner sur un exemple",
    symbol: "Σ",
    tone: "maths",
    target: "/ma-seance?matiere=maths",
  },
  {
    id: "anglais",
    title: "Anglais",
    description: "Réviser le vocabulaire : les voyages",
    symbol: "🇬🇧",
    tone: "english",
    target: "/mes-matieres",
  },
  {
    id: "francais",
    title: "Français",
    description: "Lire et explorer les figures de style",
    symbol: "book",
    tone: "french",
    target: "/ma-seance?matiere=francais",
  },
] as const;
export const referenceChallenges = [
  {
    title: "Défi Express",
    description: "5 questions pour réviser les bases en mathématiques",
    reward: 50,
    symbol: "target",
    tone: "pink",
  },
  {
    title: "Défi Réflexion",
    description: "Résoudre un problème étape par étape",
    reward: 75,
    symbol: "brain",
    tone: "gold",
  },
  {
    title: "Défi Culture",
    description: "Une découverte surprenante en sciences",
    reward: 50,
    symbol: "leaf",
    tone: "mint",
  },
] as const;
