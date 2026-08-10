import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HamburgerMenu from "@/components/HamburgerMenu";

const openMenu = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.click(screen.getByRole("button", { name: "Toggle menu" }));
};

describe("HamburgerMenu", () => {
  it("hides the navigation links until the toggle is pressed", async () => {
    const user = userEvent.setup();
    render(<HamburgerMenu />);

    expect(screen.queryByRole("link", { name: "Main Page" })).not.toBeInTheDocument();

    await openMenu(user);

    expect(screen.getByRole("link", { name: "Main Page" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Second Page" })).toHaveAttribute(
      "href",
      "/second-page"
    );
  });

  it("closes again when the toggle is pressed twice", async () => {
    const user = userEvent.setup();
    render(<HamburgerMenu />);

    await openMenu(user);
    await openMenu(user);

    expect(screen.queryByRole("link", { name: "Main Page" })).not.toBeInTheDocument();
  });

  it.each(["Main Page", "Second Page"])("closes when %s is selected", async (name) => {
    const user = userEvent.setup();
    render(<HamburgerMenu />);

    await openMenu(user);
    await user.click(screen.getByRole("link", { name }));

    expect(screen.queryByRole("link", { name })).not.toBeInTheDocument();
  });

  it("closes on a mousedown outside of the menu", async () => {
    const user = userEvent.setup();
    render(
      <div>
        <HamburgerMenu />
        <button type="button">outside</button>
      </div>
    );

    await openMenu(user);
    await user.click(screen.getByRole("button", { name: "outside" }));

    expect(screen.queryByRole("link", { name: "Main Page" })).not.toBeInTheDocument();
  });

  it("stays open on a mousedown inside the menu", async () => {
    const user = userEvent.setup();
    render(<HamburgerMenu />);

    await openMenu(user);
    await user.pointer({
      keys: "[MouseLeft>]",
      target: screen.getByRole("link", { name: "Main Page" }),
    });

    expect(screen.getByRole("link", { name: "Main Page" })).toBeInTheDocument();
  });

  it("removes the outside-click listener on unmount", () => {
    const removeEventListener = jest.spyOn(document, "removeEventListener");
    const { unmount } = render(<HamburgerMenu />);

    unmount();

    expect(removeEventListener).toHaveBeenCalledWith("mousedown", expect.any(Function));
    removeEventListener.mockRestore();
  });
});
