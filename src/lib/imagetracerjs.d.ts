declare module 'imagetracerjs' {
    const ImageTracer: {
        imagedataToSVG: (imageData: ImageData, options: any) => string;
        imageToSVG: (url: string, callback: (svgString: string) => void, options: any) => void;
    };
    export default ImageTracer;
}
