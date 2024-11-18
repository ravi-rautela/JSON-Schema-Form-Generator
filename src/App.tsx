import React from "react";
import { JSONEditor } from "./componets/JSONEditor";
import { JSONSchemaForm } from "./componets/JSONSchemaForm";

export const App: React.FC = () => {
  const [jsonSchema, setJsonSchema] = React.useState<any>({});
  const [error, setError] = React.useState<string | null>(null);

  const handleSchemaChange = (json: string) => {
    try {
      const parsed = JSON.parse(json);
      setJsonSchema(parsed);
      setError(null);
    } catch (err) {
      setError('Invalid JSON');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col">
      <header className="bg-blue-500 text-white p-4 shadow">
        <h1 className="text-2xl font-bold">JSON Schema Form Generator</h1>
        <p className="text-sm">Edit the JSON schema and preview the form in real-time</p>
      </header>

      <main className="flex-grow flex flex-col md:flex-row p-4 space-y-4 md:space-y-0 md:space-x-4">
        {/* JSON Editor */}
        <div className="flex-1 bg-white shadow rounded p-4">
          <h2 className="text-lg font-semibold mb-4">JSON Editor</h2>
          <JSONEditor onChange={handleSchemaChange} error={error} />
        </div>

        {/* Form Preview */}
        <div className="flex-1 bg-white shadow rounded p-4">
          <h2 className="text-lg font-semibold mb-4">Form Preview</h2>
          {Object.keys(jsonSchema).length > 0 ? (
            <JSONSchemaForm schema={jsonSchema} />
          ) : (
            <p className="text-gray-500">Start by entering a valid JSON schema</p>
          )}
        </div>
      </main>

      <footer className="bg-gray-800 text-white text-center p-4">
        Built with ❤️ using React, TypeScript, and Tailwind CSS
      </footer>
    </div>
  );
};

export default App; 