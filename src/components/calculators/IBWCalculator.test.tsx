/* @vitest-environment jsdom */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IBWCalculator } from "./IBWCalculator";

describe("IBWCalculator", () => {
  it("renders and calculates IBW and ABW", async () => {
    render(<IBWCalculator />);
    const heightInput = screen.getByLabelText(/height/i);
    const weightInput = screen.getByLabelText(/current weight/i);
    const button = screen.getByRole("button", { name: /calculate/i });

    await userEvent.type(heightInput, "170");
    await userEvent.type(weightInput, "70");
    await userEvent.click(button);

    expect(await screen.findByText(/Results/i)).toBeInTheDocument();
    expect((await screen.findAllByText(/Ideal Body Weight/i)).length).toBeGreaterThan(0);
    expect((await screen.findAllByText(/Adjusted Body Weight/i)).length).toBeGreaterThan(0);
  });
});
