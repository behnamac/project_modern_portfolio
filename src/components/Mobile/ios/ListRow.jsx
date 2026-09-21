import Pressable from "./Pressable";
import { ChevronRight } from "../icons/Glyphs";

// A 44pt grouped-list row. The separator is inset to line up with the text
// (16px bare, 59px behind a leading icon) and is omitted on the last row,
// which is what makes a grouped card look right.
const ListRow = ({
  icon,
  iconBg,
  title,
  subtitle,
  value,
  chevron = false,
  last = false,
  href,
  target,
  onPress,
  destructive = false,
  wrap = false,
}) => {
  const interactive = Boolean(href || onPress);

  const body = (
    <>
      {icon && (
        <span
          className="flex h-[29px] w-[29px] shrink-0 items-center justify-center rounded-ios-sm text-white"
          style={{ background: iconBg }}
        >
          {icon}
        </span>
      )}

      <span className="flex min-w-0 flex-1 flex-col items-start">
        <span
          className={`text-ios-body ${destructive ? "text-ios-red" : "text-ios-label"} ${
            wrap ? "text-left" : "truncate w-full text-left"
          }`}
        >
          {title}
        </span>
        {subtitle && (
          <span className="mt-0.5 w-full text-left text-ios-footnote text-ios-label-2">
            {subtitle}
          </span>
        )}
      </span>

      {value && (
        <span className="shrink-0 text-ios-body text-ios-label-2">{value}</span>
      )}
      {chevron && <ChevronRight className="h-3.5 w-3.5 shrink-0 text-ios-gray-3" />}
    </>
  );

  const className = `relative flex w-full min-h-[44px] items-center gap-3 px-4 py-[11px] text-left ${
    interactive ? "active:bg-ios-fill-4" : ""
  }`;

  const separator = !last && (
    <span
      className="pointer-events-none absolute bottom-0 right-0 h-px bg-ios-separator"
      style={{ left: icon ? 59 : 16 }}
    />
  );

  if (href) {
    return (
      <Pressable
        as="a"
        variant="fade"
        href={href}
        target={target}
        rel={target === "_blank" ? "noreferrer" : undefined}
        className={className}
      >
        {body}
        {separator}
      </Pressable>
    );
  }

  return (
    <Pressable
      variant="fade"
      onClick={onPress}
      disabled={!interactive}
      className={className}
    >
      {body}
      {separator}
    </Pressable>
  );
};

export default ListRow;
