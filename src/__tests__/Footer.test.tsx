import { render, screen } from "@testing-library/react";
import { Footer } from "@/components/Footer";

describe("Footer Component", () => {
    it("renders the built by text", () => {
        render(<Footer />);
        expect(screen.getByText(/Built with ❤️ by/i)).toBeInTheDocument();
        expect(screen.getByText(/Emre Yoleri/i)).toBeInTheDocument();
    });

    it("contains link to Github profile", () => {
        render(<Footer />);
        const githubLink = screen.getByRole("link", { name: /GitHub/i });
        expect(githubLink).toHaveAttribute("href", "https://github.com/emreyoleridev");
    });

    it("contains link to Buy Me a Coffee", () => {
        render(<Footer />);
        const coffeeLink = screen.getByRole("link", { name: /Buy Me a Coffee/i });
        expect(coffeeLink).toHaveAttribute("href", "https://buymeacoffee.com/emreyoleridev");
    });
});
