/* @vitest-environment jsdom */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import QTcIntervalCalculator from "./QTcIntervalCalculator";

describe("QTcIntervalCalculator", () => {
  it("renders and has a calculate button", async () => {
    render(<QTcIntervalCalculator />);
    const button = screen.getByRole("button", { name: /calculate/i });
    expect(button).toBeInTheDocument();
  });
});
