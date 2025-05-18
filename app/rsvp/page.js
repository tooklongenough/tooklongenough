'use client'

import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

// Hook to detect mobile
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

export default function RSVP() {
  const [status, setStatus] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [guests, setGuests] = useState([
    { rsvp_id: undefined, firstName: '', lastName: '', attending: true, dietary: '' }
  ])
  const [toDelete, setToDelete] = useState([])
  const isMobile = useIsMobile();

  useEffect(() => {
    const savedFirstName = Cookies.get('first_name')
    const savedLastName = Cookies.get('last_name')
    setIsLoggedIn(!!(savedFirstName && savedLastName))
    setFirstName(savedFirstName || '')
    setLastName(savedLastName || '')

    // Load RSVPs if logged in
    const passPhrase = Cookies.get('pass_phrase')
    const apiUrl = process.env.NEXT_PUBLIC_SUPABASE_API_URL || ''
    const apiKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    if (passPhrase && apiUrl && apiKey) {
      fetch(`${apiUrl}/functions/v1/get-rsvps`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({ pass_phrase: passPhrase })
      })
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data) && data.length > 0) {
            setGuests(data.map(rsvp => ({
              rsvp_id: rsvp.rsvp_id,
              firstName: rsvp.first_name || '',
              lastName: rsvp.last_name || '',
              attending: typeof rsvp.attending === 'boolean' ? rsvp.attending : true,
              dietary: rsvp.meal_requirements || ''
            })))
          } else if (savedFirstName && savedLastName) {
            setGuests([{
              rsvp_id: undefined,
              firstName: savedFirstName,
              lastName: savedLastName,
              attending: true,
              dietary: ''
            }])
          }
        })
        .catch(() => {
          if (savedFirstName && savedLastName) {
            setGuests([{
              rsvp_id: undefined,
              firstName: savedFirstName,
              lastName: savedLastName,
              attending: true,
              dietary: ''
            }])
          }
        })
    } else if (savedFirstName && savedLastName) {
      setGuests([{
        rsvp_id: undefined,
        firstName: savedFirstName,
        lastName: savedLastName,
        attending: true,
        dietary: ''
      }])
    }
  }, [])

  const addGuest = () => {
    setGuests([...guests, { firstName: '', lastName: '', attending: true, dietary: '' }])
  }

  const updateGuest = (index, field, value) => {
    const newGuests = [...guests]
    newGuests[index] = { ...newGuests[index], [field]: value }
    setGuests(newGuests)
  }

  const deleteGuest = (index) => {
    setGuests(prev => {
      const guest = prev[index]
      if (guest.rsvp_id) {
        setToDelete(toDel => [...toDel, guest.rsvp_id])
      }
      return prev.filter((_, i) => i !== index)
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('')
    const passPhrase = Cookies.get('pass_phrase')
    if (!passPhrase) {
      setStatus('You must identify yourself on the Settings page before submitting an RSVP.')
      return
    }
    const apiUrl = process.env.NEXT_PUBLIC_SUPABASE_API_URL || ''
    const apiKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    const createEndpoint = `${apiUrl}/functions/v1/create-rsvp`
    const updateEndpoint = `${apiUrl}/functions/v1/update-rsvp`
    const deleteEndpoint = `${apiUrl}/functions/v1/delete-rsvp`
    const filteredGuests = guests.filter(guest => guest.firstName || guest.lastName)
    let allOk = true
    let errorMsg = ''

    // Handle deletes
    for (const rsvp_id of toDelete) {
      const res = await fetch(deleteEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          pass_phrase: passPhrase,
          rsvp_id
        })
      })
      if (!res.ok) {
        allOk = false
        try {
          const data = await res.json()
          errorMsg = data.error || 'Unknown error.'
        } catch {
          errorMsg = 'Unknown error.'
        }
        break
      }
    }

    // Handle creates/updates
    for (const guest of filteredGuests) {
      if (guest.rsvp_id) {
        // Update
        const res = await fetch(updateEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            pass_phrase: passPhrase,
            rsvp_id: guest.rsvp_id,
            first_name: guest.firstName,
            last_name: guest.lastName,
            meal_requirements: guest.dietary || '',
            attending: guest.attending
          })
        })
        if (!res.ok) {
          allOk = false
          try {
            const data = await res.json()
            errorMsg = data.error || 'Unknown error.'
          } catch {
            errorMsg = 'Unknown error.'
          }
          break
        }
      } else {
        // Create
        const res = await fetch(createEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            pass_phrase: passPhrase,
            first_name: guest.firstName,
            last_name: guest.lastName,
            meal_requirements: guest.dietary || '',
            attending: guest.attending
          })
        })
        if (!res.ok) {
          allOk = false
          try {
            const data = await res.json()
            errorMsg = data.error || 'Unknown error.'
          } catch {
            errorMsg = 'Unknown error.'
          }
          break
        }
      }
    }
    if (allOk) {
      setStatus('Thank you for RSVPing! 💌')
      setToDelete([])
    } else {
      setStatus('Something went wrong: ' + errorMsg)
    }
  }

  return (
    <main>
      <h2>RSVP 🎉</h2>
      
      <div className="rsvp-info">
        <p>Please tell us everyone who will be attending, including children 👨‍👩‍👧‍👦. If we sent you an invite, it is to your entire household, and we expect to see many toddlers around 🍼. But we still need to know who we're seating 🪑.</p>

        <p>In your RSVP - assuming you are saying yes - please also include any dietary considerations or allergies 🥗. It will be a buffet dinner, but there's still alternate dishes available 🍽️.</p>

        <p>If you'd like to RSVP you can do so directly to either Conor or Brianna using whatever contact info you have 📱.</p>

        <p>You can also RSVP to: <a href="mailto:rsvp@tooklongenough.ca?subject=Wedding%20RSVP">rsvp@tooklongenough.ca</a> ✉️</p>

        {!isLoggedIn ? (
          <p>Finally, if you'd like to tell us who you are on the <a href="/settings">Settings page</a>, you can use the form below to manage your RSVP 📝.</p>
        ) : (
          <p>Or simply fill out the form below and hit submit! ✨</p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="rsvp-form">
        {isMobile ? (
          // MOBILE: stacked guest cards
          guests.map((guest, index) => (
            <div className="guest-row" key={index}>
              <div className="guest-field">
                <label className="guest-label" htmlFor={`firstName-${index}`}>First Name</label>
                <input
                  className="guest-input"
                  id={`firstName-${index}`}
                  type="text"
                  value={guest.firstName}
                  onChange={(e) => updateGuest(index, 'firstName', e.target.value)}
                  placeholder="First Name"
                />
              </div>
              <div className="guest-field">
                <label className="guest-label" htmlFor={`lastName-${index}`}>Last Name</label>
                <input
                  className="guest-input"
                  id={`lastName-${index}`}
                  type="text"
                  value={guest.lastName}
                  onChange={(e) => updateGuest(index, 'lastName', e.target.value)}
                  placeholder="Last Name"
                  required
                />
              </div>
              <div className="guest-field">
                <label className="guest-label" htmlFor={`dietary-${index}`}>Dietary Restrictions</label>
                <input
                  className="guest-input"
                  id={`dietary-${index}`}
                  type="text"
                  value={guest.dietary}
                  onChange={(e) => updateGuest(index, 'dietary', e.target.value)}
                  placeholder="Any dietary restrictions?"
                />
              </div>
              <div className="guest-field">
                <label className="guest-label" htmlFor={`attending-${index}`}>Attending</label>
                <select
                  className="guest-input"
                  id={`attending-${index}`}
                  value={guest.attending}
                  onChange={(e) => updateGuest(index, 'attending', e.target.value === 'true')}
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              {/* Delete button, not for first row */}
              {guests.length > 1 && (
                <div className="guest-field" style={{textAlign: 'right'}}>
                  <button type="button" className="delete-guest-btn" onClick={() => deleteGuest(index)} title="Remove guest" style={{color: 'red', fontWeight: 'bold', border: 'none', background: 'none', fontSize: '1.5rem', cursor: 'pointer', lineHeight: 1}}>&times;</button>
                </div>
              )}
            </div>
          ))
        ) : (
          // DESKTOP: grid with headers
          <div className="rsvp-grid">
            <div className="grid-header">First Name</div>
            <div className="grid-header">Last Name</div>
            <div className="grid-header">Dietary Restrictions</div>
            <div className="grid-header">Attending</div>
            {guests.map((guest, index) => (
              <React.Fragment key={index}>
                <input
                  type="text"
                  value={guest.firstName}
                  onChange={(e) => updateGuest(index, 'firstName', e.target.value)}
                  placeholder="First Name"
                />
                <input
                  type="text"
                  value={guest.lastName}
                  onChange={(e) => updateGuest(index, 'lastName', e.target.value)}
                  placeholder="Last Name"
                  required
                />
                <input
                  type="text"
                  value={guest.dietary}
                  onChange={(e) => updateGuest(index, 'dietary', e.target.value)}
                  placeholder="Any dietary restrictions?"
                />
                <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <select
                    value={guest.attending}
                    onChange={(e) => updateGuest(index, 'attending', e.target.value === 'true')}
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                  {/* Delete button, not for first row */}
                  {guests.length > 1 && (
                    <button type="button" className="delete-guest-btn" onClick={() => deleteGuest(index)} title="Remove guest" style={{color: 'red', fontWeight: 'bold', border: 'none', background: 'none', fontSize: '1.5rem', cursor: 'pointer', lineHeight: 1}}>&times;</button>
                  )}
                </div>
              </React.Fragment>
            ))}
          </div>
        )}
        <button type="button" onClick={addGuest} className="add-guest-btn">
          + Add Guest
        </button>
        <button type="submit" className="submit-btn">
          Send RSVP
        </button>
      </form>
      <p>{status}</p>
    </main>
  )
}
