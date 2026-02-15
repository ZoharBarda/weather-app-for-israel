import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import History from './components/History'
import About from './components/About'

function App() {
  return (
    <div className="app-container">
      <nav className="navbar navbar-expand-lg sticky-top navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            🌤️ מזג אוויר בישראל
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">בית</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/history">היסטוריה</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">אודות</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>

      <footer className="footer text-center py-4 mt-5 bg-light text-dark">
        <p>© 2026 מזג אוויר בישראל. כל הזכויות שמורות.</p>
      </footer>
    </div>
  )
}

export default App