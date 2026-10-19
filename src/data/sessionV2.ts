import { sessionSubjects } from "./session";
export type SessionScenario = {
  id: string;
  subjectId: string;
  title: string;
  intro: string;
  formula?: string;
  questions: string[];
  coach: string;
  student: string;
  followup: string;
  hints: string[];
  method: string;
  course: string;
  example: string;
  scratch: string;
  steps: string[];
  takeaway: string;
  objective: string;
};
export const functionsScenario: SessionScenario = {
  id: "functions",
  subjectId: "maths",
  title: "Exercice 1 · Fonctions",
  intro: "Soit la fonction f définie sur ℝ par :",
  formula: "f(x) = 2x² − 4x + 1",
  questions: [
    "Calculer f(0) et f(3).",
    "Factoriser f(x) si possible.",
    "Déterminer la forme canonique de f.",
    "Résoudre l’équation f(x) = 0.",
  ],
  coach:
    "Très bien ! On va y aller étape par étape. 🎯\n\nCommençons par la question 1 :\nCalcule f(0) et f(3).\n\n👉 Qu’est-ce que tu obtiens pour f(0) ?\nPrends le temps de faire le calcul.\nSi tu bloques, un premier indice est disponible !",
  student: "Pour f(0), je remplace x par 0 :\nf(0) = 2 × 0² − 4 × 0 + 1 = 1",
  followup:
    "Dans cet exemple, f(0) = 1. ✅\n\nMaintenant, essaie de calculer f(3).\nTu peux le faire de la même façon. Prends ton temps !",
  hints: [
    "Pour calculer f(3), remplace chaque x par 3, sans oublier le carré.",
    "Commence par 3², puis les multiplications et enfin les additions et soustractions.",
  ],
  method:
    "Pour calculer une image : 1. Recopie l’expression. 2. Remplace chaque x par la valeur choisie. 3. Calcule les puissances puis les produits. 4. Termine les additions et soustractions.",
  course:
    "Une fonction associe à chaque nombre de son domaine une unique image. Pour f(x) = ax² + bx + c avec a ≠ 0, on parle de fonction polynôme du second degré. Calculer f(k) consiste à remplacer x par k.",
  example:
    "Exemple distinct : g(x) = x² + 2x. Alors g(2) = 2² + 2 × 2 = 8. Applique la même démarche à la fonction de l’exercice.",
  scratch: "f(0) = 2 × 0² − 4 × 0 + 1\n       = 0 − 0 + 1\n       = 1",
  steps: [
    "Calcul de f(0)",
    "Calcul de f(3)",
    "Factorisation",
    "Forme canonique",
    "Résolution de l’équation",
  ],
  takeaway:
    "Pour calculer l’image d’un nombre, on le substitue à x et on respecte les priorités de calcul.",
  objective: "Maîtriser les fonctions du second degré",
};
export function scenarioForSubject(id: string): SessionScenario {
  const subject =
    sessionSubjects.find((item) => item.id === id) ?? sessionSubjects[0];
  return {
    id: subject.id,
    subjectId: subject.id,
    title: `Exercice 1 · ${subject.topic}`,
    intro: subject.prompt,
    questions: [
      "Prends un instant pour réfléchir.",
      "Explique ta démarche à voix haute ou sur papier.",
    ],
    coach: `On avance à ton rythme. ✨\n\n${subject.prompt}\n\nTu peux utiliser les outils ou demander un indice.`,
    student: "Je prends le temps de réfléchir et de noter une première idée.",
    followup:
      "Cet échange est un exemple préparé. Explore l’indice et les outils pour poursuivre ta réflexion.",
    hints: [
      subject.hint,
      "Relis la question et repère ce que tu connais déjà. Reformule-la avec tes propres mots.",
    ],
    method:
      "Lis la question, relève les informations utiles, propose une démarche puis relis ton raisonnement.",
    course: subject.takeaway,
    example: `Repère de démonstration : ${subject.takeaway}`,
    scratch: "Mes premières idées…\n\n",
    steps: [
      "Découvrir la question",
      "Proposer une démarche",
      "Explorer un indice",
      "Faire un lien",
      "Relire le repère",
    ],
    takeaway: subject.takeaway,
    objective: `Explorer : ${subject.topic}`,
  };
}
