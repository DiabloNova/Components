import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BottomNavigation from "@/components/BottomNavigation";

const activeFrame = (button: HTMLElement) =>
  button.querySelector(".gold-metallic-ring");

describe("BottomNavigation", () => {
  it("renders six items with the first one active", () => {
    render(<BottomNavigation />);

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(6);
    expect(activeFrame(buttons[0])).toBeInTheDocument();
    buttons.slice(1).forEach((button) => {
      expect(activeFrame(button)).not.toBeInTheDocument();
    });
  });

  it("activates only the clicked item", async () => {
    const user = userEvent.setup();
    render(<BottomNavigation />);

    await user.click(screen.getAllByRole("button")[3]);

    const buttons = screen.getAllByRole("button");
    expect(buttons.filter((button) => activeFrame(button))).toEqual([buttons[3]]);
  });

  it("keeps the item active when it is clicked again", async () => {
    const user = userEvent.setup();
    render(<BottomNavigation />);

    const button = screen.getAllByRole("button")[2];
    await user.click(button);
    await user.click(screen.getAllByRole("button")[2]);

    expect(activeFrame(screen.getAllByRole("button")[2])).toBeInTheDocument();
  });

  it.each([0, 1, 2, 3, 4, 5])("renders item %i in both its active and inactive form", async (index) => {
    const user = userEvent.setup();
    render(<BottomNavigation />);

    await user.click(screen.getAllByRole("button")[index]);
    expect(activeFrame(screen.getAllByRole("button")[index])).toBeInTheDocument();

    await user.click(screen.getAllByRole("button")[(index + 1) % 6]);
    expect(activeFrame(screen.getAllByRole("button")[index])).not.toBeInTheDocument();
  });

  it("renders a separator between each pair of adjacent items", () => {
    const { container } = render(<BottomNavigation />);

    expect(container.querySelectorAll(".w-\\[1px\\]")).toHaveLength(5);
  });
});
