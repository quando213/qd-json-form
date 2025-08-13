"use client";

import React, { useMemo, useState } from "react";
import ConfigEditor from "@/components/ConfigEditor";
import FormDisplay from "@/components/FormDisplay";
import Tabs from "@/components/Tabs";
import type { TabItem } from "@/types/ui";
import { parseAndValidateConfig } from "@/lib/configValidation";

const tabs: TabItem[] = [
    { name: 'Config', key: 'config' },
    { name: 'Result', key: 'result' },
]

export default function HomePage() {
    const [activeTab, setActiveTab] = useState<string>("config");
    const [configText, setConfigText] = useState<string>(
        JSON.stringify(
            {
                title: "User Registration",
                fields: [
                    { name: "username", label: "Username", type: "string" },
                    { name: "age", label: "Age", type: "numeric" },
                    { name: "bio", label: "Biography", type: "multi-line" },
                    { name: "subscribe", label: "Subscribe", type: "boolean" },
                    { name: "birthdate", label: "Birth Date", type: "date" },
                    { name: "gender", label: "Gender", type: "enum", options: ["Male", "Female", "Other"] }
                ],
                buttons: [
                    { text: "Cancel", variant: "text" },
                    { text: "Save", variant: "primary" },
                ]
            },
            null,
            2
        )
    );

    const { parsedConfig, parseError, errors } = useMemo(() => parseAndValidateConfig(configText), [configText]);

    const hasErrors = !!parseError || errors.length > 0;

    return (
        <div className="p-4 max-w-3xl mx-auto space-y-4">
            <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

            {activeTab === "config" && (
                <ConfigEditor
                    value={configText}
                    onChange={setConfigText}
                    onApply={() => setActiveTab("result")}
                />
            )}

            {activeTab === "result" && (
                hasErrors ? (
                    <div className="rounded-md border border-red-300 bg-red-50 p-3 text-red-700 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-200"
                         data-testid="error-panel">
                        <p className="font-semibold mb-2">Invalid configuration</p>
                        {parseError && <p className="mb-2">{parseError}</p>}
                        {errors.length > 0 && (
                            <ul className="list-disc pl-5 space-y-1">
                                {errors.map((err, i) => (
                                    <li key={i}>{err}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                ) : (
                    parsedConfig && <FormDisplay config={parsedConfig} />
                )
            )}
        </div>
    );
}
