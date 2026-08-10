/**
 * Cubic bezier geometry helpers shared by curve-driven visuals.
 */

export interface Point2D {
  x: number;
  y: number;
}

export interface CubicBezier {
  p0: Point2D;
  p1: Point2D;
  p2: Point2D;
  p3: Point2D;
}

/** Evaluate a cubic bezier curve at t (0 <= t <= 1). */
export function getBezierPoint(curve: CubicBezier, t: number): Point2D {
  const { p0, p1, p2, p3 } = curve;
  const mt = 1 - t;
  const mt2 = mt * mt;
  const mt3 = mt2 * mt;
  const t2 = t * t;
  const t3 = t2 * t;

  return {
    x: mt3 * p0.x + 3 * mt2 * t * p1.x + 3 * mt * t2 * p2.x + t3 * p3.x,
    y: mt3 * p0.y + 3 * mt2 * t * p1.y + 3 * mt * t2 * p2.y + t3 * p3.y,
  };
}

/** Angle in degrees of the curve tangent at t, derived from the first derivative. */
export function getBezierTangentAngle(curve: CubicBezier, t: number): number {
  const { p0, p1, p2, p3 } = curve;
  const mt = 1 - t;
  const mt2 = mt * mt;
  const t2 = t * t;

  const dx =
    3 * mt2 * (p1.x - p0.x) +
    6 * mt * t * (p2.x - p1.x) +
    3 * t2 * (p3.x - p2.x);
  const dy =
    3 * mt2 * (p1.y - p0.y) +
    6 * mt * t * (p2.y - p1.y) +
    3 * t2 * (p3.y - p2.y);

  return Math.atan2(dy, dx) * (180 / Math.PI);
}
