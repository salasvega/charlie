import { Play, Square } from "lucide-react";
import { PortraitSprite } from "./PortraitSprite";
import {
  humanPresets,
  studioStyles,
  studioBackgrounds,
} from "../../data/avatarStudio";
import type { StudioConfig } from "../../data/avatarStudio";
export function StudioBackground({
  background,
}: {
  background: StudioConfig["background"];
}) {
  const index =
    studioBackgrounds.find((item) => item.id === background)?.index ?? 0;
  return (
    <span
      className={`studio-background${background === "mountains" ? " background-mountains" : ""}`}
      style={
        background === "mountains"
          ? undefined
          : { backgroundPosition: `${(index * 100) / 3}% center` }
      }
    />
  );
}
export function StudioPreview({
  config,
  speaking,
  onSpeak,
}: {
  config: StudioConfig;
  speaking: boolean;
  onSpeak: () => void;
}) {
  const label = `Charlie ${studioStyles.find((item) => item.id === config.style)?.label}, ${config.style === "human" ? humanPresets[config.appearance].label : ""}, ${studioBackgrounds.find((item) => item.id === config.background)?.label}`;
  return (
    <section
      className="studio-preview"
      id="studio-preview"
      tabIndex={-1}
      aria-label="Aperçu de ton avatar"
    >
      <StudioBackground background={config.background} />
      {config.style === "human" &&
        config.appearance === 0 &&
        config.background === "studio" && (
          <span className="studio-original-scene" aria-hidden="true" />
        )}
      <div
        className={`studio-figure figure-${config.style}${config.style === "human" && config.appearance === 0 && config.background === "studio" ? " original-figure" : ""}`}
      >
        <PortraitSprite
          kind={config.style === "human" ? "human" : "companion"}
          index={
            config.style === "human"
              ? config.appearance
              : config.style === "robot"
                ? 0
                : 1
          }
          label={label}
        />
      </div>
      <div className="studio-welcome">
        <strong>Salut Nina ! 👋</strong>
        <p>
          Je suis Charlie, ton prof virtuel. On adapte mon apparence, ma voix et
          mon style pour que tu te sentes à l’aise. Dis-moi ce que tu aimes !
        </p>
      </div>
      <button type="button" className="studio-preview-voice" onClick={onSpeak}>
        {speaking ? (
          <Square size={25} />
        ) : (
          <Play size={25} fill="currentColor" />
        )}
        {speaking ? "Arrêter la préécoute" : "Prévisualiser ma voix"}
      </button>
      <span className="studio-preview-demo">
        Aperçu illustré · profil fictif
      </span>
    </section>
  );
}
