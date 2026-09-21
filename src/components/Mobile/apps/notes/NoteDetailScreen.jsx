import {
  PROFILE,
  EXPERIENCE,
  CERTIFICATIONS,
  REFERENCES,
  EDUCATION,
  LANGUAGES,
} from "@/constants";
import Screen from "../../ios/Screen";
import NavBar from "../../ios/NavBar";
import ListGroup from "../../ios/ListGroup";
import ListRow from "../../ios/ListRow";
import { NOTES } from "./notes.data";

const Prose = ({ children }) => (
  <div className="space-y-3 px-4 py-3 text-ios-body text-ios-label">{children}</div>
);

const bodies = {
  about: () => (
    <ListGroup className="pb-8">
      <Prose>
        {PROFILE.bioLong.map((p) => (
          <p key={p.slice(0, 32)}>{p}</p>
        ))}
      </Prose>
    </ListGroup>
  ),

  experience: () => (
    <>
      {EXPERIENCE.map((job) => (
        <ListGroup key={job.id} header={job.period}>
          <div className="px-4 py-3">
            <p className="text-ios-headline text-ios-label">{job.role}</p>
            <p className="mt-0.5 text-ios-footnote text-ios-label-2">
              {job.company} &middot; {job.location}
            </p>
            <ul className="mt-2 space-y-1.5">
              {job.highlights.map((h) => (
                <li key={h} className="flex gap-2 text-ios-subhead text-ios-label">
                  <span aria-hidden className="text-ios-label-3">
                    &bull;
                  </span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {job.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-ios-fill-3 px-2 py-0.5 text-ios-caption-2 text-ios-label"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </ListGroup>
      ))}
      <div className="h-8" />
    </>
  ),

  // Titles run to 64 characters, so rows wrap rather than truncate.
  certifications: () => (
    <ListGroup header={`${CERTIFICATIONS.length} certificates`} className="pb-8">
      {CERTIFICATIONS.map((c, i) => (
        <ListRow
          key={c.id}
          title={c.title}
          wrap
          chevron={Boolean(c.credentialUrl)}
          href={c.credentialUrl || undefined}
          target={c.credentialUrl ? "_blank" : undefined}
          last={i === CERTIFICATIONS.length - 1}
        />
      ))}
    </ListGroup>
  ),

  education: () => (
    <ListGroup className="pb-8">
      {EDUCATION.map((e, i) => (
        <ListRow
          key={e.id}
          title={`${e.degree} — ${e.field}`}
          subtitle={`${e.institution} · ${e.startDate} – ${e.endDate}${
            e.gpa ? ` · GPA ${e.gpa}` : ""
          }`}
          wrap
          last={i === EDUCATION.length - 1}
        />
      ))}
    </ListGroup>
  ),

  languages: () => (
    <ListGroup className="pb-8">
      {LANGUAGES.map((l, i) => (
        <ListRow key={l.id} title={l.name} value={l.level} last={i === LANGUAGES.length - 1} />
      ))}
    </ListGroup>
  ),

  references: () => (
    <ListGroup className="pb-8">
      {REFERENCES.map((r, i) => (
        <ListRow
          key={r.id}
          title={r.name}
          subtitle={r.title}
          wrap
          chevron
          href={`mailto:${r.email}`}
          last={i === REFERENCES.length - 1}
        />
      ))}
    </ListGroup>
  ),
};

const NoteDetailScreen = ({ back, tabs, bottomInset, noteId }) => {
  const note = NOTES.find((n) => n.id === noteId);
  const Body = bodies[noteId];

  return (
    <Screen
      nav={<NavBar title={note?.title || "Note"} back={back} />}
      tabs={tabs}
      bottomInset={bottomInset}
    >
      {Body ? (
        <Body />
      ) : (
        <p className="px-4 pt-16 text-center text-ios-body text-ios-label-2">
          That note is empty.
        </p>
      )}
    </Screen>
  );
};

export default NoteDetailScreen;
