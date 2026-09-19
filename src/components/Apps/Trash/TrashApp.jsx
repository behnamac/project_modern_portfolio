const DELETED_ITEMS = [
  "Hi, I'm John Smith.jsx",
  "another-generic-hero-section.png",
  "lorem-ipsum-paragraph-x47.txt",
  "stock-photo-of-someone-else's-project.png",
  "boring-portfolio-v1.zip",
];

const TrashApp = () => (
  <div className="mac-scroll h-full overflow-auto p-6 text-sm">
    <p className="mb-4 text-black/60 dark:text-white/60">
      {DELETED_ITEMS.length} items · This is where the old, boring portfolio went.
    </p>
    <ul className="space-y-1.5">
      {DELETED_ITEMS.map((item) => (
        <li
          key={item}
          className="flex items-center justify-between rounded-md border border-black/10 px-3 py-2 text-black/50 line-through dark:border-white/10 dark:text-white/40"
        >
          {item}
        </li>
      ))}
    </ul>
  </div>
);

export default TrashApp;
