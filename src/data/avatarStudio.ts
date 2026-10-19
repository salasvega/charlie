export const studioStyles = [
  {
    id: "human",
    label: "Humain",
    description: "Un prof proche de toi,\nnaturel et bienveillant",
  },
  {
    id: "robot",
    label: "Robot",
    description: "Moderne, dynamique\net toujours motivant",
  },
  {
    id: "mascot",
    label: "Mascotte",
    description: "Ludique et pleine d’énergie\npour apprendre en s’amusant",
  },
] as const;
export const humanPresets = [
  { id: 0, label: "Chignon brun et hoodie violet" },
  { id: 1, label: "Cheveux blonds et hoodie gris" },
  { id: 2, label: "Cheveux longs et hoodie bleu nuit" },
  { id: 3, label: "Lunettes et chemise violette" },
  { id: 4, label: "Boucles courtes et hoodie violet" },
] as const;
export const studioBackgrounds = [
  { id: "studio", label: "Bureau Charlie", index: 0 },
  { id: "window", label: "Grande fenêtre", index: 1 },
  { id: "plants", label: "Atelier végétal", index: 2 },
  { id: "library", label: "Bibliothèque", index: 3 },
  { id: "mountains", label: "Lac et montagnes", index: 4 },
] as const;
export const studioVoices = [
  {
    id: "natural",
    label: "Naturelle",
    description: "Calme et bienveillante",
    tone: "purple",
    rate: 0.95,
    pitch: 1,
  },
  {
    id: "dynamic",
    label: "Dynamique",
    description: "Enthousiaste",
    tone: "teal",
    rate: 1.1,
    pitch: 1.05,
  },
  {
    id: "serious",
    label: "Sérieuse",
    description: "Posée et structurée",
    tone: "indigo",
    rate: 0.9,
    pitch: 0.95,
  },
  {
    id: "playful",
    label: "Ludique",
    description: "Joyeuse et énergique",
    tone: "pink",
    rate: 1.05,
    pitch: 1.15,
  },
] as const;
export const teachingChoices = [
  "Pose des questions pour me faire réfléchir",
  "Donne des indices progressifs",
  "Utilise des exemples concrets",
  "Propose des schémas et des visuels",
  "S’adapte à mon niveau",
] as const;
export type StudioConfig = {
  version: 1;
  style: (typeof studioStyles)[number]["id"];
  appearance: number;
  background: (typeof studioBackgrounds)[number]["id"];
  voice: (typeof studioVoices)[number]["id"];
  language: "fr-FR" | "fr-CA" | "en-US";
  encouragement: number;
  rigor: number;
  humor: number;
  tone: "relaxed" | "balanced" | "focused";
  teaching: boolean[];
};
export const studioStorageKey = "charlie.studio-avatar.v1";
export function defaultStudioConfig(): StudioConfig {
  return {
    version: 1,
    style: "human",
    appearance: 0,
    background: "studio",
    voice: "natural",
    language: "fr-FR",
    encouragement: 45,
    rigor: 45,
    humor: 48,
    tone: "balanced",
    teaching: teachingChoices.map(() => true),
  };
}
export function validateStudioConfig(value: unknown): StudioConfig | null {
  if (typeof value !== "object" || value === null) return null;
  const item = value as Record<string, unknown>;
  if (
    item.version !== 1 ||
    !studioStyles.some((style) => style.id === item.style) ||
    !Number.isInteger(item.appearance) ||
    Number(item.appearance) < 0 ||
    Number(item.appearance) > 4 ||
    !studioBackgrounds.some((bg) => bg.id === item.background) ||
    !studioVoices.some((voice) => voice.id === item.voice) ||
    !["fr-FR", "fr-CA", "en-US"].includes(String(item.language)) ||
    !["relaxed", "balanced", "focused"].includes(String(item.tone))
  )
    return null;
  for (const key of ["encouragement", "rigor", "humor"])
    if (
      typeof item[key] !== "number" ||
      !Number.isFinite(item[key]) ||
      Number(item[key]) < 0 ||
      Number(item[key]) > 100
    )
      return null;
  if (
    !Array.isArray(item.teaching) ||
    item.teaching.length !== teachingChoices.length ||
    !item.teaching.every((choice) => typeof choice === "boolean")
  )
    return null;
  // Ne conserver que les champs de configuration connus, jamais de message ou de profil.
  return {
    version: 1,
    style: item.style as StudioConfig["style"],
    appearance: Number(item.appearance),
    background: item.background as StudioConfig["background"],
    voice: item.voice as StudioConfig["voice"],
    language: item.language as StudioConfig["language"],
    encouragement: Number(item.encouragement),
    rigor: Number(item.rigor),
    humor: Number(item.humor),
    tone: item.tone as StudioConfig["tone"],
    teaching: [...item.teaching],
  };
}
export function loadStudioConfig() {
  try {
    const raw = localStorage.getItem(studioStorageKey);
    if (!raw) return { config: defaultStudioConfig(), notice: "" };
    const config = validateStudioConfig(JSON.parse(raw));
    return config
      ? { config, notice: "Configuration chargée depuis cet appareil." }
      : {
          config: defaultStudioConfig(),
          notice:
            "La configuration locale est incompatible. L’avatar par défaut est affiché.",
        };
  } catch {
    return {
      config: defaultStudioConfig(),
      notice:
        "Le stockage local est indisponible. Tu peux utiliser le studio sans enregistrer.",
    };
  }
}
