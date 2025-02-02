import Page from "@/app/page";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

describe("<Home />", () => {
  beforeEach(() => {
    render(<Page />);
  })

  afterEach(() => {
    cleanup();
  });

  it("should see home header at level 1", () => {
    const homeHeader = screen.getByRole("heading", { level: 1, name: "Home" });
    expect(homeHeader).toBeInTheDocument();
  });

  it("should see link with about text", () => {
    const aboutLink = screen.getByRole("link", { name: "About" });
    expect(aboutLink).toBeInTheDocument();
  });

  it("should have the correct href attribute for the About link", () => {
    const aboutLink = screen.getByRole("link", { name: "About" });
    expect(aboutLink).toHaveAttribute("href", "/about");
  });

  it("should render a div containing the content", () => {
    const containerDiv = screen.getByRole("heading", { level: 1, name: "Home" }).parentElement;
    expect(containerDiv).toBeInTheDocument();
    expect(containerDiv?.tagName).toBe("DIV");
  });
});
