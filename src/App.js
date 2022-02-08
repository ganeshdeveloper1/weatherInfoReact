import React, { useState } from 'react'

const App = () => {
  const api = {
    key: 'e19dd240cf5af57d904ad0566866ab87',
    base: 'https://api.openweathermap.org/data/2.5/',
  }

  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})

  const search = () => {
    // if (event.key === 'Enter') {
    fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result)
        setQuery('')
      })
    // }
  }

  const dateBuilder = (d) => {
    let months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    let days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ]

    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()
    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div
      className={
        typeof weather.main != 'undefined'
          ? weather.main.temp > 16
            ? 'warm'
            : 'app'
          : 'homeBgImg'
      }
    >
      <main>
        <div className='search-box'>
          <div className='input-field'>
            <input
              className='search-bar'
              type='text'
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              placeholder='Enter City Name'
            />
          </div>
          <div className='btn'>
            <button onClick={search}>Search</button>
          </div>
        </div>
        {typeof weather.name != 'undefined' ? (
          <div className='weather-data'>
            <div className='location-box'>
              <div className='location'>
                {weather.name},{weather.sys.country}
              </div>
              <div className='date'>{dateBuilder(new Date())}</div>
            </div>
            <div className='weather-box'>
              <div className='temp'>{Math.round(weather.main.temp)}°c</div>
              <div className='weather'>{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          ''
        )}
      </main>
    </div>
  )
}

export default App
