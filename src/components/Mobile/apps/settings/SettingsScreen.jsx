import { PROFILE, LANGUAGES, EDUCATION } from "@/constants";
import { useOsStore } from "@/store/useOsStore";
import Screen from "../../ios/Screen";
import NavBar from "../../ios/NavBar";
import ListGroup from "../../ios/ListGroup";
import ListRow from "../../ios/ListRow";
import SegmentedControl from "../../ios/SegmentedControl";

const APPEARANCE = [
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
];

// Mobile has no menu bar, so the theme switch needs a home. Settings is the
// authentic place for it, and gives the "About" rows somewhere to live too.
const SettingsScreen = ({ back, tabs, bottomInset }) => {
  const theme = useOsStore((s) => s.theme);
  const setTheme = useOsStore((s) => s.setTheme);

  return (
    <Screen
      nav={<NavBar title="Settings" large back={back} />}
      tabs={tabs}
      bottomInset={bottomInset}
    >
      <ListGroup header="Appearance" footer="Changes the whole portfolio, phone and desktop.">
        <div className="px-4 py-3">
          <SegmentedControl
            items={APPEARANCE}
            active={theme}
            onChange={setTheme}
            layoutId="appearance-thumb"
          />
        </div>
      </ListGroup>

      <ListGroup header="About">
        <ListRow title="Name" value={PROFILE.name} />
        <ListRow title="Role" value={PROFILE.title} wrap />
        <ListRow title="Location" value={PROFILE.location} />
        <ListRow title="Experience" value={`${PROFILE.yearsExperience} years`} last />
      </ListGroup>

      <ListGroup header="Languages">
        {LANGUAGES.map((l, i) => (
          <ListRow key={l.id} title={l.name} value={l.level} last={i === LANGUAGES.length - 1} />
        ))}
      </ListGroup>

      <ListGroup header="Education" className="pb-8">
        {EDUCATION.map((e, i) => (
          <ListRow
            key={e.id}
            title={e.degree}
            subtitle={`${e.institution} · ${e.field}`}
            wrap
            last={i === EDUCATION.length - 1}
          />
        ))}
      </ListGroup>
    </Screen>
  );
};

export default SettingsScreen;
