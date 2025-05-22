'use client';

import { useState, useEffect } from 'react';
import { preferences } from '../data/preferences';

function getSearchUrl(category, name) {
  if (category === 'movies' || category === 'shows') {
    return `https://www.imdb.com/find?q=${encodeURIComponent(name)}`;
  }
  if (category === 'creatives') {
    return `https://www.google.com/search?q=${encodeURIComponent(name)}`;
  }
  if (category === 'restaurants') {
    return `https://www.google.com/search?q=${encodeURIComponent(name + ' winnipeg restaurant')}`;
  }
  // Not used for music anymore
  return '#';
}

function getSpotifyUrl(name) {
  return `https://open.spotify.com/search/${encodeURIComponent(name)}`;
}

function getYouTubeUrl(name) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(name + ' band')}`;
}

function getEmojis(pref) {
  if (pref === 'groom') return '♌️';
  if (pref === 'bride') return '♍️';
  if (pref === 'couple') return '♌️♍️';
  return null;
}

const brideBio = `Brianna is a creative soul with a love for art, literature, and all things sparkly. She brings warmth, laughter, and a touch of magic to every room. Her favorite things include brunch, books, and exploring new places.`;
const groomBio = `Conor is a curious mind with a passion for music, technology, and adventure. He's always up for a challenge and loves neon lights, sci-fi, and a good cup of coffee. He brings energy and fun to every day.`;
const familyBio = `Family means everything to us. We are grateful for the love, support, and laughter our families bring into our lives. This celebration is as much about our families coming together as it is about us.`;

const SpotifyIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{verticalAlign: 'middle', marginLeft: 4, marginRight: 2}} xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#1DB954"/>
    <path d="M17.6 16.2c-.2 0-.3 0-.5-.1-3.2-2-7.2-2.4-9.5-1.4-.4.2-.9 0-1.1-.4-.2-.4 0-.9.4-1.1 2.7-1.2 7.2-.8 10.8 1.5.4.2.5.7.3 1.1-.2.3-.5.4-.8.4zm1.2-2.6c-.2 0-.4-.1-.6-.2-3.7-2.3-9.3-3-12.7-1.7-.5.2-1.1 0-1.3-.5-.2-.5 0-1.1.5-1.3 3.9-1.5 10.1-.7 14.3 2 .5.3.6.9.3 1.3-.2.3-.5.4-.8.4zm1.3-2.7c-4.3-2.6-11.4-2.8-15.2-1.6-.6.2-1.2-.1-1.4-.7-.2-.6.1-1.2.7-1.4 4.3-1.3 12.1-1.1 17 1.8.6.3.8 1 .5 1.5-.2.3-.5.5-.8.5z" fill="#fff"/>
  </svg>
);

const YouTubeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{verticalAlign: 'middle', marginLeft: 4, marginRight: 2}} xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="5" fill="#FF0000"/>
    <polygon points="10,8 16,12 10,16" fill="#fff"/>
  </svg>
);

export default function CouplePage() {
  const [activeTab, setActiveTab] = useState('movies');
  const [activeBio, setActiveBio] = useState('family');

  const PreferenceItem = ({ item, category }) => {
    const emojis = getEmojis(item.preference);
    if (category === 'music') {
      return (
        <div className={`preference-item ${item.preference}`} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4}}>
          <span className="preference-title">
            {item.name} {emojis}
          </span>
          <span className="preference-desc">{item.description}</span>
          <div style={{display: 'flex', gap: 8, marginTop: 4}}>
            <a
              href={getSpotifyUrl(item.name)}
              target="_blank"
              rel="noopener noreferrer"
              title={`Search for ${item.name} on Spotify`}
              style={{display: 'flex', alignItems: 'center'}}>
              <SpotifyIcon /> <span style={{fontSize: '0.95em'}}>Spotify</span>
            </a>
            <a
              href={getYouTubeUrl(item.name)}
              target="_blank"
              rel="noopener noreferrer"
              title={`Search for ${item.name} on YouTube`}
              style={{display: 'flex', alignItems: 'center'}}>
              <YouTubeIcon /> <span style={{fontSize: '0.95em'}}>YouTube</span>
            </a>
          </div>
        </div>
      );
    }
    const url = getSearchUrl(category, item.name);
    return (
      <a
        className={`preference-item ${item.preference}`}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        title={`Search for ${item.name}`}
        style={{display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none'}}
      >
        <span className="preference-title">
          {item.name} {emojis}
        </span>
        <span className="preference-desc">{item.description}</span>
      </a>
    );
  };

  const PreferenceSection = ({ title, items, category }) => (
    <div className="preference-section">
      <h3>{title}</h3>
      <div className="preference-grid">
        {items.map((item, index) => (
          <PreferenceItem key={index} item={item} category={category} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="page-transition">
      <main className="couple-main">
        <h2>Meet the Couple</h2>
        <div className="bio-tabs" style={{display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem'}}>
          <button
            className={`tab-button ${activeBio === 'bride' ? 'active' : ''}`}
            onClick={() => setActiveBio('bride')}
          >
            Brianna
          </button>
          <button
            className={`tab-button ${activeBio === 'family' ? 'active' : ''}`}
            onClick={() => setActiveBio('family')}
          >
            Family
          </button>
          <button
            className={`tab-button ${activeBio === 'groom' ? 'active' : ''}`}
            onClick={() => setActiveBio('groom')}
          >
            Conor
          </button>
        </div>
        <div className="bio-content" style={{textAlign: 'center', marginBottom: '2rem', fontSize: '1.1em'}}>
          {activeBio === 'bride' && brideBio}
          {activeBio === 'groom' && groomBio}
          {activeBio === 'family' && familyBio}
        </div>
        <div className="preference-tabs">
          <button 
            className={`tab-button ${activeTab === 'music' ? 'active' : ''}`}
            onClick={() => setActiveTab('music')}
          >
            Music
          </button>
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
        </div>
        <div className="preference-content">
          {activeTab === 'music' && <PreferenceSection title="Music We Listen To" items={preferences.music} category="music" />}
          {activeTab === 'movies' && <PreferenceSection title="Movies We Love" items={preferences.movies} category="movies" />}
          {activeTab === 'shows' && <PreferenceSection title="Shows We Binge" items={preferences.shows} category="shows" />}
          {activeTab === 'restaurants' && <PreferenceSection title="Our Favorite Restaurants" items={preferences.restaurants} category="restaurants" />}
          {activeTab === 'creatives' && <PreferenceSection title="Creatives We Admire" items={preferences.creatives} category="creatives" />}
        </div>
      </main>
    </div>
  );
} 