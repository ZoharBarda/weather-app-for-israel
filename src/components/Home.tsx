import { useState, useEffect } from 'react'
import '../styles/Home.css'

interface Settlement {
  name: string // Hebrew name for display
  englishName: string // English name for API
}

interface WeatherData {
  country: string
  city: string
  temperature: number
  condition: string
  wind_speed: number
  icon: string
}

function Home() {
  const [settlements, setSettlements] = useState<Settlement[]>([])
  const [selectedSettlement, setSelectedSettlement] = useState<string>('')
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')

  // Function to get emoji based on weather condition
  const getWeatherEmoji = (condition: string): string => {
    const lowerCondition = condition.toLowerCase()

    if (lowerCondition.includes('sunny') || lowerCondition.includes('clear')) return '☀️'
    if (lowerCondition.includes('cloud')) return '☁️'
    if (lowerCondition.includes('rain') || lowerCondition.includes('drizzle')) return '🌧️'
    if (lowerCondition.includes('thunder') || lowerCondition.includes('storm')) return '⛈️'
    if (lowerCondition.includes('snow')) return '❄️'
    if (lowerCondition.includes('fog') || lowerCondition.includes('mist')) return '🌫️'
    if (lowerCondition.includes('wind')) return '💨'
    if (lowerCondition.includes('hail')) return '🌨️'
    if (lowerCondition.includes('overcast')) return '🌥️'
    if (lowerCondition.includes('partly')) return '⛅'
    if (lowerCondition.includes('night')) return '🌙'

    return '🌤️' // default
  }

  // Fallback list of popular Israeli settlements
  const fallbackSettlements: Settlement[] = [
    { name: 'תל אביב', englishName: 'Tel Aviv' },
    { name: 'ירושלים', englishName: 'Jerusalem' },
    { name: 'חיפה', englishName: 'Haifa' },
    { name: 'באר שבע', englishName: 'Beersheba' },
    { name: 'אשקלון', englishName: 'Ashkelon' },
    { name: 'אשדוד', englishName: 'Ashdod' },
    { name: 'פתח תקווה', englishName: 'Petah Tiqva' },
    { name: 'הוד השרון', englishName: 'Hod HaSharon' },
    { name: 'ראשון לציון', englishName: 'Rishon LeZion' },
    { name: 'נתניה', englishName: 'Netanya' },
    { name: 'קריית מוצקין', englishName: 'Kiryat Motzkin' },
    { name: 'בת ים', englishName: 'Bat Yam' },
    { name: 'בני ברק', englishName: 'Bnei Brak' },
    { name: 'רמת גן', englishName: 'Ramat Gan' },
    { name: 'גבעתיים', englishName: 'Givatayim' },
    { name: 'הרצליה', englishName: 'Herzliya' },
    { name: 'כפר סבא', englishName: 'Kfar Saba' },
    { name: 'רעננה', englishName: 'Raanana' },
    { name: 'נהריה', englishName: 'Nahariya' },
    { name: 'עכו', englishName: 'Akko' },
    { name: 'טבריה', englishName: 'Tiberias' },
    { name: 'צפת', englishName: 'Safed' },
    { name: 'קרית שמונה', englishName: 'Kiryat Shmona' },
    { name: 'אילת', englishName: 'Eilat' },
  ]

  // Mapping of settlement names to alternative weather API names
  const weatherApiNameMap: { [key: string]: string } = {
    'Raanana': 'Kfar Saba',
    'Petah Tiqwa': 'Tel Aviv',
    'Hod HaSharon': 'Tel Aviv',
    'Rishon LeZion': 'Tel Aviv',
    'Givatayim': 'Tel Aviv',
    'Ramat Gan': 'Tel Aviv',
    'Bat Yam': 'Tel Aviv',
    'Bnei Brak': 'Tel Aviv',
    'Kfar Saba': 'Raanana',
    'Herzliya': 'Tel Aviv',
    'Kiryat Motzkin': 'Haifa',
    'Kiryat Shmona': 'Safed',
  }

  const getWeatherApiName = (settlementName: string): string => {
    return weatherApiNameMap[settlementName] || settlementName
  }

  // Fetch settlements from API
  useEffect(() => {
    const fetchSettlements = async () => {
      try {
        const response = await fetch(
          'https://data.gov.il/api/3/action/datastore_search?resource_id=8f714b6f-c35c-4b40-a0e7-547b675eee0e&limit=10000'
        )
        const data = await response.json()
        
        if (!data.result || !data.result.records || data.result.records.length === 0) {
          throw new Error('No data returned')
        }

        const records = data.result.records

        // Extract unique settlements with Hebrew and English names
        const settlementMap = new Map<string, string>()

        records.forEach((record: any) => {
          // Try different possible field names
          let hebrewName = record['שם יישוב'] || record['כ שם יישוב'] || record.כ_שם_יישוב || ''
          let englishName = record['שם_יישוב_אנגלית'] || record['שם יישוב אנגלית'] || record['English Name'] || ''

          // Fallback: check all keys
          if (!hebrewName) {
            Object.keys(record).forEach(key => {
              if (key.includes('שם') && (key.includes('יישוב') || key.includes('עיר')) && !hebrewName) {
                hebrewName = record[key]
              }
            })
          }

          if (!englishName) {
            Object.keys(record).forEach(key => {
              if (key.toLowerCase().includes('english') || key.toLowerCase().includes('name')) {
                englishName = record[key]
              }
            })
          }

          if (hebrewName && englishName) {
            hebrewName = hebrewName.toString().trim()
            englishName = englishName.toString().trim()
            if (!settlementMap.has(englishName)) {
              settlementMap.set(englishName, hebrewName)
            }
          }
        })

        let settlementList = Array.from(settlementMap, ([englishName, hebrewName]) => ({
          englishName,
          name: hebrewName,
        })).sort((a, b) => a.name.localeCompare(b.name, 'he'))

        // If no settlements found, use fallback
        if (settlementList.length === 0) {
          settlementList = fallbackSettlements
        }

        setSettlements(settlementList)
      } catch (err) {
        // Use fallback list if API fails
        setSettlements(fallbackSettlements)
        console.error('Error fetching settlements, using fallback:', err)
      }
    }

    fetchSettlements()
  }, [])

  // Fetch weather when settlement is selected
  useEffect(() => {
    if (selectedSettlement && selectedSettlement.trim() !== '') {
      fetchWeather(selectedSettlement)
    } else {
      setWeather(null)
    }
  }, [selectedSettlement])

  const fetchWeather = async (settlementName: string) => {
    setLoading(true)
    setError('')
    try {
      // First try the original settlement name
      let apiName = settlementName
      let response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=387cb9f2989d482ab61154616261502&q=${apiName}`
      )

      // If it fails, try the mapped name
      if (!response.ok) {
        apiName = getWeatherApiName(settlementName)
        response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=387cb9f2989d482ab61154616261502&q=${apiName}`
        )
      }

      if (!response.ok) {
        throw new Error('לא נמצא מזג אוויר לישוב זה')
      }

      const data = await response.json()
      const weatherInfo: WeatherData = {
        country: data.location.country,
        city: data.location.name,
        temperature: data.current.temp_c,
        condition: data.current.condition.text,
        wind_speed: data.current.wind_kph,
        icon: data.current.condition.icon,
      }

      setWeather(weatherInfo)

      // Save to history
      const history = JSON.parse(localStorage.getItem('weatherHistory') || '[]')
      const timestamp = new Date().toLocaleString('he-IL')
      history.unshift({
        settlement: settlementName,
        hebrewName: settlements.find(s => s.englishName === settlementName)?.name || settlementName,
        temperature: weatherInfo.temperature,
        condition: weatherInfo.condition,
        timestamp: timestamp,
        country: weatherInfo.country,
      })

      // Keep only last 50 searches
      if (history.length > 50) {
        history.pop()
      }
      localStorage.setItem('weatherHistory', JSON.stringify(history))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'שגיאה בטעינת מזג האוויר')
      setWeather(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="home-container">
      <div className="container py-5">
        <h1 className="text-center mb-4">🌤️ בדוק את מזג האוויר בישראל</h1>

        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-lg border-0">
              <div className="card-body p-5">
                <label htmlFor="settlementSelect" className="form-label fw-bold mb-3">
                  בחר יישוב:
                </label>
                <select
                  id="settlementSelect"
                  className="form-select form-select-lg mb-4"
                  value={selectedSettlement}
                  onChange={(e) => setSelectedSettlement(e.target.value)}
                >
                  <option value="">-- בחר יישוב --</option>
                  {settlements.map((settlement) => (
                    <option key={settlement.englishName} value={settlement.englishName}>
                      {settlement.name}
                    </option>
                  ))}
                </select>

                {error && <div className="alert alert-danger">{error}</div>}

                {loading && (
                  <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">טוען...</span>
                    </div>
                  </div>
                )}

                {weather && (
                  <div className="weather-info">
                    <div className="text-center mb-4 weather-emoji-container">
                      <div className="weather-emoji">{getWeatherEmoji(weather.condition)}</div>
                      <p className="condition-text mt-3">{weather.condition}</p>
                    </div>

                    <div className="weather-details">
                      <div className="weather-row">
                        <span className="label">🌍 מדינה:</span>
                        <span className="value">{weather.country}</span>
                      </div>
                      <div className="weather-row">
                        <span className="label">🏙️ עיר:</span>
                        <span className="value">{weather.city}</span>
                      </div>
                      <div className="weather-row">
                        <span className="label">🌡️ טמפרטורה:</span>
                        <span className="value temperature">{weather.temperature.toFixed(1)}° C</span>
                      </div>
                      <div className="weather-row">
                        <span className="label">💨 מהירות רוח:</span>
                        <span className="value">{weather.wind_speed.toFixed(1)} kph</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home