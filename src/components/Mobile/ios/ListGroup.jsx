// An inset-grouped list section: optional header, a rounded card holding the
// rows, optional footer. Rows draw their own separators.
const ListGroup = ({ header, footer, children, className = "" }) => (
  <section className={className}>
    {header && (
      <h2 className="px-4 pb-1.5 pt-[22px] text-ios-footnote text-ios-label-2">{header}</h2>
    )}
    <div className="mx-4 overflow-hidden rounded-ios-group bg-ios-grouped-2">{children}</div>
    {footer && (
      <p className="px-4 pt-[7px] text-ios-footnote text-ios-label-2">{footer}</p>
    )}
  </section>
);

export default ListGroup;
