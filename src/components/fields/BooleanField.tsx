import React from "react";
import { FieldConfig } from "@/types/form";

interface Props {
    field: FieldConfig;
}

export default function BooleanField({ field }: Props) {
    return <div className="group relative inline-flex w-11 shrink-0 rounded-full bg-gray-200 p-0.5 my-1 inset-ring inset-ring-gray-900/5 outline-offset-2 outline-indigo-600 transition-colors duration-200 ease-in-out has-checked:bg-indigo-600 has-focus-visible:outline-2 dark:bg-white/5 dark:inset-ring-white/10 dark:outline-indigo-500 dark:has-checked:bg-indigo-500">
        <span className="size-5 rounded-full bg-white shadow-xs ring-1 ring-gray-900/5 transition-transform duration-200 ease-in-out group-has-checked:translate-x-5" />
        <input
            name={field.name}
            type="checkbox"
            aria-label="Use setting"
            className="absolute inset-0 appearance-none focus:outline-hidden"
        />
    </div>;
}
