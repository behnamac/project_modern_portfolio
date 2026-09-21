import { motion } from "framer-motion";
import { SPRING } from "../metrics";

// iOS segmented control. The thumb is a single layoutId element so it slides
// between segments instead of cross-fading.
const SegmentedControl = ({ items, active, onChange, layoutId = "seg-thumb" }) => (
  <div className="relative flex h-8 rounded-ios-seg bg-ios-fill-3 p-0.5">
    {items.map((item) => {
      const selected = item.id === active;
      return (
        <button
          key={item.id}
          type="button"
          onClick={() => onChange(item.id)}
          aria-pressed={selected}
          className="relative z-10 flex-1 text-ios-footnote text-ios-label"
        >
          {selected && (
            <motion.span
              layoutId={layoutId}
              transition={SPRING.snappy}
              className="absolute inset-0 rounded-ios-thumb bg-ios-chrome-thumb shadow-ios-thumb"
            />
          )}
          <span className={`relative ${selected ? "font-semibold" : "font-normal"}`}>
            {item.label}
          </span>
        </button>
      );
    })}
  </div>
);

export default SegmentedControl;
