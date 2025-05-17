/* @vitest-environment jsdom */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BSACalculator } from "./BSACalculator";

describe("BSACalculator", () => {
  it("renders and calculates BSA", async () => {
    render(<BSACalculator />);
    const heightInput = screen.getByLabelText(/height/i);
    const weightInput = screen.getByLabelText(/weight/i);
    const button = screen.getByRole("button", { name: /calculate/i });

    await userEvent.type(heightInput, "170");
    await userEvent.type(weightInput, "70");
    await userEvent.click(button);

    expect(await screen.findByText(/Result/i)).toBeInTheDocument();
    expect(await screen.findByText(/m²/i)).toBeInTheDocument();
  });
});
