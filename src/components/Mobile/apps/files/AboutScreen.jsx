import { PROFILE, EXPERIENCE } from "@/constants";
import Screen from "../../ios/Screen";
import NavBar from "../../ios/NavBar";
import ListGroup from "../../ios/ListGroup";
import ListRow from "../../ios/ListRow";
import { GlobeGlyph, PersonGlyph, DocGlyph } from "../../icons/Glyphs";

// The Files app's second tab — a short "who is this" page, so the tab bar in
// the mockup has somewhere real to go.
const AboutScreen = ({ back, tabs, bottomInset }) => (
  <Screen
    nav={<NavBar title="About Me" large back={back} />}
    tabs={tabs}
    bottomInset={bottomInset}
  >
    <div className="flex flex-col items-center px-6 pb-2 pt-4 text-center">
      <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-b from-[#6E8BFF] to-[#2F4FD0] text-ios-title-2 font-semibold text-white">
        {PROFILE.initials}
      </span>
      <h1 className="mt-3 text-ios-title-3 text-ios-label">{PROFILE.name}</h1>
      <p className="mt-1 text-ios-footnote text-ios-label-2">
        {PROFILE.title} &middot; {PROFILE.location}
      </p>
    </div>

    <ListGroup header="Bio">
      <div className="space-y-3 px-4 py-3">
        {PROFILE.bioLong.map((paragraph) => (
          <p key={paragraph.slice(0, 32)} className="text-ios-body text-ios-label">
            {paragraph}
          </p>
        ))}
      </div>
    </ListGroup>

    <ListGroup header="Currently">
      <ListRow
        icon={<PersonGlyph className="h-[18px] w-[18px]" />}
        iconBg="var(--ios-orange)"
        title={EXPERIENCE[0].role}
        subtitle={`${EXPERIENCE[0].company} · ${EXPERIENCE[0].period}`}
        wrap
        last
      />
    </ListGroup>

    <ListGroup header="Elsewhere" className="pb-8">
      <ListRow
        icon={<GlobeGlyph className="h-[18px] w-[18px]" />}
        iconBg="var(--ios-blue)"
        title="Website"
        value={PROFILE.website.replace("https://", "")}
        href={PROFILE.website}
        target="_blank"
      />
      <ListRow
        icon={<DocGlyph className="h-[18px] w-[18px]" />}
        iconBg="var(--ios-gray)"
        title="GitHub"
        href={PROFILE.github}
        target="_blank"
        chevron
      />
      <ListRow
        icon={<PersonGlyph className="h-[18px] w-[18px]" />}
        iconBg="#0A66C2"
        title="LinkedIn"
        href={PROFILE.linkedin}
        target="_blank"
        chevron
        last
      />
    </ListGroup>
  </Screen>
);

export default AboutScreen;
