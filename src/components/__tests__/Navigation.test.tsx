import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navigation from "@/components/Navigation";

const ACTIVE_CLASS = "bg-white";

describe("Navigation", () => {
  it("renders every tab with Reviews active by default", () => {
    render(<Navigation />);

    const tabs = screen.getAllByRole("button");
    expect(tabs.map((tab) => tab.textContent)).toEqual([
      "Reviews",
      "Solve",
      "Prevent",
    ]);
    expect(tabs[0]).toHaveClass(ACTIVE_CLASS);
    expect(tabs[1]).not.toHaveClass(ACTIVE_CLASS);
  });

  it("moves the active state to the clicked tab", async () => {
    const user = userEvent.setup();
    render(<Navigation />);

    await user.click(screen.getByRole("button", { name: "Prevent" }));

    expect(screen.getByRole("button", { name: "Prevent" })).toHaveClass(ACTIVE_CLASS);
    expect(screen.getByRole("button", { name: "Reviews" })).not.toHaveClass(ACTIVE_CLASS);
  });

  it("keeps a single tab active when clicking through all of them", async () => {
    const user = userEvent.setup();
    render(<Navigation />);

    for (const name of ["Solve", "Prevent", "Reviews"]) {
      await user.click(screen.getByRole("button", { name }));
      const active = screen
        .getAllByRole("button")
        .filter((tab) => tab.className.includes(ACTIVE_CLASS));
      expect(active).toHaveLength(1);
      expect(active[0]).toHaveTextContent(name);
    }
  });
});
