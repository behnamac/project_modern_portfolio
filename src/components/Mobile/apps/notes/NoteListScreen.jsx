import { useMobileStore } from "@/store/useMobileStore";
import Screen from "../../ios/Screen";
import NavBar from "../../ios/NavBar";
import ListGroup from "../../ios/ListGroup";
import ListRow from "../../ios/ListRow";
import { NOTES } from "./notes.data";

// iOS Notes: a list of notes, each pushing a detail screen. This replaces the
// desktop app's 160px sidebar, which had no room on a phone.
const NoteListScreen = ({ back, tabs, bottomInset }) => {
  const push = useMobileStore((s) => s.push);

  return (
    <Screen
      nav={<NavBar title="Notes" large back={back} />}
      tabs={tabs}
      bottomInset={bottomInset}
    >
      <ListGroup header={`${NOTES.length} notes`} className="pb-8">
        {NOTES.map((note, i) => (
          <ListRow
            key={note.id}
            title={note.title}
            subtitle={note.preview}
            chevron
            last={i === NOTES.length - 1}
            onPress={() => push("note", { noteId: note.id })}
          />
        ))}
      </ListGroup>
    </Screen>
  );
};

export default NoteListScreen;
