import { useRef } from "react";
import Pressable from "../ios/Pressable";

// One home-screen icon. Measures itself on press so the app can zoom out of
// exactly this rect.
const AppIconTile = ({ app, onOpen, showLabel = true, size = 60 }) => {
  const ref = useRef(null);
  const Icon = app.Icon;

  return (
    <Pressable
      ref={ref}
      onClick={() => onOpen(app.id, ref.current?.getBoundingClientRect())}
      aria-label={app.name}
      className="flex flex-col items-center"
    >
      <span className="block shadow-ios-icon" style={{ width: size, height: size, borderRadius: size * 0.2237 }}>
        <Icon />
      </span>
      {showLabel && (
        <span className="mt-1.5 max-w-[74px] truncate text-[11px] leading-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]">
          {app.name}
        </span>
      )}
    </Pressable>
  );
};

export default AppIconTile;
