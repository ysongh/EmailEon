"use client";

import React, { useState } from 'react';

const EmailForm = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmitEmail = async (event: any) => {
    event.preventDefault();
    const response = await fetch('/api/email/send', {
      method: 'POST',
      body: JSON.stringify({ 
        subject,
        message,
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    console.log(response);
    console.log('Subject:', subject);
    console.log('Message:', message);
    setSubject('');
    setMessage('');
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow w-[500px]">
      <h2 className="text-lg font-semibold mb-4">Send Email</h2>
      <form onSubmit={handleSubmitEmail}>
        <div className="mb-4">
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject:</label>
          <input type="text" id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} required className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message:</label>
          <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} required className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"></textarea>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Send Email</button>
      </form>
    </div>
  );
};

export default EmailForm;
