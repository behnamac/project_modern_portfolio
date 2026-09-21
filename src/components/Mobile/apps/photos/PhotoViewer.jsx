import { motion } from "framer-motion";
import { TESTIMONIALS } from "@/constants";
import Screen from "../../ios/Screen";
import NavBar from "../../ios/NavBar";
import { gradientFor } from "./tiles";

// A testimonial opened full-screen — the only place the whole quote fits.
const PhotoViewer = ({ back, tabs, bottomInset, index = 0 }) => {
  const person = TESTIMONIALS[index];
  const [from, to] = gradientFor(index);

  if (!person) {
    return (
      <Screen nav={<NavBar title="Photo" back={back} />} tabs={tabs} bottomInset={bottomInset}>
        <p className="px-4 pt-16 text-center text-ios-body text-ios-label-2">
          That photo is gone.
        </p>
      </Screen>
    );
  }

  return (
    <Screen
      nav={<NavBar title={person.name} back={back} />}
      tabs={tabs}
      bottomInset={bottomInset}
      background="plain"
    >
      <motion.figure
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.22 }}
        className="mx-4 mb-6 mt-4 flex flex-col justify-between rounded-ios-card p-6"
        style={{ minHeight: 360, backgroundImage: `linear-gradient(160deg, ${from}, ${to})` }}
      >
        <blockquote className="text-[17px] leading-relaxed text-white">
          &ldquo;{person.quote}&rdquo;
        </blockquote>
        <figcaption className="mt-6">
          <p className="text-ios-headline text-white">{person.name}</p>
          <p className="mt-0.5 text-ios-footnote text-white/80">{person.title}</p>
        </figcaption>
      </motion.figure>
    </Screen>
  );
};

export default PhotoViewer;
