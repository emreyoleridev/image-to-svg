import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "@/app/page";
import { toast } from "sonner";

// Mock dependencies
jest.mock("sonner", () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn(),
    },
}));

// Mock URL.createObjectURL and URL.revokeObjectURL
global.URL.createObjectURL = jest.fn();
global.URL.revokeObjectURL = jest.fn();

// Mock Dropzone component since it's hard to test file input directly without more setup
jest.mock("@/components/ui/dropzone", () => ({
    Dropzone: ({ onFilesChange }: any) => (
        <button data-testid="mock-dropzone" onClick={() => onFilesChange([new File(["content"], "test.png", { type: "image/png" })])}>
            Upload
        </button>
    ),
}));

// Mock Radix based components that might fail in JSDOM
jest.mock("@/components/ui/slider", () => ({
    Slider: ({ value, onValueChange }: any) => (
        <input
            type="range"
            value={value[0]}
            onChange={(e) => onValueChange([parseInt(e.target.value)])}
            data-testid="mock-slider"
        />
    ),
}));

jest.mock("@/components/ui/switch", () => ({
    Switch: ({ checked, onCheckedChange, id, disabled }: any) => (
        <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onCheckedChange(e.target.checked)}
            id={id}
            disabled={disabled}
            data-testid={`mock-switch-${id}`}
        />
    ),
}));

describe("Home Page", () => {
    it("renders the page title and initial state", () => {
        render(<Home />);
        expect(screen.getByText(/Settings/i)).toBeInTheDocument();
        expect(screen.getByText(/Pixel Perfect Mode/i)).toBeInTheDocument();
        // Header and Hero are rendered as part of Home
    });

    it("can select files and show them in the list", () => {
        render(<Home />);
        const uploadBtn = screen.getByTestId("mock-dropzone");
        fireEvent.click(uploadBtn);

        expect(screen.getByText(/test.png/i)).toBeInTheDocument();
        expect(screen.getByText(/Selected files \(1\)/i)).toBeInTheDocument();
    });

    it("enables the convert button when files are selected", () => {
        render(<Home />);
        const convertBtn = screen.getByRole("button", { name: /Convert & Download/i });
        expect(convertBtn).toBeDisabled();

        const uploadBtn = screen.getByTestId("mock-dropzone");
        fireEvent.click(uploadBtn);

        expect(convertBtn).not.toBeDisabled();
    });

    it("updates settings", () => {
        render(<Home />);
        const compactSwitch = screen.getByLabelText(/Compact Output/i);
        fireEvent.click(compactSwitch);

        // Pixel perfect should be disabled in compact mode (based on my previous code)
        const fidelitySwitch = screen.getByLabelText(/Pixel Perfect Mode/i);
        expect(fidelitySwitch).toBeDisabled();
    });
});
