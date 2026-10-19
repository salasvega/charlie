export function PortraitSprite({
  kind = "human",
  index = 0,
  zoom = false,
  label,
}: {
  kind?: "human" | "companion";
  index?: number;
  zoom?: boolean;
  label?: string;
}) {
  const count = kind === "human" ? 5 : 2;
  return (
    <span
      className={`studio-sprite${zoom ? " portrait-zoom" : ""}`}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <img
        src={`/images/avatar-studio/${kind === "human" ? "humans" : "companions"}.png`}
        alt=""
        draggable={false}
        style={{
          width: `${count * 100}%`,
          transform: `translateX(-${(index * 100) / count}%)`,
        }}
      />
    </span>
  );
}
