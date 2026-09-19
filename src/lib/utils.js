// Minimal stand-in for shadcn's usual `cn` (clsx + tailwind-merge). This
// project has no class-conflict-merging needs for the classes we pass it, so
// a dependency-free join is enough and keeps us from pulling in extra deps.
export function cn(...inputs) {
  return inputs
    .flatMap((input) => {
      if (!input) return [];
      if (typeof input === "string") return [input];
      if (Array.isArray(input)) return input.filter(Boolean);
      if (typeof input === "object") {
        return Object.entries(input)
          .filter(([, value]) => Boolean(value))
          .map(([key]) => key);
      }
      return [];
    })
    .join(" ");
}
