import type {
  AvatarColor,
  AvatarExpression,
  AvatarAccessory,
} from "../data/avatar";
export function AvatarPreview({
  color,
  expression,
  accessory,
  label,
}: {
  color: AvatarColor;
  expression: AvatarExpression;
  accessory: AvatarAccessory;
  label: string;
}) {
  return (
    <div
      className={`avatar-stage avatar-${color}`}
      role="img"
      aria-label={label}
    >
      <div className="avatar-orbit" />
      <div className="avatar-body">
        {accessory === "leaf" && <span className="avatar-leaf" />}
        {accessory === "star" && <span className="avatar-star">✦</span>}
        <div className={`avatar-face expression-${expression}`}>
          <i />
          <i />
          <span />
        </div>
      </div>
      <span className="avatar-ground" />
    </div>
  );
}
