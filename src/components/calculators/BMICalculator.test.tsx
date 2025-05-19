/* eslint-disable @typescript-eslint/no-unused-vars */
/* @vitest-environment jsdom */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BMICalculator } from "./BMICalculator";
import { vi } from "vitest";

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

  it("shows Save Calculation button after calculation and triggers save logic", async () => {
    render(<BMICalculator />);
    const heightInput = screen.getByLabelText(/height/i);
    const weightInput = screen.getByLabelText(/weight/i);
    const calcButton = screen.getByRole("button", { name: /calculate/i });

    await userEvent.type(heightInput, "170");
    await userEvent.type(weightInput, "70");
    await userEvent.click(calcButton);

    // Save button should appear
    const saveButton = await screen.findByRole("button", { name: /save calculation/i });
    expect(saveButton).toBeInTheDocument();

    // Mock localStorage
    const setItemSpy = vi.spyOn(window.localStorage.__proto__, 'setItem');
    await userEvent.click(saveButton);
    // Wait for the async save to complete
    await new Promise((resolve) => setTimeout(resolve, 600));
    expect(setItemSpy).toHaveBeenCalled();
    setItemSpy.mockRestore();
  });
});
