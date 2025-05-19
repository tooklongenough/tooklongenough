'use client';

import { useState, useEffect } from 'react';
import { preferences } from '../data/preferences';

export default function CouplePage() {
  const [activeTab, setActiveTab] = useState('movies');

  const PreferenceItem = ({ item }) => (
    <div className={`preference-item ${item.preference}`}>
      {item.name}
    </div>
  );

  const PreferenceSection = ({ title, items }) => (
    <div className="preference-section">
      <h3>{title}</h3>
      <div className="preference-grid">
        {items.map((item, index) => (
          <PreferenceItem key={index} item={item} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="page-transition">
      <h2>Meet the Couple</h2>
      
      <div className="preference-tabs">
        <button 
          className={`tab-button ${activeTab === 'movies' ? 'active' : ''}`}
          onClick={() => setActiveTab('movies')}
        >
          Movies
        </button>
        <button 
          className={`tab-button ${activeTab === 'shows' ? 'active' : ''}`}
          onClick={() => setActiveTab('shows')}
        >
          Shows
        </button>
        <button 
          className={`tab-button ${activeTab === 'restaurants' ? 'active' : ''}`}
          onClick={() => setActiveTab('restaurants')}
        >
          Restaurants
        </button>
        <button 
          className={`tab-button ${activeTab === 'creatives' ? 'active' : ''}`}
          onClick={() => setActiveTab('creatives')}
        >
          Creatives
        </button>
        <button 
          className={`tab-button ${activeTab === 'music' ? 'active' : ''}`}
          onClick={() => setActiveTab('music')}
        >
          Music
        </button>
      </div>

      <div className="preference-content">
        {activeTab === 'movies' && <PreferenceSection title="Movies We Love" items={preferences.movies} />}
        {activeTab === 'shows' && <PreferenceSection title="Shows We Binge" items={preferences.shows} />}
        {activeTab === 'restaurants' && <PreferenceSection title="Our Favorite Restaurants" items={preferences.restaurants} />}
        {activeTab === 'creatives' && <PreferenceSection title="Creatives We Admire" items={preferences.creatives} />}
        {activeTab === 'music' && <PreferenceSection title="Music We Listen To" items={preferences.music} />}
      </div>
    </div>
  );
} 