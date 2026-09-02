// Displays the current weather details for the searched city.
function WeatherCard({ data }) {
  const { name, main, weather, wind, sys } = data;
  const condition = weather[0];
  const iconUrl = `https://openweathermap.org/img/wn/${condition.icon}@2x.png`;

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="weather-card">
      <p className="weather-card__location">
        {name}
        {sys?.country ? `, ${sys.country}` : ''}
      </p>
      <p className="weather-card__date">{today}</p>

      <div className="weather-card__main">
        <img className="weather-card__icon" src={iconUrl} alt={condition.description} />
        <span className="weather-card__temp">{Math.round(main.temp)}°</span>
      </div>

      <p className="weather-card__condition">{condition.main}</p>
      <p className="weather-card__description">{condition.description}</p>

      <div className="weather-card__stats">
        <div className="weather-card__stat">
          <span className="weather-card__stat-label">Feels like</span>
          <span className="weather-card__stat-value">{Math.round(main.feels_like)}°</span>
        </div>
        <div className="weather-card__stat">
          <span className="weather-card__stat-label">Humidity</span>
          <span className="weather-card__stat-value">{main.humidity}%</span>
        </div>
        <div className="weather-card__stat">
          <span className="weather-card__stat-label">Wind</span>
          <span className="weather-card__stat-value">{wind.speed} m/s</span>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;