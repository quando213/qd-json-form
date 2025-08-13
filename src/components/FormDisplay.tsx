"use client";

import React from "react";
import {FormConfig, FieldConfig} from "@/types/form";
import StringField from "./fields/StringField";
import NumericField from "./fields/NumericField";
import MultiLineField from "./fields/MultiLineField";
import BooleanField from "./fields/BooleanField";
import DateField from "./fields/DateField";
import EnumField from "./fields/EnumField";
import Button from "@/components/Button";

const renderField = (field: FieldConfig) =>  {
    switch (field.type) {
        case "string":
            return <StringField field={field} />;
        case "numeric":
            return <NumericField field={field} />;
        case "multi-line":
            return <MultiLineField field={field} />;
        case "boolean":
            return <BooleanField field={field} />;
        case "date":
            return <DateField field={field} />;
        case "enum":
            return <EnumField field={field} />;
        default:
            return null;
    }
}

export default function FormDisplay({ config }: { config: FormConfig }) {
    return (
        <form>
            <div>
                {config.title && (
                    <h1 className="mt-10 text-3xl/7 font-semibold text-gray-900 dark:text-white">{config.title}</h1>
                )}

                <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:border-t-gray-900/10 sm:pb-0 dark:border-white/10 dark:sm:divide-white/10 dark:sm:border-t-white/10">
                    {config.fields.map((field) => (
                        <div key={field.name} className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                            <label htmlFor={field.name} className="block text-sm/6 font-medium text-gray-900 sm:pt-1.5 dark:text-white">
                                {field.label}
                            </label>
                            <div className="mt-2 sm:col-span-2 sm:mt-0">
                                {renderField(field)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-2">
                {config.buttons.map((btn, idx) => (
                    <Button key={idx} variant={btn.variant} type="button">
                        {btn.text}
                    </Button>
                ))}
            </div>
        </form>
    );
}
