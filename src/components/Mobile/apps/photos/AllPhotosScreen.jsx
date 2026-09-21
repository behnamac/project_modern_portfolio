import { TESTIMONIALS } from "@/constants";
import { useMobileStore } from "@/store/useMobileStore";
import Screen from "../../ios/Screen";
import NavBar from "../../ios/NavBar";
import PhotoTile from "./PhotoTile";

// Edge-to-edge 3-column square grid with 2px gutters, as iOS Photos does it.
const AllPhotosScreen = ({ back, tabs, bottomInset }) => {
  const push = useMobileStore((s) => s.push);

  return (
    <Screen
      nav={<NavBar title="All Photos" large back={back} />}
      tabs={tabs}
      bottomInset={bottomInset}
      background="plain"
    >
      <div className="grid grid-cols-3 gap-0.5">
        {TESTIMONIALS.map((person, i) => (
          <PhotoTile
            key={person.id}
            person={person}
            index={i}
            onPress={() => push("viewer", { index: i })}
          />
        ))}
      </div>
      <p className="px-4 py-4 text-center text-ios-footnote text-ios-label-2">
        {TESTIMONIALS.length} photos &middot; kind words from people I&rsquo;ve worked with
      </p>
    </Screen>
  );
};

export default AllPhotosScreen;
