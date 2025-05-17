/* eslint-disable @typescript-eslint/no-unused-vars */
/* @vitest-environment jsdom */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BMICalculator } from "./BMICalculator";

describe("BMICalculator", () => {
  it("renders and calculates BMI", async () => {
    render(<BMICalculator />);
    const heightInput = screen.getByLabelText(/height/i);
    const weightInput = screen.getByLabelText(/weight/i);
    const button = screen.getByRole("button", { name: /calculate/i });

    await userEvent.type(heightInput, "170");
    await userEvent.type(weightInput, "70");
    await userEvent.click(button);

    expect(await screen.findByText(/BMI:/i)).toBeInTheDocument();
  });
});
