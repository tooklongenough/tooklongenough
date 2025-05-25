'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export default function GuestBookForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [fromCookie, setFromCookie] = useState(false);

  useEffect(() => {
    const cookieFirst = Cookies.get('first_name') || '';
    const cookieLast = Cookies.get('last_name') || '';
    setFirstName(cookieFirst);
    setLastName(cookieLast);
    setFromCookie(!!(cookieFirst && cookieLast));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    setSubmitting(true);
    let passPhrase = Cookies.get('pass_phrase');
    if (!firstName || !lastName || !message) {
      setStatus('All fields are required.');
      setSubmitting(false);
      return;
    }
    // If passPhrase is missing, generate and set it
    if (!passPhrase) {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_SUPABASE_API_URL || '';
        const apiKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
        const response = await fetch(`${apiUrl}/functions/v1/generate-passphrase`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        passPhrase = data.passphrase;
        if (passPhrase) {
          Cookies.set('pass_phrase', passPhrase, { expires: 36500 });
        } else {
          setStatus('Could not generate a pass phrase. Please try again.');
          setSubmitting(false);
          return;
        }
      } catch (err) {
        setStatus('Could not generate a pass phrase. Please try again.');
        setSubmitting(false);
        return;
      }
    }
    try {
      const apiUrl = process.env.NEXT_PUBLIC_SUPABASE_API_URL || '';
      const apiKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
      const response = await fetch(`${apiUrl}/functions/v1/sign-guest-book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          message,
          pass_phrase: passPhrase
        })
      });
      if (response.ok) {
        setStatus('Thank you for signing our guest book!');
        setMessage('');
        // Always set cookies for first and last name on submit
        Cookies.set('first_name', firstName, { expires: 36500 });
        Cookies.set('last_name', lastName, { expires: 36500 });
      } else {
        const data = await response.json();
        setStatus(data.error || 'Something went wrong.');
      }
    } catch (err) {
      setStatus('Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="guestbook-section">
      <h2 className="guestbook-header">Sign our Guest Book</h2>
      {fromCookie && (
        <div className="guestbook-logged-in">
          Visiting as {firstName} {lastName}.{' '}
          <a href="/settings" className="text-blue-500 hover:underline">
            Not you? Please tell us who you are on the Settings Page!
          </a>
        </div>
      )}
      <form onSubmit={handleSubmit} className="setting-form guestbook-form">
        <div className="guestbook-name-row">
          <label htmlFor="guestbook-first-name" className="guestbook-inline-label">First Name</label>
          <input
            id="guestbook-first-name"
            type="text"
            required
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            autoComplete="given-name"
            disabled={fromCookie}
          />
        </div>
        <div className="guestbook-name-row">
          <label htmlFor="guestbook-last-name" className="guestbook-inline-label">Last Name</label>
          <input
            id="guestbook-last-name"
            type="text"
            required
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            autoComplete="family-name"
            disabled={fromCookie}
          />
        </div>
        <label htmlFor="guestbook-message">Message</label>
        <textarea
          id="guestbook-message"
          required
          value={message}
          onChange={e => setMessage(e.target.value)}
          rows={3}
          className="guestbook-message"
        />
        <button type="submit" disabled={submitting} className="submit-btn guestbook-sign-btn">
          {submitting ? 'Signing...' : 'Sign'}
        </button>
        {status && <div className="rsvp-status" style={{ marginTop: 12 }}>{status}</div>}
      </form>
    </section>
  );
} 