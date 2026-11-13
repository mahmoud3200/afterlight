/**
 * The arc drawn behind the hero wordmark (Figma node 5:166).
 * Kept as a stroked path so it can be drawn on with GSAP later.
 */
export default function SwooshIcon({ className, ...props }) {
  return (
    <svg
      viewBox="0 0 419.314 113.591"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path
        d="M1.24798 112.028C149.987 -6.74402 341.497 -36.9719 417.748 59.0282"
        stroke="white"
        strokeWidth="4"
      />
    </svg>
  );
}
