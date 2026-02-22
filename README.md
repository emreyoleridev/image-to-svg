# Image to SVG Converter

A modern, fast, and secure web application to convert images into SVG graphics. Built with **Next.js 15 (App Router)** and **shadcn/ui**, it allows for robust drag-and-drop file uploads, multi-file conversions, and downloading files directly or bundled in a ZIP archive.

## Features

- **Drag & Drop Upload**: Upload single or multiple images effortlessly.
- **Multiple Formats**: Supports JPG, PNG, WEBP, GIF, BMP, and TIFF.
- **Instant SVG Conversion**: Your images are converted securely using an internal API leveraging `potrace` and `jimp`.
- **ZIP Download**: When multiple files are converted simultaneously, download them all packed within a single `.zip` file.
- **Modern UI**: Styled with Tailwind CSS and `shadcn/ui` with a beautiful **Rose** theme. 
- **Dark Mode Support**: Perfect harmony in both light and dark themes.

## Tech Stack

- Next.js (App Router)
- React
- Tailwind CSS
- shadcn/ui
- Potrace & Jimp (for image processing)
- JSZip
- Jest & React Testing Library

## Getting Started

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Run the Development Server:**
   ```bash
   npm run dev
   ```

3. **Open the App:**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## Testing

Run the included test suites using Jest and React Testing Library:

```bash
npm run test
```

## Production Build

To build the application for production:

```bash
npm run build
npm run start
```

---

## 👤 Author

Built with ❤️ by **Emre Yoleri**
-   [GitHub](https://github.com/emreyoleridev)
-   [Buy Me A Coffee](https://buymeacoffee.com/emreyoleridev)

---
*Disclaimer: This tool is intended for legal and professional use only. Ensure you have the rights to the documents you are processing.*

## License
MIT
