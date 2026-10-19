import { AudioLines, Play, Square, Sparkles } from "lucide-react";
import { studioVoices } from "../../data/avatarStudio";
import type { StudioConfig } from "../../data/avatarStudio";
export function VoicePanel({
  config,
  onChange,
  speaking,
  onSpeak,
}: {
  config: StudioConfig;
  onChange: (patch: Partial<StudioConfig>) => void;
  speaking: boolean;
  onSpeak: () => void;
}) {
  return (
    <section
      className={`studio-card studio-voice${speaking ? " is-speaking" : ""}`}
      aria-labelledby="studio-voice-title"
    >
      <h2 id="studio-voice-title">
        <Sparkles size={20} />
        3. Choisis sa voix
      </h2>
      <div className="studio-audio-bar">
        <button
          className="studio-play"
          onClick={onSpeak}
          aria-label={
            speaking ? "Arrêter la voix" : "Écouter la voix de Charlie"
          }
        >
          {speaking ? (
            <Square size={19} fill="currentColor" />
          ) : (
            <Play size={21} fill="currentColor" />
          )}
        </button>
        <strong>Voix de Charlie</strong>
        <AudioLines size={23} />
        <div className="studio-wave" aria-hidden="true">
          {Array.from({ length: 43 }, (_, index) => (
            <i
              key={index}
              style={{
                height: `${4 + Math.abs(Math.sin(index * 1.9)) * 19}px`,
                opacity: index > 31 ? 0.15 : 1,
              }}
            />
          ))}
        </div>
        <label>
          <span className="ref-sr-only">Langue de la préécoute</span>
          <select
            value={config.language}
            onChange={(event) =>
              onChange({
                language: event.target.value as StudioConfig["language"],
              })
            }
          >
            <option value="fr-FR">Français (France)</option>
            <option value="fr-CA">Français (Canada)</option>
            <option value="en-US">English (US)</option>
          </select>
        </label>
      </div>
      <div className="studio-voice-options">
        {studioVoices.map((voice) => (
          <label
            className={`studio-voice-option voice-${voice.tone}`}
            key={voice.id}
          >
            <input
              className="studio-hidden-radio"
              type="radio"
              name="studio-voice"
              checked={config.voice === voice.id}
              onChange={() => onChange({ voice: voice.id })}
            />
            <AudioLines size={23} />
            <span>
              <strong>{voice.label}</strong>
              <small>{voice.description}</small>
            </span>
          </label>
        ))}
      </div>
      <p className="studio-voice-note">
        Préécoute avec une voix locale compatible du navigateur, si disponible.
      </p>
    </section>
  );
}
