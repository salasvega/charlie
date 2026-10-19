import { BookOpen, Globe2, FlaskConical, Leaf } from "lucide-react";
export function HomeSymbol({ symbol, tone }: { symbol: string; tone: string }) {
  const Icon =
    symbol === "book"
      ? BookOpen
      : symbol === "globe"
        ? Globe2
        : symbol === "flask"
          ? FlaskConical
          : symbol === "leaf"
            ? Leaf
            : null;
  return (
    <span className={`ref-subject-symbol ref-tone-${tone}`} aria-hidden="true">
      {Icon ? <Icon size={29} strokeWidth={1.9} /> : symbol}
    </span>
  );
}
