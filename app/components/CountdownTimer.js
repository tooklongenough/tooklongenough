'use client'

import { useState, useEffect } from 'react'

export default function CountdownTimer() {
  const [days, setDays] = useState(0)

  useEffect(() => {
    const weddingDate = new Date('2025-09-29')
    const calculateDays = () => {
      const today = new Date()
      const diffTime = weddingDate - today
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
      setDays(diffDays)
    }

    calculateDays()
    const timer = setInterval(calculateDays, 1000 * 60 * 60) // Update every hour

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="countdown">
      <p>Only {days} days until the wedding! ⏰</p>
      <p>...and counting! ⌛</p>
    </div>
  )
} 