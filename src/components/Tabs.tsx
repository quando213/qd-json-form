"use client";

import React from "react";
import clsx from "clsx";
import type { TabsProps } from "@/types/ui";

export default function Tabs({ tabs, activeTab, onTabChange }: TabsProps) {
  return (
    <div className="border-b border-gray-200 dark:border-white/10">
      <nav aria-label="Tabs" className="-mb-px flex space-x-8">
        {tabs.map((tab) => {
          const isCurrent = activeTab === tab.key;
          return (
            <a
              key={tab.key}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onTabChange(tab.key);
              }}
              aria-current={isCurrent ? "page" : undefined}
              className={clsx(
                isCurrent
                  ? "border-indigo-500 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-white/20 dark:hover:text-gray-200",
                "border-b-2 px-1 py-4 text-sm font-medium whitespace-nowrap"
              )}
            >
              {tab.name}
            </a>
          );
        })}
      </nav>
    </div>
  );
}
