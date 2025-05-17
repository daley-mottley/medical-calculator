/* @vitest-environment jsdom */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HASBLEDCalculator from "./HASBLEDCalculator";

describe("HASBLEDCalculator", () => {
  it("renders and has a calculate button", async () => {
    render(<HASBLEDCalculator />);
    const button = screen.getByRole("button", { name: /calculate/i });
    expect(button).toBeInTheDocument();
  });

  it("calculates the correct HAS-BLED score", async () => {
    render(<HASBLEDCalculator />);
    const hypertension = screen.getByLabelText(/hypertension/i);
    const stroke = screen.getByLabelText(/stroke/i);
    const button = screen.getByRole("button", { name: /calculate/i });
    await userEvent.click(hypertension);
    await userEvent.click(stroke);
    await userEvent.click(button);
    expect(await screen.findByText(/HAS-BLED Score:/i)).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });
}); 