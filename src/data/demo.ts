// Données entièrement fictives, sans profil réel ni persistance.
export const demoStats = [
  {
    value: "2 h 35",
    label: "de curiosité cette semaine",
    change: "+ 35 min",
    tone: "blue",
  },
  {
    value: "12",
    label: "séances terminées",
    change: "+ 3 séances",
    tone: "purple",
  },
  {
    value: "5 jours",
    label: "de belle régularité",
    change: "Continue comme ça !",
    tone: "orange",
  },
] as const;
export const demoSubjects = [
  {
    name: "Mathématiques",
    topic: "Les équations",
    progress: 65,
    symbol: "x²",
    tone: "blue",
  },
  {
    name: "Français",
    topic: "Les figures de style",
    progress: 42,
    symbol: "Aa",
    tone: "purple",
  },
  {
    name: "Sciences",
    topic: "Le système solaire",
    progress: 78,
    symbol: "✳",
    tone: "teal",
  },
] as const;
