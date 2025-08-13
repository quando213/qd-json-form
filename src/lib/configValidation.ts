import { FormConfig } from "@/types/form";

export interface ParseResult {
  parsedConfig: FormConfig | null;
  parseError: string | null;
  errors: string[];
}

/**
 * Parses JSON text and validates it against the expected FormConfig shape.
 */
export function parseAndValidateConfig(configText: string): ParseResult {
  // Parse JSON first (syntax validation)
  let parsedConfig: FormConfig | null = null;
  let parseError: string | null = null;
  try {
    parsedConfig = JSON.parse(configText);
  } catch {
    parsedConfig = null;
    parseError = "Invalid JSON configuration";
  }

  // Semantic validation
  const errors: string[] = [];
  if (parsedConfig) {
    const allowedTypes = new Set<string>([
      "numeric",
      "string",
      "multi-line",
      "boolean",
      "date",
      "enum",
    ]);

    if (!Array.isArray(parsedConfig.fields)) {
      errors.push("fields must be an array");
    } else {
      const seenNames = new Map<string, number>();
      parsedConfig.fields.forEach((field, idx) => {
        if (!field || typeof field !== "object") {
          errors.push(`fields[${idx}] must be an object`);
          return;
        }
        if (!(field as { name?: unknown }).name) {
          errors.push(`fields[${idx}].name must be a non-empty string`);
        } else {
          const name = String((field as { name: unknown }).name);
          const count = (seenNames.get(name) ?? 0) + 1;
          seenNames.set(name, count);
        }
        if (!(field as { label?: unknown }).label) {
          errors.push(`fields[${idx}].label must be a non-empty string`);
        }
        const f = field as Partial<FormConfig["fields"][number]> & { type?: unknown; options?: unknown };
        const typeVal = f.type as unknown;
        if (typeof typeVal !== "string" || !allowedTypes.has(typeVal)) {
          errors.push(`fields[${idx}].type is invalid: ${String(typeVal)}`);
        }
        if (typeVal === "enum") {
          const opts = f.options as unknown;
          if (!Array.isArray(opts) || opts.length === 0 || !opts.every((o: unknown) => typeof o === "string")) {
            errors.push(`fields[${idx}].options must be a non-empty array of strings for enum type`);
          }
        }
      });
      // report duplicates
      for (const [name, count] of seenNames.entries()) {
        if (count > 1) {
          errors.push(`duplicate field name: "${name}" appears ${count} times`);
        }
      }
    }

    if (!Array.isArray(parsedConfig.buttons)) {
      errors.push("buttons must be an array");
    } else {
      const allowedButtonVariants = new Set(["primary", "secondary", "text"]);
      parsedConfig.buttons.forEach((btn, idx) => {
        if (!btn || typeof btn !== "object") {
          errors.push(`buttons[${idx}] must be an object`);
          return;
        }
        const textVal = (btn as { text?: unknown }).text;
        if (typeof textVal !== "string" || textVal.trim() === "") {
          errors.push(`buttons[${idx}].text must be a non-empty string`);
        }
        const variantVal = (btn as { variant?: unknown }).variant;
        if (
          variantVal !== undefined &&
          (typeof variantVal !== "string" || !allowedButtonVariants.has(variantVal as string))
        ) {
          errors.push(`buttons[${idx}].variant is invalid: ${String(variantVal)}`);
        }
      });
    }
  }

  return { parsedConfig, parseError, errors };
}
