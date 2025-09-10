import Link from 'next/link'
import CountdownTimer from './components/CountdownTimer'
import GuestBookForm from './components/GuestBookForm'

export default function Home() {
  return (
    <main>
      <h1>Conor & Brianna's Wedding 🎉</h1>
      <h2>September 29, 2025 💍</h2>
      
      <div className="day-of">
        <h3>Dress However You Like</h3>
        <h3>If you have cool dance party toys, like hula hoops or poi, please bring!</h3>
        <ul className="schedule">
          <li><span className="scheduled-time">4:00pm</span> -- Doors Open</li>
          <li><span className="scheduled-time">4:30pm</span> -- Ceremony Begins</li>
          <li><span className="scheduled-time">5:00pm</span> -- Cocktail Hour</li>
          <li><span className="scheduled-time">6:00pm</span> -- Dinner</li>
          <li><span className="scheduled-time">7:00pm</span> -- Speeches</li>
          <li><span className="scheduled-time">7:30pm</span> -- Dance</li>
          <li><span className="scheduled-time">8:00pm</span> -- Dance but the music might also have <span className="bad-words">bad words</span></li>
          <li><span className="scheduled-time">12:00am</span> -- Closing Time</li>
        </ul>
      </div>

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
  