import { render, screen } from "@testing-library/react";
import { Header } from "@/components/Header";

describe("Header Component", () => {
    it("renders the logo and title", () => {
        render(<Header />);
        // Text is split across elements, so we use a custom matcher or check for parts
        expect(screen.getByText(/Image/i)).toBeInTheDocument();
        expect(screen.getByText(/ToSVG/i)).toBeInTheDocument();
    });

    it("contains a link to the user's Github", () => {
        render(<Header />);
        const githubLink = screen.getByRole("link", { name: /github/i });
        expect(githubLink).toHaveAttribute("href", "https://github.com/emreyoleridev/image-to-svg");
    });
});
