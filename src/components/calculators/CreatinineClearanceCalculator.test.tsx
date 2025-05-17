/* @vitest-environment jsdom */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreatinineClearanceCalculator from "./CreatinineClearanceCalculator";

describe("CreatinineClearanceCalculator", () => {
  it("renders and has a calculate button", async () => {
    render(<CreatinineClearanceCalculator />);
    const button = screen.getByRole("button", { name: /calculate/i });
    expect(button).toBeInTheDocument();
  });
});
