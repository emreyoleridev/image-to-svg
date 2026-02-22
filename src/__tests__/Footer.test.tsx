import { render, screen } from "@testing-library/react";
import { Footer } from "@/components/Footer";

describe("Footer Component", () => {
    it("renders the built by text", () => {
        render(<Footer />);
        expect(screen.getByText(/Built by/i)).toBeInTheDocument();
    });

    it("contains a link to the user's Github profile", () => {
        render(<Footer />);
        const link = screen.getByRole("link", { name: /Emre Yoleri/i });
        expect(link).toHaveAttribute("href", "https://github.com/emreyoleri");
    });
});
