export default function MenuMark({ className = "" }) {
  return (
    <span aria-hidden="true" className={`relative block h-5 ${className}`}>
      <span data-menu-bar="top" className="absolute right-0 top-0 block h-1.25 w-[79%] origin-center bg-current" />
      <span data-menu-bar="bottom" className="absolute right-0 top-3 block h-1.25 w-full origin-center bg-current" />
    </span>
  );
}
