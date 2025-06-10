// client/src/components/EmailOptions.jsx
import React, { useState } from 'react';

const EmailOptions = ({ file }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSend = async () => {
    if (!file || !email) {
      setStatus('Please provide a valid email and file');
      return;
    }

    const formData = new FormData();
    formData.append('email', email);
    formData.append('file', file);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setStatus(data.message || 'Error sending file');
      if (response.ok) {
        setEmail(''); // Clear input on success
      }
    } catch (err) {
      setStatus('Error sending file: ' + err.message);
    }
  };

  const isButtonDisabled = !file || !email.trim();

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Recipient email"
        aria-label="Recipient email"
      />
      <button onClick={handleSend} disabled={isButtonDisabled}>
        Send File
      </button>
      {status && (
        <p className={status.includes('Error') ? 'error' : ''}>{status}</p>
      )}
    </div>
  );
};

export default EmailOptions;