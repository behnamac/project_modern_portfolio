import { motion } from "framer-motion";
import { TECH_STACK } from "@/constants";

const TerminalApp = () => (
  <div className="min-h-full bg-[#0d0f14] p-5 font-mono-term text-[13px] text-[#e6e6e6]">
    <p className="mb-3 text-[#3ee06a]">
      behnam@portfolio <span className="text-white/40">~</span> % cat techstack.sh
    </p>
    <p className="mb-2 text-white/60">Techstack</p>
    <div className="mb-2 grid grid-cols-[130px_1fr] gap-y-1">
      <span className="text-white/40">Category</span>
      <span className="text-white/40">Technologies</span>
    </div>
    <div className="mb-3 border-t border-white/10" />
    {TECH_STACK.map((row, i) => (
      <motion.div
        key={row.category}
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: i * 0.12, duration: 0.3 }}
        className="grid grid-cols-[130px_1fr] gap-y-1 py-0.5"
      >
        <span className="text-[#3ee06a]">&#10003; {row.category}</span>
        <span>{row.technologies}</span>
      </motion.div>
    ))}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: TECH_STACK.length * 0.12 + 0.2 }}
      className="mt-4 border-t border-white/10 pt-3 text-[#3ee06a]"
    >
      &#10003; {TECH_STACK.length} of {TECH_STACK.length} stacks loaded successfully (100%)
      <br />
      <span className="text-white/50">&#9660; Render time: 6ms</span>
    </motion.div>
    <p className="mt-4">
      <span className="text-[#3ee06a]">behnam@portfolio ~ %</span>{" "}
      <span className="cursor-blink">&#9608;</span>
    </p>
  </div>
);

export default TerminalApp;
