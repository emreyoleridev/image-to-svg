
self.onmessage = async (e) => {
    const { imageData, options, ImageTracerUrl } = e.data;

    try {
        // Import ImageTracer in the worker
        importScripts(ImageTracerUrl);

        // @ts-ignore - ImageTracer is loaded via importScripts
        if (typeof ImageTracer === 'undefined') {
            throw new Error("ImageTracer failed to load in worker");
        }

        // @ts-ignore
        const svgString = ImageTracer.imagedataToSVG(imageData, options);

        self.postMessage({ svg: svgString });
    } catch (error) {
        self.postMessage({ error: error.message });
    }
};
