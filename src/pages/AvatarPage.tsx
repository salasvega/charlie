import { useEffect, useRef, useState } from "react";
import { Sparkles, CheckCircle2, ArrowRight, RotateCcw } from "lucide-react";
import { HomeLayout } from "../layouts/HomeLayout";
import {
  StudioPreview,
  StudioBackground,
} from "../components/avatar/StudioPreview";
import { PortraitSprite } from "../components/avatar/PortraitSprite";
import { StylePicker } from "../components/avatar/StylePicker";
import { VoicePanel } from "../components/avatar/VoicePanel";
import { PersonalityPanel } from "../components/avatar/PersonalityPanel";
import { AvatarTestPanel } from "../components/avatar/AvatarTestPanel";
import { StudioGallery } from "../components/avatar/StudioGallery";
import {
  defaultStudioConfig,
  loadStudioConfig,
  studioStorageKey,
  studioVoices,
  humanPresets,
  studioBackgrounds,
  studioStyles,
} from "../data/avatarStudio";
import type { StudioConfig } from "../data/avatarStudio";
import "../styles/home-reference.css";
import "../styles/avatar-reference.css";
export function AvatarPage() {
  const [initial] = useState(loadStudioConfig);
  const [config, setConfig] = useState<StudioConfig>(initial.config);
  const [notice, setNotice] = useState(initial.notice);
  const [saved, setSaved] = useState(JSON.stringify(initial.config));
  const [mode, setMode] = useState<"preview" | "customize">("preview");
  const [focus, setFocus] = useState(false);
  const [gallery, setGallery] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const speech = useRef<SpeechSynthesisUtterance | null>(null);
  useEffect(
    () => () => {
      if (speech.current && "speechSynthesis" in window)
        window.speechSynthesis.cancel();
    },
    [],
  );
  useEffect(() => {
    if ("speechSynthesis" in window) window.speechSynthesis.getVoices();
  }, []);
  function update(patch: Partial<StudioConfig>) {
    setConfig((current) => ({ ...current, ...patch }));
  }
  function save() {
    try {
      localStorage.setItem(studioStorageKey, JSON.stringify(config));
      setSaved(JSON.stringify(config));
      setNotice(
        "Avatar enregistré sur cet appareil uniquement. Aucun compte ni serveur n’est utilisé.",
      );
    } catch {
      setNotice(
        "L’enregistrement local est indisponible. Tes choix restent utilisables pour cette visite.",
      );
    }
  }
  function reset() {
    setConfig(defaultStudioConfig());
    setGallery(false);
    setNotice(
      "Le compagnon a retrouvé son apparence initiale. Clique sur Enregistrer pour conserver ces choix.",
    );
  }
  function randomize() {
    setConfig((current) => ({
      ...current,
      style: studioStyles[Math.floor(Math.random() * studioStyles.length)].id,
      appearance: Math.floor(Math.random() * humanPresets.length),
      background:
        studioBackgrounds[Math.floor(Math.random() * studioBackgrounds.length)]
          .id,
    }));
    setGallery(false);
    setNotice("Une nouvelle combinaison préparée est affichée.");
  }
  function forget() {
    try {
      localStorage.removeItem(studioStorageKey);
      setConfig(defaultStudioConfig());
      setSaved(JSON.stringify(defaultStudioConfig()));
      setNotice("La sauvegarde de cet appareil a été supprimée.");
    } catch {
      setNotice(
        "Le stockage local est indisponible. La suppression n’a pas pu être confirmée.",
      );
    }
    setGallery(false);
  }
  function speak() {
    if (
      !("speechSynthesis" in window) ||
      !("SpeechSynthesisUtterance" in window)
    ) {
      setNotice("La préécoute vocale n’est pas disponible dans ce navigateur.");
      return;
    }
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      speech.current = null;
      return;
    }
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(
      (item) =>
        item.localService &&
        item.lang.replace("_", "-").toLowerCase() ===
          config.language.toLowerCase(),
    );
    if (!voice) {
      setNotice(
        "Aucune voix locale compatible n’est disponible pour cette langue. Aucun service distant n’a été appelé.",
      );
      return;
    }
    const selected = studioVoices.find((item) => item.id === config.voice)!;
    const utterance = new SpeechSynthesisUtterance(
      config.language === "en-US"
        ? "Hello! I’m Charlie. Let’s learn step by step."
        : "Salut ! Je suis Charlie. On avance ensemble, à ton rythme.",
    );
    utterance.voice = voice;
    utterance.lang = config.language;
    utterance.rate = selected.rate;
    utterance.pitch = selected.pitch;
    utterance.onend = () => {
      setSpeaking(false);
      speech.current = null;
    };
    utterance.onerror = () => {
      setSpeaking(false);
      speech.current = null;
      setNotice(
        "La voix locale n’a pas pu être lue. Aucun service distant n’est utilisé.",
      );
    };
    speech.current = utterance;
    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
  }
  function navigateMode(next: typeof mode) {
    setMode(next);
    document
      .getElementById(
        next === "preview" ? "studio-preview" : "studio-appearance",
      )
      ?.scrollIntoView({ block: "nearest" });
  }
  return (
    <HomeLayout
      variant="avatar"
      pageTitle="Studio Avatar"
      focus={focus}
      onToggleFocus={() => setFocus(!focus)}
    >
      <div
        className={`avatar-studio${mode === "customize" ? " studio-customize" : ""}`}
      >
        <header className="studio-header">
          <div>
            <Sparkles size={35} aria-hidden="true" />
            <span>
              <h1>Studio Avatar</h1>
              <p>Choisis et personnalise ton professeur Charlie</p>
            </span>
          </div>
          <div className="studio-mode" role="group" aria-label="Mode du Studio">
            <button
              aria-pressed={mode === "preview"}
              onClick={() => navigateMode("preview")}
            >
              Aperçu
            </button>
            <button
              aria-pressed={mode === "customize"}
              onClick={() => navigateMode("customize")}
            >
              Personnalisation
            </button>
          </div>
          <button
            className="studio-save"
            onClick={save}
            aria-label="Enregistrer mon avatar"
            aria-description={
              saved !== JSON.stringify(config)
                ? "Modifications non enregistrées"
                : "Enregistre la configuration sur cet appareil uniquement"
            }
          >
            <CheckCircle2 size={28} />
            <span>Enregistrer mon avatar</span>
            {saved !== JSON.stringify(config) && <i aria-hidden="true" />}
          </button>
        </header>
        <div className="studio-columns">
          <div className="studio-left">
            <StudioPreview
              config={config}
              speaking={speaking}
              onSpeak={speak}
            />
            <VoicePanel
              config={config}
              onChange={update}
              speaking={speaking}
              onSpeak={speak}
            />
            <PersonalityPanel config={config} onChange={update} />
          </div>
          <div className="studio-right">
            <section
              className="studio-card studio-styles"
              aria-labelledby="studio-styles-title"
            >
              <div className="studio-section-heading">
                <h2 id="studio-styles-title">
                  <Sparkles size={20} />
                  1. Choisis un style
                </h2>
                <button onClick={() => setGallery(true)}>
                  Voir plus d’avatars
                  <ArrowRight size={15} />
                </button>
              </div>
              <StylePicker
                style={config.style}
                onSelect={(style) => update({ style })}
              />
            </section>
            <section
              className="studio-card studio-appearance"
              id="studio-appearance"
              tabIndex={-1}
              aria-labelledby="studio-appearance-title"
            >
              <div className="studio-section-heading">
                <h2 id="studio-appearance-title">
                  <Sparkles size={20} />
                  2. Personnalise son apparence
                </h2>
                <button
                  onClick={() => {
                    update({ appearance: 0, background: "studio" });
                    setNotice("Apparence et arrière-plan réinitialisés.");
                  }}
                >
                  <RotateCcw size={14} />
                  Réinitialiser
                </button>
              </div>
              <div className="studio-appearance-grid">
                <fieldset disabled={config.style !== "human"}>
                  <legend>Visage</legend>
                  <div>
                    {humanPresets.slice(0, 4).map((preset) => (
                      <label className="studio-thumb" key={preset.id}>
                        <input
                          type="radio"
                          className="studio-hidden-radio"
                          name="studio-face"
                          checked={config.appearance === preset.id}
                          onChange={() => update({ appearance: preset.id })}
                          aria-label={`Visage : ${preset.label}`}
                        />
                        <PortraitSprite index={preset.id} zoom />
                      </label>
                    ))}
                  </div>
                </fieldset>
                <fieldset disabled={config.style !== "human"}>
                  <legend>Coiffure</legend>
                  <div>
                    {humanPresets.map((preset) => (
                      <label className="studio-thumb" key={preset.id}>
                        <input
                          type="radio"
                          className="studio-hidden-radio"
                          name="studio-hair"
                          checked={config.appearance === preset.id}
                          onChange={() => update({ appearance: preset.id })}
                          aria-label={`Coiffure : ${preset.label}`}
                        />
                        <PortraitSprite index={preset.id} zoom />
                      </label>
                    ))}
                  </div>
                </fieldset>
                <fieldset disabled={config.style !== "human"}>
                  <legend>Tenue</legend>
                  <div>
                    {humanPresets.slice(0, 4).map((preset) => (
                      <label
                        className="studio-thumb outfit-thumb"
                        key={preset.id}
                      >
                        <input
                          type="radio"
                          className="studio-hidden-radio"
                          name="studio-outfit"
                          checked={
                            config.appearance === preset.id ||
                            (config.appearance === 4 && preset.id === 0)
                          }
                          onChange={() => update({ appearance: preset.id })}
                          aria-label={`Tenue : ${preset.label}`}
                        />
                        <PortraitSprite index={preset.id} />
                      </label>
                    ))}
                  </div>
                </fieldset>
                <fieldset>
                  <legend>Arrière-plan</legend>
                  <div>
                    {studioBackgrounds.map((background) => (
                      <label
                        className="studio-thumb background-thumb"
                        key={background.id}
                      >
                        <input
                          type="radio"
                          className="studio-hidden-radio"
                          name="studio-background"
                          checked={config.background === background.id}
                          onChange={() => update({ background: background.id })}
                          aria-label={`Arrière-plan : ${background.label}`}
                        />
                        <StudioBackground background={background.id} />
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>
              <p className="studio-preset-note">
                {config.style === "human"
                  ? "Apparences préparées : visage, coiffure et tenue sont liés."
                  : "Visage, coiffure et tenue concernent le style Humain. Le décor reste personnalisable."}
              </p>
            </section>
            <AvatarTestPanel config={config} onNotice={setNotice} />
          </div>
        </div>
        <div className="studio-footer">
          <span>
            Studio de démonstration · configuration enregistrable sur cet
            appareil seulement · aucun compte connecté
          </span>
          {notice && (
            <div className="studio-feedback" role="status">
              <p>{notice}</p>
              <button onClick={() => setNotice("")}>Fermer</button>
            </div>
          )}
        </div>
        {gallery && (
          <StudioGallery
            config={config}
            onSelect={(style) => {
              update({ style });
              setGallery(false);
            }}
            onRandom={randomize}
            onReset={reset}
            onForget={forget}
            onClose={() => setGallery(false)}
          />
        )}
      </div>
    </HomeLayout>
  );
}
