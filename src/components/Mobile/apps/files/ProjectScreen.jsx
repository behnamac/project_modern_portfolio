import { PROJECTS } from "@/constants";
import Screen from "../../ios/Screen";
import NavBar from "../../ios/NavBar";
import ListGroup from "../../ios/ListGroup";
import ListRow from "../../ios/ListRow";
import { BlueFolder } from "./icons";
import { GlobeGlyph, DocGlyph } from "../../icons/Glyphs";

// One project, reached by tapping its folder. Same content model as the
// desktop ProjectDetail (name, folder, description, tech, live/repo links),
// laid out as an iOS detail page.
const ProjectScreen = ({ back, tabs, bottomInset, projectId }) => {
  const project = PROJECTS.find((p) => p.id === projectId);

  if (!project) {
    return (
      <Screen
        nav={<NavBar title="Work" back={back} />}
        tabs={tabs}
        bottomInset={bottomInset}
      >
        <p className="px-4 pt-16 text-center text-ios-body text-ios-label-2">
          That project no longer exists.
        </p>
      </Screen>
    );
  }

  return (
    <Screen
      nav={<NavBar title={project.folder} back={back} />}
      tabs={tabs}
      bottomInset={bottomInset}
    >
      <div className="flex flex-col items-center px-6 pb-2 pt-6 text-center">
        <span className="h-20 w-20">
          <BlueFolder />
        </span>
        <h1 className="mt-3 text-ios-title-3 text-ios-label">{project.name}</h1>
        <p className="mt-1 text-ios-footnote text-ios-label-2">{project.folder}</p>
      </div>

      <ListGroup header="About">
        <div className="px-4 py-3">
          <p className="text-ios-body text-ios-label">{project.description}</p>
        </div>
      </ListGroup>

      {project.tech.length > 0 && (
        <ListGroup header="Built with">
          <div className="flex flex-wrap gap-1.5 px-4 py-3">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-ios-fill-3 px-2.5 py-1 text-ios-footnote text-ios-label"
              >
                {tech}
              </span>
            ))}
          </div>
        </ListGroup>
      )}

      <ListGroup header="Links" className="pb-8">
        {project.liveUrl && (
          <ListRow
            icon={<GlobeGlyph className="h-[18px] w-[18px]" />}
            iconBg="var(--ios-blue)"
            title="View live site"
            href={project.liveUrl}
            target="_blank"
            chevron
            last={!project.githubUrl}
          />
        )}
        {project.githubUrl && (
          <ListRow
            icon={<DocGlyph className="h-[18px] w-[18px]" />}
            iconBg="var(--ios-gray)"
            title="View on GitHub"
            href={project.githubUrl}
            target="_blank"
            chevron
            last
          />
        )}
      </ListGroup>
    </Screen>
  );
};

export default ProjectScreen;
