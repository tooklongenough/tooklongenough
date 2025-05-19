'use client';

import { useState } from 'react';

export default function Winnipeg() {
  const [activeTab, setActiveTab] = useState('budget');

  const tabs = [
    { id: 'budget', label: 'Budget Traveler', range: '$300–$450 CAD' },
    { id: 'midrange', label: 'Mid-Range Traveler', range: '$700–$1,000 CAD' },
    { id: 'luxury', label: 'Luxury Traveler', range: '$1,500–$2,200 CAD' }
  ];

  const travelPlans = {
    budget: {
      stay: {
        title: 'Stay',
        content: 'HI Winnipeg – Downtown Hostel or The University of Winnipeg Downtown Hostel ($40–$70/night)'
      },
      friday: {
        title: 'Friday',
        items: [
          'Arrive afternoon/evening',
          'Walk around The Forks Market and riverwalks',
          'Dinner: The Common at The Forks – shareable, affordable eats',
          'Optional: Free art crawl in the Exchange District'
        ]
      },
      saturday: {
        title: 'Saturday',
        items: [
          'Morning: Free guided walking tour of The Exchange District',
          'Afternoon: Visit Canadian Museum for Human Rights (Free if you book late-day slots or student/senior rate ~$14)',
          'Evening: Nuit Blanche'
        ]
      },
      sunday: {
        title: 'Sunday',
        items: [
          'Morning: Grab coffee and pastry from Tall Grass Prairie Bread Co.',
          'Take a free public transit trip to Assiniboine Park: walk the trails, visit Leo Mol Sculpture Garden',
          'Optional: Visit Zoo (~$20)',
          'Evening: Casual dinner at Burrito Del Rio',
          'Catch a free or low-cost local music night at Times Change(d) High & Lonesome Club'
        ]
      },
      monday: {
        title: 'Monday',
        items: [
          'Visit St. Boniface Cathedral & Museum (free/donation)',
          'Walk the Esplanade Riel pedestrian bridge',
          'Grab lunch in St. Boniface (try Le Garage Café)',
          'Visit The Manitoba Museum on a discounted Monday rate if available',
          'Evening: Chill with local craft beer at Little Brown Jug or The Handsome Daughter open mic'
        ]
      },
      tuesday: {
        title: 'Tuesday',
        items: [
          'Quick coffee and last Forks visit',
          'Grab locally made snacks or souvenirs before heading out'
        ]
      }
    },
    midrange: {
      stay: {
        title: 'Stay',
        content: 'Mere Hotel or Inn at the Forks (~$160–$200/night)'
      },
      friday: {
        title: 'Friday',
        items: [
          'Arrive and check in',
          'Walk to The Forks, enjoy dinner at Passero',
          'Evening: Night views from the Esplanade Riel and drinks at The Common'
        ]
      },
      saturday: {
        title: 'Saturday',
        items: [
          'Brunch at Clementine Café',
          'Spend a few hours at the Canadian Museum for Human Rights',
          'Walk through The Exchange District, browse boutiques and galleries',
          'Dinner at Nuburger or Peasant Cookery',
          'Optional: See a local theater show or jazz performance'
        ]
      },
      sunday: {
        title: 'Sunday',
        items: [
          'Visit Assiniboine Park Zoo',
          'Stop at Leo Mol Sculpture Garden and take fall photos',
          'Lunch at Park Café',
          'Late afternoon stroll or rent a bike to explore nearby trails',
          'Dinner at Deer + Almond',
          'Optional: Craft cocktail at Patent 5 Distillery'
        ]
      },
      monday: {
        title: 'Monday',
        items: [
          'Visit St. Boniface and learn about Franco-Manitoban history',
          'Book a Manitoba Museum + Planetarium combo',
          'Afternoon fall colors walk along Bunn\'s Creek Trail',
          'Dinner at Feast Café Bistro (Indigenous-owned, delicious cuisine)'
        ]
      },
      tuesday: {
        title: 'Tuesday',
        items: [
          'Grab coffee from Fools & Horses',
          'Check out and head to the airport or VIA Rail'
        ]
      }
    },
    luxury: {
      stay: {
        title: 'Stay',
        content: 'The Fort Garry Hotel or Fairmont Winnipeg ($240–$350/night)'
      },
      friday: {
        title: 'Friday',
        items: [
          'Arrive and check in with welcome drink',
          'Relaxing massage or spa session at Ten Spa (Fort Garry)',
          'Dinner at Velvet Glove (Fairmont) or 529 Wellington (private car/taxi)',
          'Optional: Jazz night at Palm Lounge'
        ]
      },
      saturday: {
        title: 'Saturday',
        items: [
          'Gourmet brunch at Clementine (book ahead)',
          'VIP guided tour at Canadian Museum for Human Rights',
          'Shopping at local galleries in Osborne Village or The Exchange',
          'Early evening boat cruise on the Red River (seasonal)',
          'Dinner at Passero with wine pairing'
        ]
      },
      sunday: {
        title: 'Sunday',
        items: [
          'Private tour of Assiniboine Park Zoo or exclusive Behind the Scenes wildlife experience',
          'Lunch at Park Café',
          'Spa afternoon at Thermëa by Nordik Spa-Nature (outdoor thermal pools, saunas)',
          'Dinner at Harth Mozza & Wine Bar'
        ]
      },
      monday: {
        title: 'Monday',
        items: [
          'Morning: Explore Saint Boniface with a private guide',
          'Optional helicopter tour over Winnipeg\'s autumn canopy',
          'Afternoon: Art and Inuit collections at WAG – Qaumajuq',
          'Fine dining at Enoteca or Sous Sol',
          'Nightcap at Patent 5 or a speakeasy-style lounge'
        ]
      },
      tuesday: {
        title: 'Tuesday',
        items: [
          'Elegant breakfast at The Fort Garry',
          'Private car transfer to airport'
        ]
      }
    }
  };

  return (
    <main>
      <h2>Explore Winnipeg 🏙️</h2>
      
      <div className="travel-tips">
        <h3>Fall Travel Tips (Late September)</h3>
        <ul>
          <li>Weather: Expect highs of 12–18°C (54–64°F), lows around 5°C (41°F)</li>
          <li>What to Pack: Light layers, windproof jacket, comfortable walking shoes, and a scarf for cool evenings</li>
          <li>Events to Watch: Check listings for Nuit Blanche Winnipeg, pop-up art events, and harvest festivals</li>
        </ul>
      </div>

      <div className="budget-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label} <span className="price-range">{tab.range}</span>
          </button>
        ))}
      </div>

      <div className="itinerary">
        <div className="stay-section">
          <h3>{travelPlans[activeTab].stay.title}</h3>
          <p>{travelPlans[activeTab].stay.content}</p>
        </div>

        {['friday', 'saturday', 'sunday', 'monday', 'tuesday'].map(day => (
          <div key={day} className="day-section">
            <h3>{travelPlans[activeTab][day].title}</h3>
            <ul>
              {travelPlans[activeTab][day].items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
} 