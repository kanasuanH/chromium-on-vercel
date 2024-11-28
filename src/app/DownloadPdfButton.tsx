// app/download/DownloadPdfButton.tsx (Client Component)
"use client";

import React from 'react';
export const maxDuration = 60;

const DownloadPdfButton: React.FC = () => {
  const downloadPdf = async () => {
    try {
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          htmlContent: '<html><body><h1>Your PDF Content</h1></body></html>', // Replace with dynamic content
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }

      const pdfBlob = await response.blob();
      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'output.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

  return <button onClick={downloadPdf}>Download PDF</button>;
};

export default DownloadPdfButton;
