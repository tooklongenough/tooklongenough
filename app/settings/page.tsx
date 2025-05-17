'use client';

import { useState, useEffect } from 'react';
import ThemeSwitcher from '../components/ThemeSwitcher';

export default function SettingsPage() {
  const [apiUrl, setApiUrl] = useState(process.env.NEXT_PUBLIC_SUPABASE_API_URL || '');

  const handleApiUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiUrl(e.target.value);
    // You can add logic here to save the new URL if needed
  };

  return (
    <main>
      <div className="settings-page">
        <h2>Settings</h2>
        <div className="setting-item">
          <label htmlFor="api-url">API URL:</label>
          <input
            id="api-url"
            type="text"
            value={apiUrl}
            onChange={handleApiUrlChange}
            placeholder="Enter API URL"
            className="w-full p-2 border rounded"
          />
        </div>
        <ThemeSwitcher />
      </div>
    </main>
  );
}
