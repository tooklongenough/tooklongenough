export default function Location() {
    return (
      <main>
        <h2>Location 🏰</h2>
        <p>Join us at the beautiful St. Norbert Arts Centre! ✨</p>
        <div className="location-media-container">
          <img 
            src="/stnorbert1.jpg" 
            alt="St. Norbert Arts Centre" 
            className="location-media"
            style={{ 
              objectFit: 'cover',
              borderRadius: '8px'
            }} 
          />
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2572.465353109394!2d-97.1553527!3d49.7577778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x52c1df00e8e727c1%3A0x2e74800429e80440!2sSt%20Norbert%20Arts%20Centre!5e0!3m2!1sen!2sca!4v1714048889658!5m2!1sen!2sca" 
            className="location-media"
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade">
          </iframe>
        </div>

        <section className="address-details">
          <h3>Address & Directions 🗺️</h3>
          <p>Address: 100 rue des Ruines du Monastère, Winnipeg, MB 📍</p>
          <p>Directions: Head south on Pembina Hwy, turn onto rue des Ruines du Monastère. 🚗</p>
        </section>

        <section className="venue-details">
          <h3>Venue Details 🎭</h3>
          <div className="venue-section">
            <h4>Ceremony - St. Norbert Monastery Ruins 💒</h4>
            <p>Our ceremony will take place at the historic St. Norbert Monastery Ruins, located just steps away from the Arts Centre. This beautiful outdoor setting provides a perfect backdrop for our special day. 🌸</p>
          </div>

          <div className="venue-section">
            <h4>Reception - St. Norbert Arts Centre 🎨</h4>
            <p>The reception will be held in the main hall of the St. Norbert Arts Centre. This historic building features beautiful wooden beams, large windows, and a warm, inviting atmosphere perfect for celebrating with family and friends. 🎉</p>
          </div>

          <div className="venue-section">
            <h4>Dancing - Outdoor Patio (Weather Permitting) 💃🕺</h4>
            <p>Weather permitting, we'll move the celebration outdoors to the Arts Centre's patio area for dancing under the stars. In case of inclement weather, we'll have a backup indoor space ready. ⭐</p>
          </div>
        </section>

        <section className="parking-details">
          <h3>Parking Information 🚗</h3>
          <div className="parking-section">
            <h4>Main Parking Lot (Reserved) 🎯</h4>
            <p>The parking lot directly in front of the Arts Centre is reserved for:</p>
            <ul>
              <li>Wedding party members 👰🤵</li>
              <li>Loading and unloading 📦</li>
              <li>Guests with accessibility needs ♿</li>
            </ul>
          </div>
          <div className="parking-section">
            <h4>Overflow Parking 🅿️</h4>
            <p>All other guests should park in the overflow lot near the Monastery Ruins. This lot is a short walk from the Arts Centre and provides plenty of space for all our guests. 🚶‍♂️</p>
          </div>
        </section>
      </main>
    )
  }
  