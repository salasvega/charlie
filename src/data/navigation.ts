import {
  House,
  Sparkles,
  BookOpen,
  ChartNoAxesCombined,
  Trophy,
  UserRound,
} from "lucide-react";
export const navigation = [
  {
    path: "/",
    label: "Accueil",
    icon: House,
    description: "Ton espace pour apprendre à ton rythme.",
  },
  {
    path: "/ma-seance",
    label: "Ma séance",
    icon: Sparkles,
    description:
      "Un espace pour préparer tes prochaines séances et avancer pas à pas.",
  },
  {
    path: "/mes-matieres",
    label: "Mes matières",
    icon: BookOpen,
    description:
      "Toutes tes matières réunies dans un espace clair et organisé.",
  },
  {
    path: "/mes-progres",
    label: "Mes progrès",
    icon: ChartNoAxesCombined,
    description:
      "Un espace pour visualiser ton parcours et célébrer chaque avancée.",
  },
  {
    path: "/mes-defis",
    label: "Mes défis",
    icon: Trophy,
    description:
      "De petits objectifs pour garder ton élan et explorer de nouvelles idées.",
  },
  {
    path: "/studio-avatar",
    label: "Studio Avatar",
    icon: UserRound,
    description: "Un espace pour imaginer un avatar qui te ressemble.",
  },
] as const;
