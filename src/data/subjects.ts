import { sessionSubjects } from "./session";

// Catalogue de démonstration : seule la première notion de chaque matière
// dispose d’un exemple préparé. Les autres notions ne sont pas des cours.
const upcomingTopics = {
  maths: ["Les fractions", "Le théorème de Pythagore"],
  francais: ["Les accords", "Le récit et ses points de vue"],
  sciences: ["Les états de la matière", "Les écosystèmes"],
} as const;
export const subjectsCatalog = sessionSubjects.map((subject) => ({
  ...subject,
  upcoming: upcomingTopics[subject.id],
}));
export function normalizeSearch(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}
