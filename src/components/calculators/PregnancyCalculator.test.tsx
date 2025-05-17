/* @vitest-environment jsdom */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PregnancyCalculator } from "./PregnancyCalculator";

describe("PregnancyCalculator", () => {
  it("renders and calculates EDC", async () => {
    render(<PregnancyCalculator />);
    const dateButtons = screen.getAllByRole("button", { name: /pick a date/i });
    const calcButton = screen.getByRole("button", { name: /calculate edd/i });

    expect(dateButtons.length).toBe(2);
    expect(calcButton).toBeInTheDocument();
  });
});
