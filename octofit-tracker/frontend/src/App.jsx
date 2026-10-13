import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import logo from '../../../docs/octofitapp-small.png'
import './App.css'

const sections = [
  { path: 'activities', label: 'Activities' },
  { path: 'leaderboard', label: 'Leaderboard' },
  { path: 'teams', label: 'Teams' },
  { path: 'users', label: 'Users' },
  { path: 'workouts', label: 'Workouts' },
]

function Dashboard() {
  return (
    <section className="dashboard">
      <p className="eyebrow">Move together</p>
      <h1>Welcome to OctoFit Tracker</h1>
      <p className="lead">
        Track your activity, find your team, and celebrate every step toward a
        healthier routine.
      </p>
      <div className="row g-3 mt-3">
        {sections.map(({ path, label }) => (
          <div className="col-sm-6 col-lg-4" key={path}>
            <NavLink className="card dashboard-card h-100 text-decoration-none" to={`/${path}`}>
              <div className="card-body">
                <span className="card-kicker">Explore</span>
                <h2 className="h5 card-title mt-2">{label}</h2>
                <span className="card-link">View {label.toLowerCase()} <span aria-hidden="true">→</span></span>
              </div>
            </NavLink>
          </div>
        ))}
      </div>
    </section>
  )
}

function App() {
  return (
    <div className="app-shell">
      <header className="navbar navbar-expand-lg app-navbar">
        <div className="container">
          <NavLink className="navbar-brand d-flex align-items-center gap-2" to="/">
            <img className="brand-logo" src={logo} alt="" />
            <span>OctoFit Tracker</span>
          </NavLink>
          <nav aria-label="Main navigation" className="navbar-nav flex-row flex-wrap gap-1">
            {sections.map(({ path, label }) => (
              <NavLink
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                key={path}
                to={`/${path}`}
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="container app-main">
        <Routes>
          <Route element={<Dashboard />} path="/" />
          <Route element={<Activities />} path="/activities" />
          <Route element={<Leaderboard />} path="/leaderboard" />
          <Route element={<Teams />} path="/teams" />
          <Route element={<Users />} path="/users" />
          <Route element={<Workouts />} path="/workouts" />
          <Route element={<Dashboard />} path="*" />
        </Routes>
      </main>

      <footer className="app-footer">
        <div className="container">Small steps add up. Keep moving together.</div>
      </footer>
    </div>
  )
}

export default App
