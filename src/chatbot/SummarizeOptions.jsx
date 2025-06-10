// client/src/components/SummarizeOptions.jsx
import React, { useState } from 'react';

const SummarizeOptions = ({ file }) => {
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');

  const handleSummarize = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        setSummary(data.summary);
        setError('');
      } else {
        setError(data.message || 'Error summarizing the file');
      }
    } catch (err) {
      setError('Error summarizing the file: ' + err.message);
    }
  };

  return (
    <div>
      <button onClick={handleSummarize}>Summarize File</button>
      {summary && <p>Summary: {summary}</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
};

export default SummarizeOptions;