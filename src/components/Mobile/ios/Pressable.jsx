import { forwardRef } from "react";
import { motion } from "framer-motion";
import { SPRING } from "../metrics";

// Every tappable thing on the phone. Single tap (never double-click, which is
// the desktop metaphor the old mobile shell inherited), and either the icon
// squeeze or the grey flash iOS uses on list rows.
//
// Forwards its ref because home-screen icons measure themselves to drive the
// launch zoom.
const Pressable = forwardRef(function Pressable(
  { as = "button", variant = "scale", className = "", children, ...rest },
  ref
) {
  const Component = motion[as] || motion.button;

  return (
    <Component
      ref={ref}
      whileTap={variant === "scale" ? { scale: 0.92 } : { opacity: 0.55 }}
      transition={SPRING.snappy}
      className={className}
      {...rest}
    >
      {children}
    </Component>
  );
});

export default Pressable;
