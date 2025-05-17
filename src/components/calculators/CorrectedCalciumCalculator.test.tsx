/* @vitest-environment jsdom */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CorrectedCalciumCalculator from "./CorrectedCalciumCalculator";

describe("CorrectedCalciumCalculator", () => {
  it("renders and has a calculate button", async () => {
    render(<CorrectedCalciumCalculator />);
    const button = screen.getByRole("button", { name: /calculate/i });
    expect(button).toBeInTheDocument();
  });
});
