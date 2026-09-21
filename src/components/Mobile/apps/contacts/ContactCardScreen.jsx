import { PROFILE } from "@/constants";
import { useMobileStore } from "@/store/useMobileStore";
import Screen from "../../ios/Screen";
import NavBar from "../../ios/NavBar";
import ListGroup from "../../ios/ListGroup";
import ListRow from "../../ios/ListRow";
import Pressable from "../../ios/Pressable";
import { ShareGlyph, GlobeGlyph, DocGlyph, PersonGlyph } from "../../icons/Glyphs";

const ActionButton = ({ label, glyph, href, onPress }) => {
  const inner = (
    <>
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ios-blue text-white">
        {glyph}
      </span>
      <span className="mt-1 text-ios-caption-2 text-ios-blue">{label}</span>
    </>
  );
  const className = "flex flex-1 flex-col items-center py-1";

  return href ? (
    <Pressable as="a" href={href} className={className}>
      {inner}
    </Pressable>
  ) : (
    <Pressable onClick={onPress} className={className}>
      {inner}
    </Pressable>
  );
};

// An iOS contact card. The mailto form moves to its own pushed screen so the
// card stays scannable.
const ContactCardScreen = ({ back, tabs, bottomInset }) => {
  const push = useMobileStore((s) => s.push);

  return (
    <Screen
      nav={<NavBar title={PROFILE.shortName} back={back} />}
      tabs={tabs}
      bottomInset={bottomInset}
    >
      <div className="flex flex-col items-center px-6 pb-4 pt-6 text-center">
        <span className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-b from-[#6E8BFF] to-[#2F4FD0] text-ios-title-2 font-semibold text-white">
          {PROFILE.initials}
        </span>
        <h1 className="mt-3 text-ios-title-2 text-ios-label">{PROFILE.name}</h1>
        <p className="mt-1 text-ios-footnote text-ios-label-2">{PROFILE.title}</p>
      </div>

      <div className="mx-4 flex overflow-hidden rounded-ios-group bg-ios-grouped-2 px-2 py-2">
        <ActionButton
          label="message"
          glyph={<ShareGlyph className="h-5 w-5" />}
          onPress={() => push("message")}
        />
        <ActionButton
          label="mail"
          glyph={<DocGlyph className="h-5 w-5" />}
          href={`mailto:${PROFILE.email}`}
        />
        <ActionButton
          label="site"
          glyph={<GlobeGlyph className="h-5 w-5" />}
          href={PROFILE.website}
        />
        <ActionButton
          label="linkedin"
          glyph={<PersonGlyph className="h-5 w-5" />}
          href={PROFILE.linkedin}
        />
      </div>

      <ListGroup header="Contact">
        <ListRow title="email" subtitle={PROFILE.email} wrap href={`mailto:${PROFILE.email}`} />
        <ListRow
          title="website"
          subtitle={PROFILE.website.replace("https://", "")}
          wrap
          href={PROFILE.website}
          target="_blank"
        />
        <ListRow title="location" subtitle={PROFILE.location} wrap last />
      </ListGroup>

      <ListGroup header="Links" className="pb-8">
        <ListRow title="GitHub" href={PROFILE.github} target="_blank" chevron />
        <ListRow title="LinkedIn" href={PROFILE.linkedin} target="_blank" chevron last />
      </ListGroup>
    </Screen>
  );
};

export default ContactCardScreen;
