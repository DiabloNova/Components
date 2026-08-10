import React from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RailsShowcaseComponent, {
  getBezierPoint,
  getBezierTangentAngle,
  trackBases,
} from "@/components/RailsShowcaseComponent";

const [track] = trackBases;

describe("getBezierPoint", () => {
  it("returns the endpoints at t = 0 and t = 1", () => {
    expect(getBezierPoint(0, track.p0, track.p1, track.p2, track.p3)).toEqual(track.p0);
    expect(getBezierPoint(1, track.p0, track.p1, track.p2, track.p3)).toEqual(track.p3);
  });

  it("averages the control points at the midpoint", () => {
    const p0 = { x: 0, y: 0 };
    const p1 = { x: 0, y: 10 };
    const p2 = { x: 10, y: 10 };
    const p3 = { x: 10, y: 0 };

    expect(getBezierPoint(0.5, p0, p1, p2, p3)).toEqual({ x: 5, y: 7.5 });
  });

  it("reduces to linear interpolation for evenly spaced control points", () => {
    const point = getBezierPoint(
      0.25,
      { x: 0, y: 0 },
      { x: 3, y: 3 },
      { x: 6, y: 6 },
      { x: 9, y: 9 }
    );

    expect(point.x).toBeCloseTo(2.25);
    expect(point.y).toBeCloseTo(2.25);
  });

  it("descends the track from the top edge to the bottom right", () => {
    const ys = [0, 0.25, 0.5, 0.75, 1].map(
      (t) => getBezierPoint(t, track.p0, track.p1, track.p2, track.p3).y
    );

    for (let i = 1; i < ys.length; i += 1) {
      expect(ys[i]).toBeGreaterThan(ys[i - 1]);
    }
  });

  it("stays inside the convex hull of its control points", () => {
    const xs = [track.p0.x, track.p1.x, track.p2.x, track.p3.x];
    const ys = [track.p0.y, track.p1.y, track.p2.y, track.p3.y];

    for (let t = 0; t <= 1; t += 0.1) {
      const point = getBezierPoint(t, track.p0, track.p1, track.p2, track.p3);
      expect(point.x).toBeGreaterThanOrEqual(Math.min(...xs));
      expect(point.x).toBeLessThanOrEqual(Math.max(...xs));
      expect(point.y).toBeGreaterThanOrEqual(Math.min(...ys));
      expect(point.y).toBeLessThanOrEqual(Math.max(...ys));
    }
  });
});

describe("getBezierTangentAngle", () => {
  it("returns 0 degrees for a horizontal curve", () => {
    const angle = getBezierTangentAngle(
      0.5,
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 }
    );

    expect(angle).toBeCloseTo(0);
  });

  it("returns 45 degrees for a diagonal curve", () => {
    const angle = getBezierTangentAngle(
      0.3,
      { x: 0, y: 0 },
      { x: 1, y: 1 },
      { x: 2, y: 2 },
      { x: 3, y: 3 }
    );

    expect(angle).toBeCloseTo(45);
  });

  it("returns a negative angle when the curve climbs upwards", () => {
    const angle = getBezierTangentAngle(
      0.5,
      { x: 0, y: 0 },
      { x: 1, y: -1 },
      { x: 2, y: -2 },
      { x: 3, y: -3 }
    );

    expect(angle).toBeCloseTo(-45);
  });

  it("stays within the -180..180 degree range along the real tracks", () => {
    for (const base of trackBases) {
      for (const t of [0, 0.2, 0.5, 0.8, 1]) {
        const angle = getBezierTangentAngle(t, base.p0, base.p1, base.p2, base.p3);
        expect(angle).toBeGreaterThanOrEqual(-180);
        expect(angle).toBeLessThanOrEqual(180);
      }
    }
  });
});

describe("trackBases", () => {
  it("defines three parallel tracks offset horizontally by a fixed amount", () => {
    expect(trackBases).toHaveLength(3);

    for (let i = 1; i < trackBases.length; i += 1) {
      const previous = trackBases[i - 1];
      const current = trackBases[i];
      (["p0", "p1", "p2", "p3"] as const).forEach((key) => {
        expect(current[key].x - previous[key].x).toBe(116);
        expect(current[key].y).toBe(previous[key].y);
      });
    }
  });
});

describe("RailsShowcaseComponent", () => {
  it("renders the headline, description and navigation actions", () => {
    render(<RailsShowcaseComponent />);

    expect(
      screen.getByRole("heading", { name: /Worldwide payroll solution/ })
    ).toBeInTheDocument();
    expect(screen.getByText("One place for everything")).toBeInTheDocument();
    ["Solutions", "How it works", "Get in touch", "02"].forEach((label) => {
      expect(screen.getByRole("button", { name: label })).toBeInTheDocument();
    });
  });

  it("renders one carved track group per track base", () => {
    const { container } = render(<RailsShowcaseComponent />);

    expect(container.querySelectorAll("svg g")).toHaveLength(trackBases.length);
  });

  it("keeps the slide selector label while toggling the active slide", async () => {
    const user = userEvent.setup();
    render(<RailsShowcaseComponent />);

    const selector = screen.getByRole("button", { name: "02" });
    await user.click(selector);
    await user.click(selector);

    expect(screen.getByRole("button", { name: "02" })).toBeInTheDocument();
    expect(screen.getByText("/ 03")).toBeInTheDocument();
  });

  it("animates the spheres along their tracks over time", () => {
    jest.useFakeTimers();
    try {
      const { container } = render(<RailsShowcaseComponent />);
      const sphere = container.querySelector(
        ".pointer-events-auto"
      ) as HTMLElement;
      const initialLeft = sphere.style.left;

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      const moved = container.querySelector(".pointer-events-auto") as HTMLElement;
      expect(moved.style.left).not.toBe(initialLeft);
    } finally {
      jest.useRealTimers();
    }
  });

  it("tilts the card on pointer move and resets on pointer leave", () => {
    const { container } = render(<RailsShowcaseComponent />);
    const card = container.querySelector(".shadow-container") as HTMLElement;
    card.getBoundingClientRect = () =>
      ({ left: 0, top: 0, width: 1000, height: 500 }) as DOMRect;

    fireEvent.pointerMove(card, { clientX: 900, clientY: 450 });
    fireEvent.pointerLeave(card);

    expect(card).toBeInTheDocument();
  });
});
