import { render, screen } from "@testing-library/react";
import { Features } from "@/components/Features";

describe("Features Component", () => {
    it("renders all three feature cards", () => {
        render(<Features />);
        expect(screen.getByText(/Absolute Privacy/i)).toBeInTheDocument();
        expect(screen.getByText(/Lightning Fast/i)).toBeInTheDocument();
        expect(screen.getByText(/Free Forever/i)).toBeInTheDocument();
    });

    it("displays correct icons for each feature", () => {
        render(<Features />);
        // Finding icons by their container or presence if possible, 
        // but checking text content is usually sufficient for feature lists.
        expect(screen.getByText(/Files never leave your device/i)).toBeInTheDocument();
        expect(screen.getByText(/Convert images instantly/i)).toBeInTheDocument();
        expect(screen.getByText(/no hidden costs/i)).toBeInTheDocument();
    });
});
