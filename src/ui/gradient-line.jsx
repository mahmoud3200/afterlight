/**
 * Decorative gradient hairline that fades into its background.
 *
 * Built for the hero chapter rail, where the gradient marks the rail itself and
 * the trailing "more chapters" segment, but it works anywhere a soft divider is
 * needed: pass `orientation` to lay it out as a column or row rule, `fade` to
 * choose which ends dissolve, and `thickness` for the stroke width in pixels.
 * The gradient paints in `currentColor`, so it follows the surrounding text
 * colour instead of hard-coding a palette value.
 *
 * Purely presentational: it is hidden from assistive technology, and callers
 * own layout such as `flex-1`, height, and opacity through `className`.
 * The component only sets the stroke thickness, so it has no intrinsic length:
 * a horizontal line needs a width (`w-8`, `w-full`, `flex-1`, …) and a vertical
 * line needs a height (or a flex/grid parent that stretches it), otherwise it
 * collapses to zero and never paints.
 *
 * @param {object} props
 * @param {"vertical" | "horizontal"} [props.orientation] Line direction; vertical fades top to bottom.
 * @param {"both" | "start" | "end"} [props.fade] Ends that dissolve (`start` is top/left).
 * @param {number} [props.thickness] Stroke width/height in pixels.
 * @param {string} [props.className] Layout utilities, including the line's length.
 */
const FADE_STOPS = {
  both: "transparent 0%, currentColor 49%, transparent 100%",
  start: "transparent 0%, currentColor 100%",
  end: "currentColor 0%, transparent 100%",
};

export default function GradientLine({
  orientation = "vertical",
  fade = "both",
  thickness = 2,
  className = "",
}) {
  const isVertical = orientation === "vertical";

  return (
    <span
      aria-hidden="true"
      style={{
        backgroundImage: `linear-gradient(${isVertical ? "to bottom" : "to right"}, ${FADE_STOPS[fade]})`,
        ...(isVertical ? { width: thickness } : { height: thickness }),
      }}
      className={["block shrink-0", className].join(" ")}
    />
  );
}
