import { transitions, variants } from "@/utils/motion";

describe("transitions", () => {
  it("exposes springs with positive stiffness, damping and mass", () => {
    for (const spring of [transitions.inertialSpring, transitions.responsiveSpring]) {
      expect(spring.type).toBe("spring");
      expect(spring.stiffness).toBeGreaterThan(0);
      expect(spring.damping).toBeGreaterThan(0);
      expect(spring.mass).toBeGreaterThan(0);
    }
  });

  it("makes the inertial spring heavier and softer than the responsive one", () => {
    expect(transitions.inertialSpring.stiffness).toBeLessThan(
      transitions.responsiveSpring.stiffness
    );
    expect(transitions.inertialSpring.mass).toBeGreaterThan(
      transitions.responsiveSpring.mass
    );
  });

  it("exposes tweens with 4-point cubic bezier easing inside the unit range", () => {
    for (const tween of [transitions.ambientEase, transitions.standardEase]) {
      expect(tween.type).toBe("tween");
      expect(tween.duration).toBeGreaterThan(0);
      expect(tween.ease).toHaveLength(4);
      for (const control of tween.ease) {
        expect(control).toBeGreaterThanOrEqual(0);
        expect(control).toBeLessThanOrEqual(1);
      }
    }
  });

  it("keeps the ambient tween slower than the standard micro-interaction", () => {
    expect(transitions.ambientEase.duration).toBeGreaterThan(
      transitions.standardEase.duration
    );
  });
});

describe("variants", () => {
  it("fades up from below to a settled visible state", () => {
    expect(variants.fadeUp.hidden).toEqual({ opacity: 0, y: 12 });
    expect(variants.fadeUp.visible).toMatchObject({ opacity: 1, y: 0 });
    expect(variants.fadeUp.visible.transition).toBe(transitions.standardEase);
  });

  it("loops the breathing glow around its resting state", () => {
    const { pulse } = variants.breathingGlow;
    expect(pulse.scale[0]).toBe(pulse.scale[2]);
    expect(pulse.opacity[0]).toBe(pulse.opacity[2]);
    expect(pulse.filter[0]).toBe(pulse.filter[2]);
    expect(pulse.scale[1]).toBeGreaterThan(pulse.scale[0]);
    expect(pulse.opacity[1]).toBeGreaterThan(pulse.opacity[0]);
    expect(pulse.transition.repeat).toBe(Infinity);
  });

  it("loops the slow float symmetrically around the origin", () => {
    const { animate } = variants.slowFloat;
    expect(animate.y).toEqual([-2, 2, -2]);
    expect(animate.transition.repeat).toBe(Infinity);
    expect(animate.transition.duration).toBeGreaterThan(0);
  });
});
