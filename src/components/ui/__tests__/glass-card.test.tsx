import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import GlassCard from "@/components/ui/glass-card";

const stubBoundingRect = (element: Element) => {
  element.getBoundingClientRect = () =>
    ({ left: 0, top: 0, width: 200, height: 200 }) as DOMRect;
};

describe("GlassCard", () => {
  it("renders the headline, author details and action button", () => {
    render(<GlassCard />);

    expect(screen.getByRole("heading")).toHaveTextContent("A better way to design");
    expect(screen.getByText("Chris Berge")).toBeInTheDocument();
    expect(screen.getByText("01 of 05")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("appends a custom className to the card root", () => {
    const { container } = render(<GlassCard className="custom-class" />);

    expect(container.firstElementChild).toHaveClass("custom-class");
  });

  it("measures the card and keeps rendering while tilting on mouse move", () => {
    const { container } = render(<GlassCard />);
    const card = container.firstElementChild as HTMLElement;
    stubBoundingRect(card);
    const getRect = jest.spyOn(card, "getBoundingClientRect");

    fireEvent.mouseMove(card, { clientX: 200, clientY: 200 });
    expect(getRect).toHaveBeenCalled();

    fireEvent.mouseLeave(card);
    expect(screen.getByText("Chris Berge")).toBeInTheDocument();
  });
});
