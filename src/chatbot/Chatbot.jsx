// client/src/components/Chaya.jsx
import React, { useState, useEffect, useRef } from 'react';
import FileUpload from './FileUpload';
import EmailOptions from './EmailOptions';
import SummarizeOptions from './SummarizeOptions';
import './ChatBot.css'; // Updated CSS file for styling

const Chaya = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const messagesEndRef = useRef(null);

  // Scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = { content: input, type: 'sent' };
    setMessages((prev) => [...prev, newMessage]);
    setInput('');
  };

  const handleFileUpload = (file) => {
    if (file) {
      setUploadedFile(file);
      const fileMessage = {
        content: `Uploaded file: ${file.name}`,
        type: 'file',
        file,
      };
      setMessages((prev) => [...prev, fileMessage]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chaya-container">
      <h2>Chaya</h2>
      <div className="chaya-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.type === 'sent' ? 'sent' : 'file'}`}
          >
            {msg.type === 'file' ? (
              <div>
                <p>{msg.content}</p>
                {msg.file && (
                  <a
                    href={URL.createObjectURL(msg.file)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View File
                  </a>
                )}
              </div>
            ) : (
              <p>{msg.content}</p>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chaya-input">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message to Chaya..."
          rows="2"
        />
        <button onClick={handleSend}>Send</button>
      </div>
      <FileUpload onFileUpload={handleFileUpload} />
      {uploadedFile && (
        <div className="chaya-options">
          <EmailOptions file={uploadedFile} />
          <SummarizeOptions file={uploadedFile} />
        </div>
      )}
    </div>
  );
};

export default Chaya;