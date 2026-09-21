import { motion } from "framer-motion";
import { TECH_STACK } from "@/constants";
import Screen from "../../ios/Screen";
import NavBar from "../../ios/NavBar";

// The desktop Terminal's two-column grid (130px + 1fr) cannot hold 7
// categories of comma-separated tech at 375px, so each row stacks: category
// on one line, technologies wrapping underneath.
const TerminalScreen = ({ back, tabs, bottomInset }) => (
  <Screen
    nav={<NavBar title="techstack.sh" back={back} />}
    tabs={tabs}
    bottomInset={bottomInset}
    background="none"
  >
    <div className="min-h-full bg-[#0d0f14] px-4 pb-10 pt-4 font-ios-mono text-[13px] text-[#e6e6e6]">
      <p className="mb-3 text-[#3ee06a]">
        behnam@portfolio <span className="text-white/40">~</span> % cat techstack.sh
      </p>

      {TECH_STACK.map((row, i) => (
        <motion.div
          key={row.category}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1, duration: 0.3 }}
          className="mb-2.5"
        >
          <p className="text-[#3ee06a]">&#10003; {row.category}</p>
          <p className="mt-0.5 pl-4 leading-relaxed text-white/85">{row.technologies}</p>
        </motion.div>
      ))}

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: TECH_STACK.length * 0.1 + 0.2 }}
        className="mt-4 border-t border-white/10 pt-3 text-[#3ee06a]"
      >
        &#10003; {TECH_STACK.length} of {TECH_STACK.length} stacks loaded (100%)
      </motion.p>

      <p className="mt-4">
        <span className="text-[#3ee06a]">behnam@portfolio ~ %</span>{" "}
        <span className="cursor-blink">&#9608;</span>
      </p>
    </div>
  </Screen>
);

export default TerminalScreen;
