"use client";

import { useState } from "react";
import JSZip from "jszip";
import { toast } from "sonner";
import { Download, Loader2, File, X, Check, XCircle, Settings2, Sparkles, AlertCircle } from "lucide-react";
import { Dropzone } from "@/components/ui/dropzone";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme-toggle";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const [files, setFiles] = useState<File[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [conversionResults, setConversionResults] = useState<{ name: string; svg: string; error?: string }[]>([]);
  const [highFidelity, setHighFidelity] = useState(true);
  const [colorDepth, setColorDepth] = useState(32);
  const [compactMode, setCompactMode] = useState(false);
  const [currentlyProcessingIndex, setCurrentlyProcessingIndex] = useState<number | null>(null);

  const handleFilesChange = (newFiles: File[]) => {
    setFiles(newFiles);
    setConversionResults([]);
  };

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    setConversionResults([]);
  };

  const downloadFile = (name: string, content: string) => {
    const blob = new Blob([content], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleConvert = async () => {
    if (files.length === 0) return;

    setIsConverting(true);
    setConversionResults([]);

    try {
      // Small delay to ensure the UI updates and spinner starts spinning
      await new Promise(resolve => setTimeout(resolve, 100));

      const ImageTracerModule = await import("imagetracerjs");
      // @ts-ignore
      const ImageTracer = ImageTracerModule.default || ImageTracerModule;

      const results: { name: string; svg: string; error?: string }[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setCurrentlyProcessingIndex(i);
        try {
          const svg = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
              const img = new Image();
              img.onload = async () => {
                const canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext("2d");
                if (!ctx) {
                  reject(new Error("Could not get canvas context"));
                  return;
                }
                ctx.drawImage(img, 0, 0);
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

                const options = {
                  ltres: compactMode ? 0.5 : (highFidelity ? 0.01 : 0.1),
                  qtres: compactMode ? 2 : (highFidelity ? 0.01 : 1),
                  pathomit: compactMode ? 16 : (highFidelity ? 0 : 8),
                  rightangleenhance: true,
                  colorsampling: 2,
                  numberofcolors: colorDepth,
                  mincolorratio: 0,
                  colorquantcycles: 3,
                  scale: 1,
                  simplifytolerance: compactMode ? 1 : 0,
                  roundcoords: compactMode ? 0 : 1,
                  lcpr: 0,
                  qcpr: 0,
                  desc: false,
                  viewbox: true,
                  blurradius: 0,
                  blurdelta: 20
                };

                // Create a worker to handle the conversion
                const worker = new Worker('/conversion-worker.js');

                // Use local script instead of CDN to avoid load failures
                const ImageTracerUrl = '/imagetracer.js';

                worker.onmessage = (event) => {
                  if (event.data.error) {
                    reject(new Error(event.data.error));
                  } else {
                    resolve(event.data.svg);
                  }
                  worker.terminate();
                };

                worker.onerror = (err) => {
                  reject(err);
                  worker.terminate();
                };

                // Send data to worker - notice we pass ImageData which is Cloneable
                worker.postMessage({
                  imageData,
                  options,
                  ImageTracerUrl
                });
              };
              img.onerror = () => reject(new Error("Failed to load image"));
              img.src = e.target?.result as string;
            };
            reader.onerror = () => reject(new Error("Failed to read file"));
            reader.readAsDataURL(file);
          });

          const newName = file.name.replace(/\.[^/.]+$/, "") + ".svg";
          const res = { name: newName, svg };
          results.push(res);
          setConversionResults(prev => [...prev, res]);
        } catch (err) {
          console.error(`Failed to convert ${file.name}:`, err);
          const res = { name: file.name, svg: "", error: "Failed to convert" };
          results.push(res);
          setConversionResults(prev => [...prev, res]);
        }
      }

      const successful = results.filter((r) => !r.error);
      if (successful.length > 0) {
        toast.success(`Successfully converted ${successful.length} image(s).`);

        if (successful.length === 1) {
          downloadFile(successful[0].name, successful[0].svg);
        } else {
          const zip = new JSZip();
          successful.forEach((file) => zip.file(file.name, file.svg));
          const blob = await zip.generateAsync({ type: "blob" });
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = "converted-svgs.zip";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }
      } else {
        toast.error("Failed to convert images.");
      }
    } catch (error) {
      toast.error("An error occurred during conversion.");
      console.error(error);
    } finally {
      setIsConverting(false);
      setCurrentlyProcessingIndex(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 lg:py-20 flex flex-col items-center">
      <Hero />

      <div className="w-full flex flex-col gap-8 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Dropzone files={files} onFilesChange={handleFilesChange} />

            {files.length > 0 && (
              <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold tracking-tight">Selected files ({files.length})</h2>
                  <Button variant="outline" size="sm" onClick={() => {
                    setFiles([]);
                    setConversionResults([]);
                  }}>
                    Clear List
                  </Button>
                </div>
                <div className="flex flex-col space-y-3 max-h-[500px] overflow-y-auto pr-2">
                  {files.map((file, idx) => {
                    const result = conversionResults.find(r => r.name.startsWith(file.name.replace(/\.[^/.]+$/, "")));

                    return (
                      <div
                        key={`${file.name}-${idx}`}
                        className="relative flex items-center space-x-4 rounded-xl border border-border bg-card p-4 shadow-sm"
                      >
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20">
                          <File className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex flex-1 flex-col truncate">
                          <p className="truncate font-semibold text-sm">{file.name}</p>
                          <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>

                        <div className="flex items-center justify-end min-w-[100px]">
                          {isConverting && !result && currentlyProcessingIndex === idx ? (
                            <div className="flex items-center gap-2 text-amber-500 animate-pulse text-xs font-medium">
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                              Converting
                            </div>
                          ) : isConverting && !result && (currentlyProcessingIndex === null || currentlyProcessingIndex !== idx) ? (
                            <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
                              <Loader2 className="h-3.5 w-3.5 opacity-20" />
                              Pending
                            </div>
                          ) : result ? (
                            result.error ? (
                              <div className="flex items-center gap-1.5 text-destructive text-xs font-semibold">
                                <AlertCircle className="h-4 w-4" />
                                Error
                              </div>
                            ) : (
                              <div className="flex items-center gap-1.5 text-[#10b981] text-xs font-semibold">
                                <Check className="h-4 w-4" />
                                Success
                              </div>
                            )
                          ) : (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-destructive"
                              onClick={() => removeFile(idx)}
                              disabled={isConverting}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-6">
            <Card className="border-border/50 shadow-lg sticky top-24">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Settings2 className="h-5 w-5 text-primary" />
                  Settings
                </CardTitle>
                <CardDescription>Adjust for pixel-perfect results</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex flex-col space-y-1">
                    <Label htmlFor="fidelity" className="font-semibold">Pixel Perfect Mode</Label>
                    <p className="text-xs text-muted-foreground">Highest detail & accuracy</p>
                  </div>
                  <Switch
                    id="fidelity"
                    checked={highFidelity && !compactMode}
                    onCheckedChange={setHighFidelity}
                    disabled={compactMode}
                  />
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <div className="flex flex-col space-y-1">
                    <Label htmlFor="compact" className="font-semibold">Compact Output</Label>
                    <p className="text-xs text-muted-foreground">Minimize file size</p>
                  </div>
                  <Switch
                    id="compact"
                    checked={compactMode}
                    onCheckedChange={(checked) => {
                      setCompactMode(checked);
                      if (checked) setHighFidelity(false);
                    }}
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="font-semibold">Color Depth</Label>
                    <span className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">{colorDepth}</span>
                  </div>
                  <Slider
                    value={[colorDepth]}
                    min={2}
                    max={256}
                    step={2}
                    onValueChange={(val) => setColorDepth(val[0])}
                  />
                </div>

                <Button
                  className="w-full font-bold h-12 shadow-md hover:shadow-lg transition-all"
                  onClick={handleConvert}
                  disabled={isConverting || files.length === 0}
                >
                  {isConverting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Converting...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Convert & Download
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Features />
    </div>
  );
}
