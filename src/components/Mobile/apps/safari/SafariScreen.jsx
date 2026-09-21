import { PROFILE, PROJECTS } from "@/constants";
import Screen from "../../ios/Screen";
import { SearchGlyph, ShareGlyph } from "../../icons/Glyphs";

// iOS Safari puts the address field at the BOTTOM — the single most
// recognisable difference from the desktop browser, so the chrome is bespoke
// rather than the desktop toolbar restyled.
const SafariScreen = ({ bottomInset }) => (
  <Screen background="plain" bottomInset={bottomInset}>
    <div className="px-5 pb-28 pt-4">
      <h1 className="text-ios-large-title text-ios-label">{PROFILE.name}</h1>
      <p className="mt-1 text-ios-subhead text-ios-label-2">
        {PROFILE.title} &middot; {PROFILE.location}
      </p>

      <h2 className="mb-2 mt-7 text-ios-footnote text-ios-label-2">Featured work</h2>
      <div className="space-y-3">
        {PROJECTS.slice(0, 4).map((p) => (
          <a
            key={p.id}
            href={p.liveUrl || p.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="block rounded-ios-card bg-ios-grouped-2 p-4 active:bg-ios-fill-4"
          >
            <p className="text-ios-headline text-ios-label">{p.name}</p>
            <p className="mt-1 text-ios-subhead text-ios-label-2">{p.description}</p>
            <p className="mt-2 text-ios-footnote text-ios-blue">
              {p.liveUrl ? "Visit the site" : "Check out the repo"} &rsaquo;
            </p>
          </a>
        ))}
      </div>
    </div>

    <div
      className="absolute inset-x-0 bottom-0 z-10 bg-ios-chrome-tab px-4 pb-2 pt-2 backdrop-blur-ios ios-hairline-t"
      style={{ paddingBottom: bottomInset + 8 }}
    >
      <div className="flex h-9 items-center gap-2 rounded-ios-field bg-ios-fill-3 px-3">
        <SearchGlyph className="h-4 w-4 shrink-0 text-ios-label-2" />
        <span className="flex-1 truncate text-center text-ios-subhead text-ios-label-2">
          {PROFILE.website.replace("https://", "")}
        </span>
        <ShareGlyph className="h-4 w-4 shrink-0 text-ios-label-2" />
      </div>
    </div>
  </Screen>
);

export default SafariScreen;
