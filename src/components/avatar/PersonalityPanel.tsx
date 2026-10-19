import { Sparkles } from "lucide-react";
import { teachingChoices } from "../../data/avatarStudio";
import type { StudioConfig } from "../../data/avatarStudio";
export function PersonalityPanel({
  config,
  onChange,
}: {
  config: StudioConfig;
  onChange: (patch: Partial<StudioConfig>) => void;
}) {
  return (
    <section
      className="studio-card studio-personality"
      aria-labelledby="studio-personality-title"
    >
      <h2 id="studio-personality-title">
        <Sparkles size={20} />
        4. Définis sa personnalité
      </h2>
      <p>Ajuste le style et l’approche pédagogique de Charlie.</p>
      <div className="studio-personality-grid">
        <div className="studio-personality-settings">
          <div className="studio-ranges">
            {[
              { key: "encouragement", label: "Niveau d’encouragement" },
              { key: "rigor", label: "Rigueur pédagogique" },
            ].map((item) => (
              <label key={item.key}>
                {item.label}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={config[item.key as "encouragement" | "rigor"]}
                  onChange={(event) =>
                    onChange({ [item.key]: Number(event.target.value) })
                  }
                  style={{
                    background: `linear-gradient(90deg,#823bff ${config[item.key as "encouragement" | "rigor"]}%,#dcdff5 0)`,
                  }}
                />
              </label>
            ))}
          </div>
          <fieldset className="studio-tones">
            <legend>Ton général</legend>
            <div>
              {(
                [
                  { id: "relaxed", label: "Détendu" },
                  { id: "balanced", label: "Équilibré" },
                  { id: "focused", label: "Soutenu" },
                ] as const
              ).map((item) => (
                <label key={item.id}>
                  <input
                    className="studio-hidden-radio"
                    type="radio"
                    name="studio-tone"
                    checked={config.tone === item.id}
                    onChange={() => onChange({ tone: item.id })}
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <label className="studio-humor">
            Humour
            <input
              type="range"
              min="0"
              max="100"
              value={config.humor}
              onChange={(event) =>
                onChange({ humor: Number(event.target.value) })
              }
              style={{
                background: `linear-gradient(90deg,#823bff ${config.humor}%,#dcdff5 0)`,
              }}
            />
          </label>
        </div>
        <fieldset className="studio-teaching">
          <legend>Style d’enseignement</legend>
          {teachingChoices.map((choice, index) => (
            <label key={choice}>
              <input
                type="checkbox"
                checked={config.teaching[index]}
                onChange={(event) =>
                  onChange({
                    teaching: config.teaching.map((value, i) =>
                      i === index ? event.target.checked : value,
                    ),
                  })
                }
              />
              {choice}
            </label>
          ))}
        </fieldset>
      </div>
      <p className="studio-personality-note">
        Réglages de démonstration, sans moteur pédagogique connecté.
      </p>
    </section>
  );
}
