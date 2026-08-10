import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LeftCard from "@/components/LeftCard";

describe("LeftCard", () => {
  it("renders the deployment summary, badges and spike count", () => {
    render(<LeftCard />);

    expect(
      screen.getByRole("heading", { name: /Deployment \(v2\.8\.5\)/ })
    ).toBeInTheDocument();
    expect(screen.getByText(/latency spikes/)).toBeInTheDocument();
    ["v2.8.5", "Open source", "database"].forEach((badge) => {
      expect(screen.getByText(badge)).toBeInTheDocument();
    });
    expect(screen.getByText("(27) spikes found")).toBeInTheDocument();
  });

  it("does not navigate when the placeholder read more link is clicked", async () => {
    const user = userEvent.setup();
    render(<LeftCard />);

    const link = screen.getByRole("link", { name: "Read more" });
    const event = new MouseEvent("click", { bubbles: true, cancelable: true });

    expect(link).toHaveAttribute("href", "#");
    await user.click(link);
    link.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
  });
});
