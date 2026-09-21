import Screen from "../../ios/Screen";
import NavBar from "../../ios/NavBar";
import ListGroup from "../../ios/ListGroup";
import ListRow from "../../ios/ListRow";

// Shell copy, not portfolio content — so it stays here rather than in
// portfolio.json, which `npm run sync:data` overwrites.
const DELETED_ITEMS = [
  "Hi, I'm John Smith.jsx",
  "another-generic-hero-section.png",
  "lorem-ipsum-paragraph-x47.txt",
  "stock-photo-of-someone-else's-project.png",
  "boring-portfolio-v1.zip",
];

const BinScreen = ({ back, tabs, bottomInset }) => (
  <Screen
    nav={<NavBar title="Recently Deleted" large back={back} />}
    tabs={tabs}
    bottomInset={bottomInset}
  >
    <ListGroup
      header={`${DELETED_ITEMS.length} items`}
      footer="This is where the old, boring portfolio went."
      className="pb-8"
    >
      {DELETED_ITEMS.map((item, i) => (
        <ListRow
          key={item}
          title={<span className="line-through">{item}</span>}
          wrap
          last={i === DELETED_ITEMS.length - 1}
        />
      ))}
    </ListGroup>
  </Screen>
);

export default BinScreen;
