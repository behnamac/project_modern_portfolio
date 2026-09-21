import Pressable from "./Pressable";
import { METRICS } from "../metrics";

// Bottom tab bar. Unselected items use the flat iOS gray rather than a label
// token: iOS keeps tab glyphs opaque gray in both themes.
const TabBar = ({ items, active, onChange, bottomInset = 0 }) => (
  <div
    role="tablist"
    className="absolute inset-x-0 bottom-0 z-10 flex bg-ios-chrome-tab backdrop-blur-ios backdrop-saturate-150 ios-hairline-t"
    style={{ paddingBottom: bottomInset, height: METRICS.tabBar + bottomInset }}
  >
    {items.map((item) => {
      const selected = item.id === active;
      const Icon = item.Icon;
      return (
        <Pressable
          key={item.id}
          variant="fade"
          role="tab"
          aria-selected={selected}
          onClick={() => onChange(item.id)}
          className={`flex flex-1 flex-col items-center pt-1.5 ${
            selected ? "text-ios-blue" : "text-ios-gray"
          }`}
        >
          <Icon className="h-[26px] w-[26px]" width={selected ? 2 : 1.6} />
          <span className="mt-[3px] text-ios-tab">{item.label}</span>
        </Pressable>
      );
    })}
  </div>
);

export default TabBar;
