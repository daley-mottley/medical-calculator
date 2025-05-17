/* @vitest-environment jsdom */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AnionGapCalculator from "./AnionGapCalculator";

describe("AnionGapCalculator", () => {
  it("renders and has a calculate button", async () => {
    render(<AnionGapCalculator />);
    const button = screen.getByRole("button", { name: /calculate/i });
    expect(button).toBeInTheDocument();
  });
});
