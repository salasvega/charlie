import { useEffect, useRef } from "react";
import { X, Shuffle, RotateCcw } from "lucide-react";
import type { StudioConfig } from "../../data/avatarStudio";
import { StylePicker } from "./StylePicker";
export function StudioGallery({
  config,
  onSelect,
  onRandom,
  onReset,
  onForget,
  onClose,
}: {
  config: StudioConfig;
  onSelect: (style: StudioConfig["style"]) => void;
  onRandom: () => void;
  onReset: () => void;
  onForget: () => void;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = dialog.current;
    element?.showModal();
    return () => element?.close();
  }, []);
  return (
    <dialog
      className="studio-gallery"
      ref={dialog}
      onCancel={onClose}
      aria-labelledby="studio-gallery-title"
    >
      <button
        className="studio-gallery-close"
        onClick={onClose}
        aria-label="Fermer la galerie"
      >
        <X size={20} />
      </button>
      <h2 id="studio-gallery-title">Les compagnons Charlie</h2>
      <p>
        Trois styles illustrés et des apparences préparées, sans génération à la
        demande.
      </p>
      <StylePicker
        style={config.style}
        name="gallery-style"
        onSelect={onSelect}
      />
      <div className="studio-gallery-actions">
        <button onClick={onRandom}>
          <Shuffle size={17} />
          Surprends-moi
        </button>
        <button onClick={onReset}>
          <RotateCcw size={17} />
          Réinitialiser l’avatar
        </button>
        <button onClick={onForget}>Oublier la sauvegarde locale</button>
      </div>
    </dialog>
  );
}
