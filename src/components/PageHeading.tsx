import { Sparkles } from "lucide-react";
export function PageHeading({
  title,
  description,
  eyebrow,
}: {
  title: string;
  description: string;
  eyebrow: string;
}) {
  return (
    <div className="page-heading demo-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <span className="demo-pill">
        <Sparkles size={14} aria-hidden="true" />
        Démonstration
      </span>
    </div>
  );
}
