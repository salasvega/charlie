import { Sparkles } from "lucide-react";
export function Brand() {
  return (
    <div className="brand">
      <span className="brand-mark">
        <Sparkles size={25} aria-hidden="true" />
      </span>
      <span>
        charlie<span className="version">2.0</span>
      </span>
    </div>
  );
}
