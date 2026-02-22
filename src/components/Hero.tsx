export function Hero() {
    return (
        <div className="text-center max-w-4xl mb-16 flex flex-col items-center">
            <div className="mb-6 inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-[0.7rem] font-bold text-primary tracking-widest uppercase shadow-sm">
                <svg className="mr-2 h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="m9 12 2 2 4-4" />
                </svg>
                100% SECURE & CLIENT-SIDE
            </div>
            <h1 className="text-6xl font-black tracking-tight sm:text-7xl md:text-8xl mb-8 text-balance text-foreground">
                High-Quality <br />
                <span className="text-primary tracking-tighter">Image to SVG</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground text-balance max-w-2xl font-medium leading-relaxed">
                Instantly transform your JPG, PNG, and WEBP images into <span className="text-foreground font-bold">crisp, scalable vector graphics</span>. 100% free and processed securely within your browser.
            </p>
        </div>
    );
}
