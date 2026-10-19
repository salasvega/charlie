export const avatarColors = [
  { id: "blue", label: "Bleu électrique" },
  { id: "purple", label: "Violet" },
  { id: "teal", label: "Turquoise" },
  { id: "orange", label: "Orange" },
] as const;
export const avatarExpressions = [
  { id: "smile", label: "Sourire" },
  { id: "wink", label: "Clin d’œil" },
  { id: "surprised", label: "Surprise" },
] as const;
export const avatarAccessories = [
  { id: "leaf", label: "Petite feuille" },
  { id: "star", label: "Étoile" },
  { id: "none", label: "Sans accessoire" },
] as const;
export type AvatarColor = (typeof avatarColors)[number]["id"];
export type AvatarExpression = (typeof avatarExpressions)[number]["id"];
export type AvatarAccessory = (typeof avatarAccessories)[number]["id"];
