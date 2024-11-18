import React, { useState, useCallback } from 'react';

interface JSONEditorProps {
  onChange: (json: string) => void;
  error: string | null;
}

export const JSONEditor: React.FC<JSONEditorProps> = ({ onChange, error }) => {
  const [jsonText, setJsonText] = useState<string>('');
  const [copyStatus, setCopyStatus] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  // Handle input change
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setJsonText(value);
    onChange(value);
  };

  // Handle copy schema with debounce
  const handleCopy = useCallback(() => {
    if (!jsonText.trim()) {
      setCopyStatus('Schema is empty!');
      setTimeout(() => setCopyStatus(null), 2000);
      return;
    }
    navigator.clipboard.writeText(jsonText)
      .then(() => {
        setCopyStatus('Schema copied to clipboard!');
        setTimeout(() => setCopyStatus(null), 2000);
      })
      .catch(() => {
        setCopyStatus('Failed to copy schema.');
        setTimeout(() => setCopyStatus(null), 2000);
      });
  }, [jsonText]);

  // Tooltip mouse events
  const handleMouseEnter = () => setShowTooltip(true);
  const handleMouseLeave = () => setShowTooltip(false);

  return (
    <div className="p-4 h-full flex flex-col space-y-4">
      <textarea
  value={jsonText}
  onChange={handleInputChange}
  placeholder="Edit JSON schema here..."
  className="w-full h-full border border-gray-300 rounded p-2 font-mono text-sm focus:ring focus:ring-blue-300 focus:outline-none"
></textarea>
      <div className="flex items-center justify-between relative">
        {/* Copy Button with Tooltip */}
        <button
          onClick={handleCopy}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Copy Schema
        </button>
        {showTooltip && (
          <div className="absolute top-10 left-0 bg-gray-700 text-white text-xs px-2 py-1 rounded shadow">
            Click to copy the schema to clipboard
          </div>
        )}

        {/* Copy Status */}
        {copyStatus && <p className="text-sm text-green-600">{copyStatus}</p>}
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};
