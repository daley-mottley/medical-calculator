/* @vitest-environment jsdom */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SavedCalculationsPage from "./SavedCalculationsPage";
import React from "react";
import { vi, describe, it, expect } from "vitest";
import '@testing-library/jest-dom';

const mockCalculations = [
  {
    id: "1",
    calculatorType: "BMI",
    inputs: { weight: "70", height: "170" },
    results: { bmi: 24.2, category: "Normal weight" },
    timestamp: new Date().toISOString(),
    name: "Test BMI Calculation"
  }
];

Object.defineProperty(global.navigator, 'clipboard', {
  value: { writeText: vi.fn() },
  writable: true,
});

vi.mock("@/lib/apiClient", () => ({
  apiClient: {
    get: () => Promise.resolve({ data: mockCalculations })
  }
}));

describe("SavedCalculationsPage", () => {
  it("copies calculation summary to clipboard when Copy button is clicked", async () => {
    render(<SavedCalculationsPage />);
    // Wait for the calculation card to appear
    const copyButton = await screen.findByRole("button", { name: /copy/i });
    expect(copyButton).toBeInTheDocument();
    await userEvent.click(copyButton);
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
    const copiedText = (navigator.clipboard.writeText as any).mock.calls[0][0];
    expect(copiedText).toMatch(/Calculation: Test BMI Calculation/);
    expect(copiedText).toMatch(/Type: BMI/);
    expect(copiedText).toMatch(/Inputs:/);
    expect(copiedText).toMatch(/Results:/);
  });
}); 