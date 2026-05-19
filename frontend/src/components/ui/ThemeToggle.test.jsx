/* eslint-disable no-unused-vars */
import React from "react";
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "../../theme/ThemeContext";
import ThemeToggle from "./ThemeToggle";

describe("ThemeToggle", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders a toggle button and persists theme changes", () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    const button = screen.getByRole("button");
    expect(button).toBeTruthy();

    fireEvent.click(button);
    expect(JSON.parse(localStorage.getItem("shopsphere_theme"))).toBe(true);

    fireEvent.click(button);
    expect(JSON.parse(localStorage.getItem("shopsphere_theme"))).toBe(false);
  });
});