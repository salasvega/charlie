import { useState } from "react";
import { RotateCcw, Shuffle } from "lucide-react";
import { PageHeading } from "../components/PageHeading";
import { AvatarPreview } from "../components/AvatarPreview";
import {
  avatarColors,
  avatarExpressions,
  avatarAccessories,
} from "../data/avatar";
import type {
  AvatarColor,
  AvatarExpression,
  AvatarAccessory,
} from "../data/avatar";
export function AvatarPage() {
  const [color, setColor] = useState<AvatarColor>("blue");
  const [expression, setExpression] = useState<AvatarExpression>("smile");
  const [accessory, setAccessory] = useState<AvatarAccessory>("leaf");
  const [message, setMessage] = useState("");
  const label = `Compagnon ${avatarColors.find((item) => item.id === color)?.label}, ${avatarExpressions.find((item) => item.id === expression)?.label}, ${avatarAccessories.find((item) => item.id === accessory)?.label}`;
  function randomize() {
    function pick<T>(items: readonly T[]): T {
      return items[Math.floor(Math.random() * items.length)];
    }
    setColor(pick(avatarColors).id);
    setExpression(pick(avatarExpressions).id);
    setAccessory(pick(avatarAccessories).id);
    setMessage("Une nouvelle combinaison est affichée.");
  }
  function reset() {
    setColor("blue");
    setExpression("smile");
    setAccessory("leaf");
    setMessage("Le compagnon a retrouvé son apparence initiale.");
  }
  return (
    <>
      <PageHeading
        title="Studio Avatar"
        eyebrow="UNE TOUCHE DE TOI, UN BRIN D’IMAGINATION"
        description="Imagine un compagnon haut en couleur et essaie plusieurs styles."
      />
      <p className="demo-notice">
        Studio de démonstration. L’aperçu change uniquement ici : aucune image
        ni donnée personnelle n’est envoyée. Les choix sont effacés en quittant
        la rubrique ou en rechargeant la page.
      </p>
      <div className="avatar-editor">
        <section
          className="card avatar-preview-panel"
          aria-labelledby="avatar-preview-heading"
        >
          <h2 id="avatar-preview-heading">Ton compagnon</h2>
          <AvatarPreview
            color={color}
            expression={expression}
            accessory={accessory}
            label={label}
          />
          <p className="avatar-description" aria-live="polite">
            {label}
          </p>
          <button
            type="button"
            className="button button-primary"
            onClick={randomize}
          >
            <Shuffle size={17} aria-hidden="true" />
            Surprends-moi
          </button>
        </section>
        <section
          className="card avatar-controls"
          aria-label="Personnaliser le compagnon"
        >
          <fieldset>
            <legend>Sa couleur</legend>
            <div className="avatar-options">
              {avatarColors.map((item) => (
                <label key={item.id}>
                  <input
                    type="radio"
                    name="avatar-color"
                    value={item.id}
                    checked={color === item.id}
                    onChange={() => setColor(item.id)}
                  />
                  <span
                    className={`avatar-swatch ${item.id}`}
                    aria-hidden="true"
                  />
                  {item.label}
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend>Son expression</legend>
            <div className="avatar-options">
              {avatarExpressions.map((item) => (
                <label key={item.id}>
                  <input
                    type="radio"
                    name="avatar-expression"
                    value={item.id}
                    checked={expression === item.id}
                    onChange={() => setExpression(item.id)}
                  />
                  {item.label}
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend>Son accessoire</legend>
            <div className="avatar-options">
              {avatarAccessories.map((item) => (
                <label key={item.id}>
                  <input
                    type="radio"
                    name="avatar-accessory"
                    value={item.id}
                    checked={accessory === item.id}
                    onChange={() => setAccessory(item.id)}
                  />
                  {item.label}
                </label>
              ))}
            </div>
          </fieldset>
          <button type="button" className="session-back" onClick={reset}>
            <RotateCcw size={16} aria-hidden="true" />
            Réinitialiser l’avatar
          </button>
          <p className="avatar-feedback" role="status">
            {message}
          </p>
        </section>
      </div>
    </>
  );
}
