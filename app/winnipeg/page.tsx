'use client';

import { useState } from 'react';
import { hotels } from '../data/winnipeg';

export default function WinnipegPage() {
  const [activeTab, setActiveTab] = useState('stay');

  return (
    <main>
      <h2>Explore Winnipeg</h2>
      <div className="preference-content">
        {/* Tab Navigation */}
        <div className="preference-tabs">
          <button
            className={`tab-button${activeTab === 'stay' ? ' active' : ''}`}
            onClick={() => setActiveTab('stay')}
          >
            Where to Stay
          </button>
          <button
            className={`tab-button${activeTab === 'bring' ? ' active' : ''}`}
            onClick={() => setActiveTab('bring')}
          >
            What to Bring
          </button>
          <button
            className={`tab-button${activeTab === 'see' ? ' active' : ''}`}
            onClick={() => setActiveTab('see')}
          >
            What to See
          </button>
          <button
            className={`tab-button${activeTab === 'events' ? ' active' : ''}`}
            onClick={() => setActiveTab('events')}
          >
            Special Events
          </button>
        </div>
        {/* Tab Content */}
        {activeTab === 'stay' && (
          <div className="preference-section space-y-8">
            {hotels.map((hotel, index) => (
              <div
                key={hotel.name}
                className={`hotel-tile${index % 2 !== 0 ? ' reverse' : ''} ${hotel.color === 'primary' ? ' bg-primary' : ' bg-secondary'}`}
              >
                <div className="hotel-tile__name">
                  <h2>{hotel.name}</h2>
                </div>
                <div className="hotel-tile__image">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    style={{ borderRadius: '8px', maxWidth: '100%', height: 'auto', maxHeight: '220px', display: 'block', margin: '0 auto' }}
                  />
                </div>
                <div className="hotel-tile__desc">
                  <p style={{ marginBottom: '1rem', color: '#7fff00', fontWeight: 'bold' }}>{hotel.description}</p>
                  <ul style={{ paddingLeft: '1.2em' }}>
                    {hotel.details.map((detail, i) => (
                      <li key={i}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
        {activeTab === 'bring' && (
          <div className="preference-section space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Weather in Winnipeg</h2>
              <p className="mb-4">
                Winnipeg experiences all four seasons distinctly. September can be quite variable,
                with daytime highs easily ranging from 5°C to 20°C (41°F to 68°F). It's best to be prepared
                for both warm and cool weather.
              </p>
              
              <h3 className="text-xl font-bold mb-2">What to Pack</h3>
              <ul className="list-disc list-inside space-y-2 mb-6">
                <li>Layers of clothing (light sweaters, jackets)</li>
                <li>Comfortable walking shoes</li>
                <li>Umbrella (just in case)</li>
                <li>Light scarf or shawl for cooler evenings</li>
                <li>Sunscreen and sunglasses</li>
                <li>Camera for capturing memories</li>
              </ul>

              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">7-Day Forecast</h3>
                <iframe
                  src="https://www.meteoblue.com/en/weather/widget/three/winnipeg_canada_6183235?geoloc=fixed&nocurrent=0&noforecast=0&days=7&tempunit=CELSIUS&windunit=KILOMETER_PER_HOUR&layout=image"
                  width="100%"
                  height="400"
                  frameBorder="0"
                  scrolling="NO"
                  sandbox="allow-same-origin allow-scripts allow-popups allow-popups-to-escape-sandbox"
                ></iframe>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'see' && (
          <div className="preference-section space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Must-See Attractions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-2">The Forks</h3>
                  <p className="mb-4">
                    Winnipeg's historic meeting place, featuring:
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Canadian Museum for Human Rights</li>
                    <li>Market food hall</li>
                    <li>Riverwalk</li>
                    <li>Local shops and restaurants</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Exchange District</h3>
                  <p className="mb-4">
                    National Historic Site with:
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Historic architecture</li>
                    <li>Art galleries</li>
                    <li>Boutique shops</li>
                    <li>Trendy restaurants</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'events' && (
          <div className="preference-section space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Special Events</h2>
              
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2"><a href="https://nuitblanchewinnipeg.ca/" target="_blank" rel="noopener noreferrer">Nuit Blanche</a></h3>
                <p className="mb-4">
                  Winnipeg's annual all-night celebration of contemporary art. The event transforms
                  the city into a giant art gallery, with installations, performances, and
                  interactive exhibits throughout the night.
                </p>
                <p className="mb-4">
                  Although the event takes place throughout the city, most of the installations can be found in the core (downtown, Exchange District, and The Forks).
                  So if you are thinking about checking it out, we recommend staying in a central location rather than near the SNAC.
                </p>
                <p className="mb-4">
                  We will be attending this event.  We encourage you to do the same!  Maybe we'll bump into you there!
                </p>
                <p className="text-sm text-gray-600">
                  Date: September 27, 2025
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">Bryan Adams Concert</h3>
                <p className="mb-4">
                  Some guy decided to play a concert on the same night as our wedding.  I don't know why.  You probably can't make both.
                </p>
                <p className="text-sm text-gray-600">
                  Date: September 29, 2025 at Canada Life Centre
                </p>
              </div>

              <div className="mb-8">
                <a href="/"><h3 className="text-xl font-bold mb-2">Our Wedding</h3></a>
                <p className="mb-4">
                  From the grand feasts of ancient Rome to the glittering galas of Gatsby's roaring twenties, 
                  history has been punctuated by legendary celebrations that echoed through the ages. 
                  The moonlit masquerades of Versailles, the raucous revelry of Woodstock, the millennium blowout 
                  that welcomed the year 2000—each left its mark on the timeline of epic gatherings. 
                  But none of them, *none*, could prepare the world for what's coming next. 
                  Clear your calendars, dust off your dancing shoes, and ready your hearts, because **our wedding** 
                  is poised to become the most unforgettable celebration of them all. This isn't just a party—it's 
                  a *historic event in the making*.
                </p>
                <p className="text-sm text-gray-600">
                  Date: September 29, 2025 at St. Norbert Art Centre
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2">Group Activities</h3>
                <p className="mb-4">
                  We're planning some fun group activities for our who arrive in town early.

                  Follow us on <a href="https://bsky.app/profile/tooklongenough.ca" target="_blank" rel="noopener noreferrer">
                      @tooklongenough.ca on Bluesky 🦋
                  </a> to stay up to date on what we're up to!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
} 