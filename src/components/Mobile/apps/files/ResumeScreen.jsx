import { PROFILE } from "@/constants";
import Screen from "../../ios/Screen";
import NavBar from "../../ios/NavBar";
import ListGroup from "../../ios/ListGroup";
import ListRow from "../../ios/ListRow";
import { GlobeGlyph, ShareGlyph } from "../../icons/Glyphs";
import { PdfIcon } from "@/components/icons";

// Resume.pdf, opened from the Work folder — a Quick Look-ish preview.
//
// Deliberately links to the hosted CV rather than /files/resume.pdf: that
// directory is empty, so the desktop app's download button already 404s.
const ResumeScreen = ({ back, tabs, bottomInset }) => (
  <Screen
    nav={<NavBar title="Resume.pdf" back={back} />}
    tabs={tabs}
    bottomInset={bottomInset}
  >
    <div className="flex flex-col items-center px-6 pb-2 pt-8 text-center">
      <span className="h-24 w-24">
        <PdfIcon />
      </span>
      <h1 className="mt-4 text-ios-title-3 text-ios-label">{PROFILE.name}</h1>
      <p className="mt-1 text-ios-footnote text-ios-label-2">
        {PROFILE.title} &middot; {PROFILE.yearsExperience} years
      </p>
    </div>

    <ListGroup className="pb-8">
      <ListRow
        icon={<GlobeGlyph className="h-[18px] w-[18px]" />}
        iconBg="var(--ios-blue)"
        title="View full CV online"
        href={PROFILE.cvUrl}
        target="_blank"
        chevron
      />
      <ListRow
        icon={<ShareGlyph className="h-[18px] w-[18px]" />}
        iconBg="var(--ios-green)"
        title="Email me for a PDF copy"
        href={`mailto:${PROFILE.email}?subject=Resume%20request`}
        chevron
        last
      />
    </ListGroup>
  </Screen>
);

export default ResumeScreen;
