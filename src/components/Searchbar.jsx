import { useState } from 'react';

// Controlled input + submit button. Calls onSearch with the trimmed city name.
function SearchBar({ onSearch, loading }) {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedCity = city.trim();
    if (trimmedCity) {
      onSearch(trimmedCity);
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-bar__input"
        placeholder="Search for a city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        aria-label="City name"
      />
      <button
        type="submit"
        className="search-bar__button"
        disabled={loading}
        aria-label="Search"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Zm10 2-5.6-5.6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </form>
  );
}

export default SearchBar;