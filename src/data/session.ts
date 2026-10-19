// Contenu scénarisé de démonstration ; aucune génération ni évaluation réelle.
export const sessionSubjects = [
  {
    id: "maths",
    label: "Mathématiques",
    symbol: "x²",
    tone: "blue",
    topic: "Les équations",
    prompt:
      "Avant de commencer, quelle opération permettrait d’isoler x dans x + 4 = 9 ?",
    hint: "Imagine une balance : applique la même opération de chaque côté.",
    takeaway:
      "Pour garder une égalité vraie, on effectue la même opération sur ses deux membres.",
  },
  {
    id: "francais",
    label: "Français",
    symbol: "Aa",
    tone: "purple",
    topic: "Les figures de style",
    prompt:
      "Dans « cette nouvelle est un rayon de soleil », quelle image rapproche-t-on d’une bonne nouvelle ?",
    hint: "Cherche les deux idées rapprochées, sans outil de comparaison comme « tel » ou « comme ».",
    takeaway:
      "La métaphore rapproche deux réalités sans outil de comparaison explicite.",
  },
  {
    id: "sciences",
    label: "Sciences",
    symbol: "✳",
    tone: "teal",
    topic: "Le système solaire",
    prompt:
      "Quel astre est au centre du système solaire ? Prends un instant pour te le représenter.",
    hint: "Cet astre produit la lumière et la chaleur reçues par la Terre.",
    takeaway:
      "Les planètes du système solaire sont en orbite autour du Soleil.",
  },
] as const;
export const sessionGoals = [
  "Comprendre une notion",
  "Revoir l’essentiel",
  "M’entraîner pas à pas",
] as const;
