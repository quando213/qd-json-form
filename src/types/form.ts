export type FieldType =
    | "numeric"
    | "string"
    | "multi-line"
    | "boolean"
    | "date"
    | "enum";

export type ButtonVariant = "primary" | "secondary" | "text";

export interface FieldConfig {
    name: string;
    label: string;
    type: FieldType;
    options?: string[]; // Only for enum fields
}

export interface ButtonConfig {
    text: string;
    variant?: ButtonVariant;
}

export interface FormConfig {
    title: string;
    fields: FieldConfig[];
    buttons: ButtonConfig[];
}
