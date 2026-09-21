import Pressable from "../../ios/Pressable";

// A tile in the Files grid. Labels run to 30 characters ("Project 6 (Patient
// management)") in a ~104px cell, so they wrap to two lines and clamp rather
// than truncating mid-word.
const FolderTile = ({ label, glyph, onPress }) => (
  <Pressable
    onClick={onPress}
    className="flex flex-col items-center gap-1.5 rounded-ios-md p-1 text-center"
  >
    <span className="h-[58px] w-[58px]">{glyph}</span>
    <span className="line-clamp-2 text-ios-caption text-ios-label">{label}</span>
  </Pressable>
);

export default FolderTile;
