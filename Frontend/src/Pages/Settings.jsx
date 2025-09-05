// File: src/pages/Settings.jsx

import React, { useEffect, useState } from 'react';

export default function Settings() {
  const [config, setConfig] = useState({
    frequency: 'daily',
    time: '02:00',
    timezone: 'Asia/Kolkata'
  });

  // Load existing cron configuration
 useEffect(() => {
  fetch('http://localhost:5000/api/cron-config')
    .then(res => {
      if (!res.ok) throw new Error('Failed to load settings');
      return res.json();
    })
    .then(data => {
      if (data) {
        setConfig(data);
      } else {
        // fallback if no config exists in DB
        setConfig({
          frequency: 'daily',
          time: '02:00',
          timezone: 'Asia/Kolkata'
        });
      }
    })
    .catch(err => {
      console.error(err);
      alert('Could not load sync settings.');
    });
}, []);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfig(prev => ({ ...prev, [name]: value }));
  };

  // Save updated configuration
  const handleSave = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/cron-config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      });
      if (!res.ok) throw new Error('Save failed');
      alert('Settings saved successfully.');
    } catch (err) {
      console.error(err);
      alert('Failed to save settings.');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Sync Configuration</h1>

      <div className="bg-white dark:bg-black p-6 rounded-lg shadow-lg border border-gray-200 dark:border-green-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Frequency */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">Frequency</label>
            <select
              name="frequency"
              value={config.frequency}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-green-600 px-3 py-2 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-green-500"
            >
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>

          {/* Time */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">Time (HH:MM)</label>
            <input
              name="time"
              type="time"
              value={config.time}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-green-600 px-3 py-2 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-green-500"
            />
          </div>

          {/* Timezone */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">Timezone</label>
            <input
              name="timezone"
              value={config.timezone}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-green-600 px-3 py-2 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-green-500"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          className="mt-6 bg-blue-600 dark:bg-green-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 dark:hover:bg-green-700 transition-colors focus:ring-2 focus:ring-blue-500 dark:focus:ring-green-500"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}
