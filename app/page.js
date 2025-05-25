import Link from 'next/link'
import CountdownTimer from './components/CountdownTimer'
import GuestBookForm from './components/GuestBookForm'

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
        <Link href="/couple" className="profile-link">
          Meet the Couple 💑
        </Link>
        <Link href="/winnipeg" className="profile-link">
          Explore Winnipeg 🏙️
        </Link>
        <Link href="/location" className="profile-link">
          Visit the Venue 🏰
        </Link>
      </div>

      <div className="social-section">
        <h3>For site updates, follow our journey on Bluesky</h3>
        <p>
          <a href="https://bsky.app/profile/tooklongenough.ca" target="_blank" rel="noopener noreferrer">
            @tooklongenough.ca on Bluesky 🦋
          </a>
        </p>
      </div>

      <div className="celebration">
        <h3>Join Us in Celebration! 🎊</h3>
        <p>We can't wait to share this special day with our family and friends. After 16 years, we've had plenty of time to plan the perfect celebration! 🎉</p>
        <p>Whether you've been with us from the start or are just joining our journey, we're excited to have you be part of our big day. 💫</p>
      </div>

      <CountdownTimer />
      <GuestBookForm />
    </main>
  )
}
  