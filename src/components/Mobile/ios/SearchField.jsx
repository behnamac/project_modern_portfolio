import { SearchGlyph, MicGlyph, XmarkGlyph } from "../icons/Glyphs";

// iOS search field: 36pt, the #767680-at-12% fill, magnifier and mic. The mic
// is decorative (there is nothing to dictate to), so it is aria-hidden and
// swaps to a working clear button once there is text.
const SearchField = ({ value, onChange, placeholder = "Search" }) => (
  <div className="px-4 py-2">
    <div className="flex h-9 items-center rounded-ios-field bg-ios-fill-3 px-2">
      <SearchGlyph className="h-4 w-4 shrink-0 text-ios-label-2" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="ml-1.5 h-full min-w-0 flex-1 bg-transparent text-ios-body text-ios-label outline-none placeholder:text-ios-label-2 [&::-webkit-search-cancel-button]:hidden"
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="shrink-0 text-ios-label-2"
        >
          <XmarkGlyph className="h-4 w-4" />
        </button>
      ) : (
        <MicGlyph className="h-4 w-4 shrink-0 text-ios-label-2" aria-hidden="true" />
      )}
    </div>
  </div>
);

export default SearchField;
