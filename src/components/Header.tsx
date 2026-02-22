import { Github, Sparkles } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex justify-center">
      <div className="flex h-16 items-center px-4 md:px-6 w-full max-w-[1400px]">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2 transition-transform hover:scale-105">
            <div className="bg-primary p-1.5 rounded-lg shadow-lg shadow-primary/20">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-black text-xl tracking-tight text-foreground">
              Image<span className="text-primary">ToSVG</span>
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center space-x-1">
            <Link href="https://github.com/emreyoleri" target="_blank" rel="noreferrer">
              <div
                className="flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9 text-muted-foreground hover:text-foreground"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
