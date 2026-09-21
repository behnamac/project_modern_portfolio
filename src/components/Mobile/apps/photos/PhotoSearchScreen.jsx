import { useMemo, useState } from "react";
import { TESTIMONIALS } from "@/constants";
import { useMobileStore } from "@/store/useMobileStore";
import Screen from "../../ios/Screen";
import NavBar from "../../ios/NavBar";
import SearchField from "../../ios/SearchField";
import ListGroup from "../../ios/ListGroup";
import ListRow from "../../ios/ListRow";

const PhotoSearchScreen = ({ back, tabs, bottomInset }) => {
  const push = useMobileStore((s) => s.push);
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const indexed = TESTIMONIALS.map((person, index) => ({ person, index }));
    if (!q) return indexed;
    return indexed.filter(({ person }) =>
      `${person.name} ${person.title} ${person.quote}`.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <Screen
      nav={<NavBar title="Search" large back={back} />}
      tabs={tabs}
      bottomInset={bottomInset}
    >
      <SearchField value={query} onChange={setQuery} placeholder="People and words" />

      {results.length === 0 ? (
        <p className="px-4 pt-12 text-center text-ios-body text-ios-label-2">
          Nothing matches &ldquo;{query}&rdquo;.
        </p>
      ) : (
        <ListGroup className="pb-8">
          {results.map(({ person, index }, i) => (
            <ListRow
              key={person.id}
              title={person.name}
              subtitle={person.title}
              wrap
              chevron
              last={i === results.length - 1}
              onPress={() => push("viewer", { index })}
            />
          ))}
        </ListGroup>
      )}
    </Screen>
  );
};

export default PhotoSearchScreen;
