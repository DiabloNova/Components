import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DataUsageModal from "@/components/DataUsageModal";

const defaultProps = {
  percentage: 36,
  usedAmount: 3.6,
  totalAmount: 10,
  setPercentage: jest.fn(),
  onClose: jest.fn(),
};

const renderModal = (overrides: Partial<typeof defaultProps> = {}) => {
  const props = { ...defaultProps, ...overrides };
  return { props, ...render(<DataUsageModal {...props} />) };
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe("DataUsageModal", () => {
  it("renders the percentage and the used / total amounts", () => {
    renderModal();

    expect(screen.getByText("36")).toBeInTheDocument();
    expect(screen.getByText("%")).toBeInTheDocument();
    expect(screen.getByText("3.6GB")).toBeInTheDocument();
    expect(screen.getByText("/ 10GB")).toBeInTheDocument();
  });

  it("draws the progress arcs with a dash array matching the dial radius", () => {
    const { container } = renderModal();

    const circumference = 2 * Math.PI * 82;
    const circles = container.querySelectorAll("circle");
    expect(circles).toHaveLength(2);
    circles.forEach((circle) => {
      expect(circle).toHaveAttribute("r", "82");
      expect(Number(circle.getAttribute("stroke-dasharray"))).toBeCloseTo(
        circumference,
        3
      );
    });
  });

  it("renders twelve radial tick marks", () => {
    const { container } = renderModal();

    expect(container.querySelectorAll(".rotate-45")).toHaveLength(12);
  });

  it("calls onClose when the close button is pressed", async () => {
    const user = userEvent.setup();
    const { props } = renderModal();

    await user.click(screen.getByRole("button", { name: "Close" }));

    expect(props.onClose).toHaveBeenCalledTimes(1);
  });

  it("swaps the renewal footer for a slider when editing and back again", async () => {
    const user = userEvent.setup();
    renderModal();

    expect(screen.queryByRole("slider")).not.toBeInTheDocument();

    await user.click(screen.getByText("Edit"));
    expect(screen.getByRole("slider")).toHaveValue("36");

    await user.click(screen.getByText("Done"));
    expect(screen.queryByRole("slider")).not.toBeInTheDocument();
    expect(screen.getByText(/Renews 1st August/)).toBeInTheDocument();
  });

  it("reports slider changes as numbers", async () => {
    const user = userEvent.setup();
    const { props } = renderModal();

    await user.click(screen.getByText("Edit"));
    fireEvent.change(screen.getByRole("slider"), { target: { value: "72" } });

    expect(props.setPercentage).toHaveBeenCalledWith(72);
    expect(typeof props.setPercentage.mock.calls[0][0]).toBe("number");
  });

  it("bounds the slider between 0 and 100", async () => {
    const user = userEvent.setup();
    renderModal();

    await user.click(screen.getByText("Edit"));

    const slider = screen.getByRole("slider");
    expect(slider).toHaveAttribute("min", "0");
    expect(slider).toHaveAttribute("max", "100");
  });

  it("tracks hover state over the dial", async () => {
    const user = userEvent.setup();
    const { container } = renderModal();
    const dial = container.querySelector(".cursor-pointer") as HTMLElement;

    await user.hover(dial);
    await user.unhover(dial);

    expect(screen.getByText("36")).toBeInTheDocument();
  });

  it("renders an empty dial at 0% and a full one at 100%", () => {
    const { unmount } = renderModal({ percentage: 0, usedAmount: 0 });
    expect(screen.getByText("0")).toBeInTheDocument();
    unmount();

    renderModal({ percentage: 100, usedAmount: 10 });
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("10GB")).toBeInTheDocument();
  });
});
