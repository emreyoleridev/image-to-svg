import { render, screen, fireEvent } from "@testing-library/react";
import { Dropzone } from "@/components/ui/dropzone";

describe("Dropzone Component", () => {
    const mockOnFilesChange = jest.fn();

    it("renders the dropzone area", () => {
        render(<Dropzone files={[]} onFilesChange={mockOnFilesChange} />);
        expect(screen.getByText(/Drop your image here/i)).toBeInTheDocument();
        expect(screen.getByText(/Drag and drop or/i)).toBeInTheDocument();
    });

    it("has the correct file input element", () => {
        const { container } = render(<Dropzone files={[]} onFilesChange={mockOnFilesChange} />);
        const input = container.querySelector('input[type="file"]');
        expect(input).toBeInTheDocument();
    });
});
