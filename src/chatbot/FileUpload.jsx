// src/components/FileUpload.jsx
import React, { useState } from 'react';

const FileUpload = ({ onFileUpload }) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        alert('Only PDF, JPEG, or PNG files are allowed');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      setIsUploading(true);
      try {
        await onFileUpload(file);
      } catch (error) {
        alert('File upload failed');
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div style={{ marginTop: 10 }}>
      <input
        type="file"
        accept=".pdf,image/*"
        onChange={handleFileChange}
        disabled={isUploading}
      />
      {isUploading && <span style={{ marginLeft: 10 }}>Uploading...</span>}
    </div>
  );
};

export default FileUpload;