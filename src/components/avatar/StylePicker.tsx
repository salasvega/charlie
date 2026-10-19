import { Check } from "lucide-react";
import { studioStyles } from "../../data/avatarStudio";
import type { StudioConfig } from "../../data/avatarStudio";
import { PortraitSprite } from "./PortraitSprite";
export function StylePicker({
  style,
  onSelect,
  name = "avatar-style",
}: {
  style: StudioConfig["style"];
  onSelect: (style: StudioConfig["style"]) => void;
  name?: string;
}) {
  return (
    <div className="studio-style-cards">
      {studioStyles.map((item) => (
        <label className={`studio-style-card style-${item.id}`} key={item.id}>
          <input
            type="radio"
            className="studio-hidden-radio"
            name={name}
            checked={style === item.id}
            onChange={() => onSelect(item.id)}
            aria-label={item.label}
          />
          <div>
            <PortraitSprite
              kind={item.id === "human" ? "human" : "companion"}
              index={item.id === "mascot" ? 1 : 0}
              zoom
            />
            {style === item.id && (
              <span className="studio-selected">
                <Check size={17} />
              </span>
            )}
          </div>
          <strong>{item.label}</strong>
          <p>{item.description}</p>
        </label>
      ))}
    </div>
  );
}
