'use client';

import React from 'react';

function getEmojis(pref : string) {
  if (pref === 'groom') return '♌️';
  if (pref === 'bride') return '♍️';
  if (pref === 'couple') return '♌️♍️';
  return null;
}

export default function RestaurantGrid({ restaurants }: { restaurants: Array<{name: string, preference: string, description: string}> }) {
  // Sort alphabetically by name
  const sorted = [...restaurants].sort((a, b) => a.name.localeCompare(b.name));
  return (
    <div className="preference-section">
      <h3>Our Favorite Restaurants</h3>
      <div className="preference-grid">
        {sorted.map((item, index) => (
          <a
            className={`preference-item ${item.preference}`}
            href={`https://www.google.com/search?q=${encodeURIComponent(item.name + ' winnipeg restaurant')}`}
            target="_blank"
            rel="noopener noreferrer"
            title={`Search for ${item.name}`}
            style={{display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none'}}
            key={index}
          >
            <span className="preference-title">{item.name} {getEmojis(item.preference)}</span>
            <span className="preference-desc">{item.description}</span>
          </a>
        ))}
      </div>
    </div>
  );
} 