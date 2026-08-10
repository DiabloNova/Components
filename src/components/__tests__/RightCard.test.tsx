import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RightCard from "@/components/RightCard";

const arrowIcon = (container: HTMLElement) =>
  container.querySelector("button.shadow-btn-white svg") as SVGElement;

describe("RightCard", () => {
  it("renders the secure deployment summary and status badge", () => {
    render(<RightCard />);

    expect(
      screen.getByRole("heading", { name: "Secure deployment" })
    ).toBeInTheDocument();
    expect(screen.getByText("v2.8.6 securely encrypted")).toBeInTheDocument();
    expect(screen.getByText("Deployed")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Restart investigation/ })
    ).toBeInTheDocument();
  });

  it("slides the arrow while the card is hovered and resets on leave", async () => {
    const user = userEvent.setup();
    const { container } = render(<RightCard />);
    const card = container.firstElementChild as HTMLElement;

    expect(arrowIcon(container)).not.toHaveClass("translate-x-1");

    await user.hover(card);
    expect(arrowIcon(container)).toHaveClass("translate-x-1");

    await user.unhover(card);
    expect(arrowIcon(container)).not.toHaveClass("translate-x-1");
  });
});
