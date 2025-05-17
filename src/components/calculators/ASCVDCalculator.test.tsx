/* @vitest-environment jsdom */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ASCVDCalculator } from "./ASCVDCalculator";

describe("ASCVDCalculator", () => {
  it("renders and has a calculate button", async () => {
    render(<ASCVDCalculator />);
    const button = screen.getByRole("button", { name: /calculate/i });
    expect(button).toBeInTheDocument();
  });
});
