import { render, screen } from "@testing-library/react";
import { Header } from "@/components/Header";

describe("Header Component", () => {
    it("renders the logo and title", () => {
        render(<Header />);
        const titleElements = screen.getAllByText("Image to SVG");
        expect(titleElements.length).toBeGreaterThan(0);
        expect(titleElements[0]).toBeInTheDocument();
    });

    it("contains a link to the user's Github", () => {
        render(<Header />);
        const githubLink = screen.getByRole("link", { name: /github/i });
        expect(githubLink).toHaveAttribute("href", "https://github.com/emreyoleri");
    });
});
