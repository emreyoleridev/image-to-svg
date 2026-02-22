"use client";

import React, { useCallback } from "react";
import { useDropzone, FileRejection, DropEvent } from "react-dropzone";
import { Cloud } from "lucide-react";
import { cn } from "@/lib/utils";

interface DropzoneProps {
    files: File[];
    onFilesChange: (files: File[]) => void;
    maxFiles?: number;
}

export function Dropzone({ files, onFilesChange, maxFiles = 0 }: DropzoneProps) {
    const onDrop = useCallback(
        (acceptedFiles: File[], fileRejections: FileRejection[], event: DropEvent) => {
            const newFiles = [...files, ...acceptedFiles];
            if (maxFiles > 0 && newFiles.length > maxFiles) {
                newFiles.length = maxFiles;
            }
            onFilesChange(newFiles);
        },
        [files, onFilesChange, maxFiles]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/*": [".jpeg", ".png", ".jpg", ".webp", ".gif", ".bmp", ".tiff"],
        },
        maxFiles: maxFiles > 0 ? maxFiles : undefined,
    });

    return (
        <div className="w-full">
            <div
                {...getRootProps()}
                className={cn(
                    "h-80 group relative flex cursor-pointer flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-primary/20 bg-card px-6 py-14 text-center transition-all duration-500 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1",
                    isDragActive && "border-primary bg-primary/5 scale-[0.98]"
                )}
            >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center justify-center space-y-8">
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse" />
                        <div className="relative rounded-2xl bg-white dark:bg-zinc-900 border border-border p-6 shadow-xl ring-1 ring-primary/10 transition-transform duration-500 group-hover:scale-110">
                            <Cloud
                                className={cn("h-10 w-10 text-primary transition-all duration-500", isDragActive && "scale-125")}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <p className="text-3xl font-black text-foreground tracking-tight">
                            Drop your image here
                        </p>
                        <p className="text-sm text-muted-foreground font-medium">
                            Drag and drop or <span className="text-primary font-bold underline decoration-2 underline-offset-4 pointer-events-none">browse</span> to start
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
