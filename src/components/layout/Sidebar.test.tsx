import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppLayout } from "./AppLayout";
import { AuthProvider } from "../../context/AuthContext";
import { BrowserRouter } from "react-router-dom";

// Helper to set mobile viewport
function setMobileViewport() {
  Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 375 });
  window.dispatchEvent(new Event('resize'));
}

describe("Sidebar integration", () => {
  beforeEach(() => {
    setMobileViewport();
  });

  it("should slide in when the menu button is pressed", async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <AppLayout>
            <div>Test Content</div>
          </AppLayout>
        </AuthProvider>
      </BrowserRouter>
    );
    // Sidebar should be hidden initially
    const sidebar = screen.getByTestId("sidebar");
    expect(sidebar).toHaveClass("-translate-x-full");

    // Click the menu button
    const menuButton = screen.getByRole("button", { name: /toggle menu/i });
    await userEvent.click(menuButton);

    // Sidebar should now be visible (translate-x-0)
    expect(sidebar).toHaveClass("translate-x-0");
  });
}); 