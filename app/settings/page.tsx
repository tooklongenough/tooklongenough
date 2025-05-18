'use client';

import { useState, useEffect } from 'react';
import ThemeSwitcher from '../components/ThemeSwitcher';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

interface Guest {
  first_name: string;
  last_name: string;
  pass_phrase: string;
}

export default function SettingsPage() {
  const router = useRouter();
  const [apiUrl] = useState(process.env.NEXT_PUBLIC_SUPABASE_API_URL || '');
  const [apiKey] = useState(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [guest, setGuest] = useState<Guest>({
    first_name: '',
    last_name: '',
    pass_phrase: ''
  });

  useEffect(() => {
    console.log("SettingsPage useEffect");
    const initializeGuest = async () => {
      setError(null);
      let passPhrase = Cookies.get('pass_phrase');

      console.log("SettingsPage useEffect, passPhrase:", passPhrase);

      if (!passPhrase) {
        try {
          console.log("SettingsPage useEffect, generating pass phrase");
          const response = await fetch(`${apiUrl}/generate-passphrase`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}` }
          });
          const data = await response.json();
          console.log("SettingsPage useEffect, data:", data);
          passPhrase = data.passphrase;
          if (!passPhrase) {
            setError('Unable to generate a pass phrase. Please try again later.');
            return;
          }
          Cookies.set('pass_phrase', passPhrase, { expires: 36500 });
        } catch (error) {
          console.error('Failed to generate pass phrase:', error);
          setError('Unable to connect to the server. Please check your internet connection and try again.');
          return;
        }
      }

      try {
        const response = await fetch(`${apiUrl}/get-guest`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}` },
          body: JSON.stringify({ pass_phrase: passPhrase })
        });
        
        if (response.ok) {
          const data = await response.json();
          setGuest({
            first_name: data.first_name,
            last_name: data.last_name,
            pass_phrase: passPhrase
          });
        } else {
          setGuest(prev => ({ ...prev, pass_phrase: passPhrase || '' }));
        }
      } catch (error) {
        console.error('Failed to fetch guest:', error);
        setError('Unable to connect to the server. Please check your internet connection and try again.');
        setGuest(prev => ({ ...prev, pass_phrase: passPhrase || '' }));
      } finally {
        setIsLoading(false);
      }
    };

    initializeGuest();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setError(null);

    const words = guest.pass_phrase.split(/\s+/).filter(word => word.length > 0);
    if (words.length < 3) {
      setError('Pass phrase must contain at least 3 words');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${apiUrl}/create-guest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}` },
        body: JSON.stringify(guest)
      });

      if (response.ok) {
        Cookies.set('first_name', guest.first_name, { expires: 36500 });
        Cookies.set('last_name', guest.last_name, { expires: 36500 });
        Cookies.set('pass_phrase', guest.pass_phrase, { expires: 36500 });
        router.refresh();
      } else {
        // Try update if create fails
        const updateResponse = await fetch(`${apiUrl}/update-guest`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}` },
          body: JSON.stringify({
            current_pass_phrase: guest.pass_phrase,
            new_pass_phrase: guest.pass_phrase,
            first_name: guest.first_name,
            last_name: guest.last_name
          })
        });

        if (updateResponse.ok) {
          Cookies.set('first_name', guest.first_name, { expires: 36500 });
          Cookies.set('last_name', guest.last_name, { expires: 36500 });
          Cookies.set('pass_phrase', guest.pass_phrase, { expires: 36500 });
          router.refresh();
        } else {
          setError('Failed to save your information. Please try again later.');
        }
      }
    } catch (error) {
      console.error('Failed to save guest:', error);
      setError('Unable to connect to the server. Please check your internet connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
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
            disabled
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>

        <div className="mt-8 p-6 border rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Who are you?</h3>
          <p className="text-gray-600 mb-4">
            You are free to browse anonymously, but some functionality such as RSVP will not work as well if doing so.
          </p>

          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : error ? (
            <div className="text-center p-4 bg-red-50 border border-red-200 rounded">
              <p className="text-red-600">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Try Again
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="first-name" className="block mb-1">First Name</label>
                <input
                  id="first-name"
                  type="text"
                  required
                  value={guest.first_name}
                  onChange={e => setGuest(prev => ({ ...prev, first_name: e.target.value }))}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label htmlFor="last-name" className="block mb-1">Last Name</label>
                <input
                  id="last-name"
                  type="text"
                  required
                  value={guest.last_name}
                  onChange={e => setGuest(prev => ({ ...prev, last_name: e.target.value }))}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label htmlFor="pass-phrase" className="block mb-1">Pass Phrase (at least 3 words)</label>
                <input
                  id="pass-phrase"
                  type="text"
                  required
                  value={guest.pass_phrase}
                  onChange={e => setGuest(prev => ({ ...prev, pass_phrase: e.target.value }))}
                  className="w-full p-2 border rounded"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
              >
                {isSubmitting ? 'Saving...' : 'Save'}
              </button>
            </form>
          )}
        </div>

        <div className="mt-8">
          <ThemeSwitcher />
        </div>
      </div>
    </main>
  );
}
