import { render, screen } from "@testing-library/react";
import { Hero } from "@/components/Hero";

describe("Hero Component", () => {
    it("renders the main heading correctly", () => {
        render(<Hero />);
        expect(screen.getByText(/High-Quality/i)).toBeInTheDocument();
        expect(screen.getByText(/Image to SVG/i)).toBeInTheDocument();
    });

    it("displays the security badge", () => {
        render(<Hero />);
        expect(screen.getByText(/100% SECURE & CLIENT-SIDE/i)).toBeInTheDocument();
    });

    it("renders the description text", () => {
        render(<Hero />);
        expect(screen.getByText(/transform your JPG, PNG, and WEBP images/i)).toBeInTheDocument();
    });
});
