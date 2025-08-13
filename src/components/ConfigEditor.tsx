"use client";

import React from "react";
import Button from "@/components/Button";

interface ConfigEditorProps {
    value: string;
    onChange: (val: string) => void;
    onApply?: () => void;
}

export default function ConfigEditor({ value, onChange, onApply }: ConfigEditorProps) {
    return (
        <div className="space-y-3">
            <textarea
                id="config"
                name="config"
                rows={4}
                className="block w-full h-[500px] rounded-md bg-white px-3 py-1.5 font-mono text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            <div className="flex items-center justify-end">
                <Button variant="primary" className="cursor-pointer" onClick={onApply}>
                    Apply
                </Button>
            </div>
        </div>
    );
}
