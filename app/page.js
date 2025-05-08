import Link from 'next/link'
import CountdownTimer from './components/CountdownTimer'

export default function Home() {
  return (
    <main>
      <h1>Conor & Brianna's Wedding 🎉</h1>
      <h2>September 29, 2025 💍</h2>
      
      <div className="couple-intro">
        <p>After 16 years of blissful togetherness, we're finally making it official! 💑</p>
        <p>Why now, you ask? Well, with all this talk of US annexation, we figured we'd better secure those spousal privileges while we still can! 🇨🇦</p>
      </div>

      <div className="main-links">
        <Link href="/bride" className="profile-link">
          Meet the Bride 👰
        </Link>
        <Link href="/groom" className="profile-link">
          Meet the Groom 🤵
        </Link>
        <Link href="/location" className="profile-link">
          Visit the Venue 🏰
        </Link>
      </div>

      <div className="social-section">
        <h3>Follow Our Journey</h3>
        <p>
          <a href="https://bsky.app/profile/tooklongenough.ca" target="_blank" rel="noopener noreferrer">
            @tooklongenough.ca on Bluesky 🦋
          </a>
        </p>
      </div>

      <div className="ai-jokes">
        <h3>AI-Generated Wedding Website? 🤖</h3>
        <p>Yes, this website was created by AI! As a developer, Conor thought it would be hilarious to let the robots do the work for once. 😄</p>
        <p>Don't worry though - the wedding itself will be 100% human-generated (unless the robots take over by 2025 🤖).</p>
        <p>Fun fact: This AI spent more time picking emojis than writing the code. Priorities! 🎯</p>
      </div>

      <div className="celebration">
        <h3>Join Us in Celebration! 🎊</h3>
        <p>We can't wait to share this special day with our family and friends. After 16 years, we've had plenty of time to plan the perfect celebration! 🎉</p>
        <p>Whether you've been with us from the start or are just joining our journey, we're excited to have you be part of our big day. 💫</p>
      </div>

      <CountdownTimer />
    </main>
  )
}
  