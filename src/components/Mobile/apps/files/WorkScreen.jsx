import { useMemo, useState } from "react";
import { PROJECTS } from "@/constants";
import { useMobileStore } from "@/store/useMobileStore";
import Screen from "../../ios/Screen";
import NavBar from "../../ios/NavBar";
import SearchField from "../../ios/SearchField";
import FolderTile from "./FolderTile";
import { BlueFolder, PdfFile } from "./icons";

// The "Work" folder: one folder per project plus Resume.pdf, in the 3-column
// grid iOS Files uses in portrait.
const WorkScreen = ({ back, tabs, bottomInset }) => {
  const push = useMobileStore((s) => s.push);
  const [query, setQuery] = useState("");

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PROJECTS;
    return PROJECTS.filter((p) =>
      [p.folder, p.name, p.description, p.tech.join(" ")]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [query]);

  const q = query.trim().toLowerCase();
  const showResume = !q || "resume.pdf".includes(q);
  const empty = matches.length === 0 && !showResume;

  return (
    <Screen
      nav={<NavBar title="Work" large back={back} />}
      tabs={tabs}
      bottomInset={bottomInset}
    >
      <SearchField value={query} onChange={setQuery} />

      {empty ? (
        <p className="px-4 pt-16 text-center text-ios-body text-ios-label-2">
          No items match &ldquo;{query}&rdquo;.
        </p>
      ) : (
        <div className="grid grid-cols-3 gap-x-4 gap-y-5 px-4 pb-6 pt-2">
          {matches.map((project) => (
            <FolderTile
              key={project.id}
              label={project.folder}
              glyph={<BlueFolder />}
              onPress={() => push("project", { projectId: project.id })}
            />
          ))}
          {showResume && (
            <FolderTile
              label="Resume.pdf"
              glyph={<PdfFile />}
              onPress={() => push("resume")}
            />
          )}
        </div>
      )}
    </Screen>
  );
};

export default WorkScreen;
