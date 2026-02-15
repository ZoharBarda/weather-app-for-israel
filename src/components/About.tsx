import '../styles/About.css'

function About() {
  return (
    <div className="about-container">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow-lg border-0 mb-4">
              <div className="card-body p-5">
                <h1 className="text-center mb-4">🌐 אודות האפליקציה</h1>

                <div className="about-section">
                  <h3 className="section-title">📱 מה הם אנחנו?</h3>
                  <p>
                    אפליקציה זו מספקת מידע בזמן אמת על מזג האוויר בכל ישוב בישראל. בעזרת ממשקים API מתקדמים, אנחנו 
                    מביאים לכם את הנתונים העדכניים ביותר מיד.
                  </p>
                </div>

                <div className="about-section">
                  <h3 className="section-title">✨ התכונות שלנו</h3>
                  <ul className="feature-list">
                    <li>🔍 בחר כל יישוב בישראל וראה את מזג האוויר שלו תיכף ומיד</li>
                    <li>📊 צפה בטמפרטורה, מהירות רוח, תנאים ועוד</li>
                    <li>📈 עקוב אחר היסטוריית חיפושיך</li>
                    <li>🎨 ממשק משתמש יפה וקל לשימוש</li>
                    <li>📱 עובדת בכל מכשיר - טלפון, טאבלט או מחשב</li>
                  </ul>
                </div>

                <div className="about-section">
                  <h3 className="section-title">🛠️ הטכנולוגיות שלנו</h3>
                  <p>
                    האפליקציה בנויה בעזרת:
                  </p>
                  <ul className="tech-list">
                    <li><strong>React 19</strong> - ספריית ממשקים אתרת מודרנית</li>
                    <li><strong>Vite</strong> - כלי בנייה מהיר וחזק</li>
                    <li><strong>TypeScript</strong> - שפה טיפוסים חזקה</li>
                    <li><strong>Bootstrap 5</strong> - ספריית CSS לעצוב יפה</li>
                    <li><strong>Weather API</strong> - API למזג אוויר עדכנית</li>
                    <li><strong>Data.gov.il API</strong> - בסיס הנתונים של היישובים בישראל</li>
                  </ul>
                </div>

                <div className="about-section">
                  <h3 className="section-title">👨‍💻 פיתוח</h3>
                  <div className="developer-card">
                    <div className="developer-avatar">🎓</div>
                    <div className="developer-info">
                      <h4>Zohar Barda</h4>
                      <p className="text-muted">23 years old</p>
                      <p className="text-muted">Student at John Bryce Academy</p>
                    </div>
                  </div>
                </div>

                <div className="about-section">
                  <h3 className="section-title">📝 הערות משפטיות</h3>
                  <p className="text-muted">
                    הנתונים מסופקים על ידי:
                  </p>
                  <ul className="legal-list">
                    <li>📊 רשות מידע, מידע ממשלתי חינוכי בקוד פתוח</li>
                    <li>⛅ Weather API - לנתונים מטאורולוגיים בזמן אמת</li>
                  </ul>
                </div>

                <div className="text-center mt-5">
                  <p className="text-muted">❤️ נעשה באהבה ובתשוקה</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About