import { NavLink, Route, Routes } from 'react-router-dom';
import Users from './Users.jsx';
import Teams from './Teams.jsx';
import Activities from './Activities.jsx';
import Leaderboard from './Leaderboard.jsx';
import Workouts from './Workouts.jsx';

const logoUrl = new URL('../../docs/octofitapp-small.png', import.meta.url).href;

const apiBaseUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

const navItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
];

function HomePage() {
  return (
    <div className="container py-4">
      <div className="card shadow-sm border-0">
        <div className="card-body p-4">
          <div className="d-flex align-items-center gap-3 mb-4">
            <img src={logoUrl} alt="OctoFit Tracker logo" width="64" height="64" />
            <div>
              <h1 className="mb-1">OctoFit Tracker</h1>
              <p className="text-muted mb-0">Fitness tracking built for healthy competition.</p>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-md-6 col-xl-3">
              <div className="card bg-primary-subtle h-100">
                <div className="card-body">
                  <h5 className="card-title">User Profiles</h5>
                  <p className="card-text">Track goals, badges, and progress across every athlete.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-xl-3">
              <div className="card bg-success-subtle h-100">
                <div className="card-body">
                  <h5 className="card-title">Team Management</h5>
                  <p className="card-text">Build squads and monitor momentum by group.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-xl-3">
              <div className="card bg-warning-subtle h-100">
                <div className="card-body">
                  <h5 className="card-title">Activity Logs</h5>
                  <p className="card-text">Measure runs, recovery sessions, and strength days.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-xl-3">
              <div className="card bg-info-subtle h-100">
                <div className="card-body">
                  <h5 className="card-title">Leaderboard</h5>
                  <p className="card-text">Create healthy competition with rank-based goals.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="container">
          <span className="navbar-brand d-flex align-items-center gap-2 mb-0">
            <img src={logoUrl} alt="OctoFit logo" width="32" height="32" />
            OctoFit
          </span>
          <div className="navbar-nav ms-auto flex-row gap-2 flex-wrap">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `nav-link px-3 rounded ${isActive ? 'bg-light text-dark' : 'text-white'}`}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<Users apiBaseUrl={apiBaseUrl} />} />
        <Route path="/teams" element={<Teams apiBaseUrl={apiBaseUrl} />} />
        <Route path="/activities" element={<Activities apiBaseUrl={apiBaseUrl} />} />
        <Route path="/leaderboard" element={<Leaderboard apiBaseUrl={apiBaseUrl} />} />
        <Route path="/workouts" element={<Workouts apiBaseUrl={apiBaseUrl} />} />
      </Routes>
    </>
  );
}

export default App;
