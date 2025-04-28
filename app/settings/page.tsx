'use client';

import ThemeSwitcher from '../components/ThemeSwitcher';

export default function SettingsPage() {
  return (
    <main>
        <div className="settings-page">
        <h2>Settings</h2>
        <ThemeSwitcher />
        </div>
    </main>
  );
}
