import Pressable from "../../ios/Pressable";
import { gradientFor, initialsOf } from "./tiles";

// A square tile in the Photos grid. Quotes run to ~390 characters, so the
// tile shows initials and a short preview and the full text lives in the
// viewer.
const PhotoTile = ({ person, index, onPress }) => {
  const [from, to] = gradientFor(index);

  return (
    <Pressable
      onClick={onPress}
      variant="fade"
      aria-label={`Testimonial from ${person.name}`}
      className="relative aspect-square w-full overflow-hidden"
      style={{ backgroundImage: `linear-gradient(160deg, ${from}, ${to})` }}
    >
      <span className="absolute left-2 top-2 text-[15px] font-semibold text-white/90">
        {initialsOf(person.name)}
      </span>
      <span className="absolute inset-x-2 bottom-2 line-clamp-3 text-left text-[10px] leading-snug text-white/85">
        &ldquo;{person.quote}&rdquo;
      </span>
    </Pressable>
  );
};

export default PhotoTile;
