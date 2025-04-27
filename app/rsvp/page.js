'use client'

import { useState } from 'react'

export default function RSVP() {
  const [status, setStatus] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.target)

    const response = await fetch('https://api.mailgun.net/v3/YOUR_DOMAIN/messages', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${btoa('api:YOUR_MAILGUN_API_KEY')}`,
      },
      body: new URLSearchParams({
        from: 'RSVP Site <rsvp@yourdomain.com>',
        to: 'your_email@example.com',
        subject: 'Wedding RSVP',
        text: `Name: ${formData.get('name')}\nEmail: ${formData.get('email')}\nMessage: ${formData.get('message')}`,
      }),
    })

    if (response.ok) {
      setStatus('Thank you for RSVPing! 💌')
    } else {
      setStatus('Something went wrong. Please try again!')
    }
  }

  return (
    <main>
      <h2>RSVP</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Your Name" required />
        <input type="email" name="email" placeholder="Your Email" required />
        <textarea name="message" placeholder="Will you be attending?" required></textarea>
        <button type="submit">Send RSVP</button>
      </form>
      <p>{status}</p>
    </main>
  )
}
