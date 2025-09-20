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
        <p>The dance and ceremony will both be outdoors, weather permitting.  Tables will still be setup indoors during the dance for people who'd rather spend time inside.</p>
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
        <p>If children decide they need to run around, sing, and do all the things children do during the ceremony please don't feel like you need to stop them on our behalf.  We're certainly not going to kick our own guy out, and we wouldn't want you to have to, either! </p>
        <p>Dinner will be a buffet and the meat is pork.  People who have indicated they do not eat meat / pork will receive a vegetarian alternative.  We will not have a wedding cake. </p>
        <p>The bar is open, and is limited to beer, coolers, and wine.  If you want something else there's probably nobody watching out for your flask. </p>
        <p>During dinner, we will have two kids' tables setup on the screened patios outside.  There will be a babysitter at each table to make sure nobody's getting hurt, but an approximate 8:1 ratio will only allow so much attention per child.  We anticipate there will be fluid movement of children coming in and eating on parents' laps and parents going out to see what their children are up to.  Dietary restrictions will be taken care of according to the seating chart, so trying to follow the chart when dinner is being served is appreciated.</p>
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
  