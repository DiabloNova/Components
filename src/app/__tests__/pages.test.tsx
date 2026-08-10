import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "@/app/page";
import SecondPage from "@/app/second-page/page";
import GlassCardShowcasePage, {
  metadata as glassCardMetadata,
} from "@/app/showcase/glass-card/page";
import RailsShowcasePage, {
  metadata as railsMetadata,
} from "@/app/showcase/rails-payroll/page";
import DataUsageShowcasePage from "@/app/showcase/data-usage/page";

describe("Home page", () => {
  it("renders the control panel heading with the menu and bottom navigation", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { name: "Main Control Panel" })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Toggle menu" })).toBeInTheDocument();
    expect(screen.getAllByRole("button").length).toBeGreaterThan(6);
  });
});

describe("Second page", () => {
  it("renders the back link, tab navigation and both cards", () => {
    render(<SecondPage />);

    expect(screen.getByRole("link", { name: /Back to Main Page/ })).toHaveAttribute(
      "href",
      "/"
    );
    expect(screen.getByRole("button", { name: "Reviews" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Deployment \(v2\.8\.5\)/ })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Secure deployment" })
    ).toBeInTheDocument();
  });
});

describe("Showcase pages", () => {
  it("renders the glass card showcase with page metadata", () => {
    render(<GlassCardShowcasePage />);

    expect(screen.getByText("Chris Berge")).toBeInTheDocument();
    expect(glassCardMetadata.title).toBe("Premium Glass Card Showcase");
    expect(glassCardMetadata.description).toBeTruthy();
  });

  it("renders the rails payroll showcase with page metadata", () => {
    render(<RailsShowcasePage />);

    expect(
      screen.getByRole("heading", { name: /Worldwide payroll solution/ })
    ).toBeInTheDocument();
    expect(railsMetadata.title).toBe("Rails Worldwide Payroll Solution Showcase");
    expect(railsMetadata.description).toBeTruthy();
  });
});

describe("Data usage showcase page", () => {
  it("opens with the modal showing 36% of a 10GB plan", () => {
    render(<DataUsageShowcasePage />);

    expect(screen.getByText("36")).toBeInTheDocument();
    expect(screen.getByText("3.6GB")).toBeInTheDocument();
    expect(screen.getByText("/ 10GB")).toBeInTheDocument();
  });

  it("swaps the modal for a restore button when closed and back again", async () => {
    const user = userEvent.setup();
    render(<DataUsageShowcasePage />);

    await user.click(screen.getByRole("button", { name: "Close" }));
    const restore = await screen.findByRole("button", { name: "Open Data Usage" });

    await user.click(restore);

    expect(await screen.findByText("Data Usage")).toBeInTheDocument();
  });

  it("recomputes the used amount to one decimal when the slider moves", async () => {
    const user = userEvent.setup();
    render(<DataUsageShowcasePage />);

    await user.click(screen.getByText("Edit"));
    fireEvent.change(screen.getByRole("slider"), { target: { value: "45" } });

    expect(screen.getByText("45")).toBeInTheDocument();
    expect(screen.getByText("4.5GB")).toBeInTheDocument();
  });
});
