import { Heart, Lock, Zap } from "lucide-react";

export function Features() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 w-full max-w-6xl mx-auto pb-24 px-4">
            {/* Absolute Privacy Card */}
            <div className="bg-white dark:bg-zinc-900/50 rounded-3xl p-10 flex flex-col items-center text-center space-y-6 shadow-sm border border-border/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="w-16 h-16 rounded-[1.5rem] bg-[#ecfdf5] dark:bg-emerald-500/10 flex items-center justify-center text-[#10b981]">
                    <Lock className="w-8 h-8" />
                </div>
                <div className="space-y-4">
                    <h3 className="text-2xl font-black tracking-tight text-foreground">Absolute Privacy</h3>
                    <p className="text-[15px] text-muted-foreground leading-relaxed font-medium">
                        Files never leave your device. <br className="hidden lg:block" />
                        Everything is processed locally in your browser.
                    </p>
                </div>
            </div>

            {/* Lightning Fast Card */}
            <div className="bg-white dark:bg-zinc-900/50 rounded-3xl p-10 flex flex-col items-center text-center space-y-6 shadow-sm border border-border/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="w-16 h-16 rounded-[1.5rem] bg-[#fff7ed] dark:bg-orange-500/10 flex items-center justify-center text-[#f97316]">
                    <Zap className="w-8 h-8" />
                </div>
                <div className="space-y-4">
                    <h3 className="text-2xl font-black tracking-tight text-foreground">Lightning Fast</h3>
                    <p className="text-[15px] text-muted-foreground leading-relaxed font-medium">
                        No waiting for servers to process or <br className="hidden lg:block" />
                        convert. Convert images instantly.
                    </p>
                </div>
            </div>

            {/* Free Forever Card */}
            <div className="bg-white dark:bg-zinc-900/50 rounded-3xl p-10 flex flex-col items-center text-center space-y-6 shadow-sm border border-border/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="w-16 h-16 rounded-[1.5rem] bg-[#f0fdfa] dark:bg-cyan-500/10 flex items-center justify-center text-[#06b6d4]">
                    <Heart className="w-8 h-8" />
                </div>
                <div className="space-y-4">
                    <h3 className="text-2xl font-black tracking-tight text-foreground">Free Forever</h3>
                    <p className="text-[15px] text-muted-foreground leading-relaxed font-medium">
                        No premium tiers, no hidden costs, no
                        watermarks. Every feature is entirely free.
                    </p>
                </div>
            </div>
        </div>
    );
}
