# QD Json Form Builder

Build simple forms from a JSON configuration. Type your JSON on the "Config" tab and preview the generated form on the "Result" tab.

## Tech Stack
- Next.js 15 (React 19)
- TypeScript
- TailwindCSS 4
- Vitest + Testing Library (unit tests)
- Playwright (e2e tests)

## Getting Started
1. Install dependencies:
   - npm install
2. Run the dev server:
   - npm run dev
3. Open the app:
   - http://localhost:3000

You can edit the default example in src/app/page.tsx or paste your own JSON in the "Config" tab of the app.

## Useful Scripts
- dev: Start development server
- test: Run unit tests with Vitest
- e2e: Run Playwright end-to-end tests

## JSON Schema
The application expects a JSON object with the following structure.

Top-level object (FormConfig):
- title: string
- fields: FieldConfig[]
- buttons: ButtonConfig[]

FieldConfig:
- name: string (unique across all fields)
- label: string
- type: "numeric" | "string" | "multi-line" | "boolean" | "date" | "enum"
- options?: string[] (required only when type === "enum")

ButtonConfig:
- text: string
- variant?: "primary" | "secondary" | "text"

### Validation Rules
- JSON must be syntactically valid.
- fields must be a non-empty array of objects.
- Each field must have a non-empty name and label.
- type must be one of: numeric, string, multi-line, boolean, date, enum.
- For enum fields, options must be a non-empty array of strings.
- Field names must be unique (duplicates are reported).
- buttons must be an array of objects.
- Each button must have non-empty text.
- variant, if provided, must be one of: primary, secondary, text.

### Example
{
  "title": "User Registration",
  "fields": [
    { "name": "username", "label": "Username", "type": "string" },
    { "name": "age", "label": "Age", "type": "numeric" },
    { "name": "bio", "label": "Biography", "type": "multi-line" },
    { "name": "subscribe", "label": "Subscribe", "type": "boolean" },
    { "name": "birthdate", "label": "Birth Date", "type": "date" },
    { "name": "gender", "label": "Gender", "type": "enum", "options": ["Male", "Female", "Other"] }
  ],
  "buttons": [
    { "text": "Cancel", "variant": "text" },
    { "text": "Save", "variant": "primary" }
  ]
}

## Notes
- The UI validates your JSON and shows a list of issues if any are found.
- The preview renders input components corresponding to each field type.
- This project is meant for demo and exploration; it does not persist data or submit forms.
