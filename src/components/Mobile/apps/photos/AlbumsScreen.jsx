import { TESTIMONIALS } from "@/constants";
import { useMobileStore } from "@/store/useMobileStore";
import Screen from "../../ios/Screen";
import NavBar from "../../ios/NavBar";
import Pressable from "../../ios/Pressable";
import { gradientFor } from "./tiles";

const ALBUMS = [
  { id: "kind-words", name: "Kind Words", from: 0 },
  { id: "people", name: "People", from: 1 },
  { id: "favorites", name: "Favourites", from: 2 },
];

const AlbumsScreen = ({ back, tabs, bottomInset }) => {
  const push = useMobileStore((s) => s.push);

  return (
    <Screen
      nav={<NavBar title="Albums" large back={back} />}
      tabs={tabs}
      bottomInset={bottomInset}
      background="plain"
    >
      <div className="grid grid-cols-2 gap-4 px-4 pb-8 pt-2">
        {ALBUMS.map((album) => {
          const [from, to] = gradientFor(album.from);
          return (
            <Pressable
              key={album.id}
              onClick={() => push("viewer", { index: album.from })}
              className="text-left"
            >
              <span
                className="block aspect-square w-full rounded-ios-md"
                style={{ backgroundImage: `linear-gradient(160deg, ${from}, ${to})` }}
              />
              <span className="mt-2 block text-ios-subhead text-ios-label">{album.name}</span>
              <span className="block text-ios-footnote text-ios-label-2">
                {TESTIMONIALS.length}
              </span>
            </Pressable>
          );
        })}
      </div>
    </Screen>
  );
};

export default AlbumsScreen;
