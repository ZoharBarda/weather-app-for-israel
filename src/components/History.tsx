import { useState, useEffect } from 'react'
import '../styles/History.css'

interface SearchRecord {
  settlement: string
  hebrewName: string
  temperature?: number
  condition?: string
  timestamp: string
  country?: string
}

function History() {
  const [history, setHistory] = useState<SearchRecord[]>([])

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('weatherHistory') || '[]')
    // Debug log
    console.log('History data:', savedHistory)
    setHistory(savedHistory)
  }, [])

  const clearHistory = () => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק את ההיסטוריה?')) {
      localStorage.removeItem('weatherHistory')
      setHistory([])
    }
  }

  return (
    <div className="history-container">
      <div className="container py-5">
        <h1 className="text-center mb-4">📋 היסטוריית חיפושים</h1>

        {history.length === 0 ? (
          <div className="text-center">
            <p className="text-muted fs-5">אין חיפושים בהיסטוריה עדיין</p>
          </div>
        ) : (
          <>
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <div className="table-responsive">
                  <table className="table table-striped table-hover">
                    <thead className="table-dark">
                      <tr>
                        <th>⏰ זמן החיפוש</th>
                        <th>🏙️ שם היישוב</th>
                        <th>🌍 שם המדינה</th>
                      </tr>
                    </thead>
                    <tbody>
                      {history.map((record, index) => (
                        <tr key={index}>
                          <td className="timestamp-cell">
                            <span className="badge bg-primary">{record.timestamp}</span>
                          </td>
                          <td className="settlement-cell fw-bold">
                            <span className="settlement-hebrew">{record.hebrewName}</span>
                            <span className="settlement-english">({record.settlement})</span>
                          </td>
                          <td className="country-cell">{record.country || 'Israel'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="text-center mt-4">
                  <button onClick={clearHistory} className="btn btn-danger">
                    🗑️ מחק היסטוריה
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default History