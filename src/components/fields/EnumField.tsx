import React from "react";
import { FieldConfig } from "@/types/form";

interface Props {
    field: FieldConfig;
}

export default function EnumField({ field }: Props) {
    return <fieldset className="py-1.5">
        <div className="space-y-6 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
            {field.options?.map((option) => (
                <div key={option} className="flex items-center">
                    <input
                        id={`${field.name}-${option}`}
                        name={field.name}
                        type="radio"
                        className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 dark:border-white/10 dark:bg-white/5 dark:checked:border-indigo-500 dark:checked:bg-indigo-500 dark:focus-visible:outline-indigo-500 dark:disabled:border-white/5 dark:disabled:bg-white/10 dark:disabled:before:bg-white/20 forced-colors:appearance-auto forced-colors:before:hidden"
                    />
                    <label
                        htmlFor={`${field.name}-${option}`}
                        className="ml-3 block text-sm/6 font-medium text-gray-900 dark:text-white"
                    >
                        {option}
                    </label>
                </div>
            ))}
        </div>
    </fieldset>;
}
