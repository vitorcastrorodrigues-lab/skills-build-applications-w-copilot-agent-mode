import { useEffect, useState } from 'react';

function Leaderboard({ apiBaseUrl }) {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/leaderboard/`);
        if (!response.ok) {
          throw new Error('Unable to load leaderboard');
        }

        const data = await response.json();
        setEntries(Array.isArray(data.leaderboard) ? data.leaderboard : []);
      } catch (loadError) {
        setError(loadError.message);
      }
    };

    fetchLeaderboard();
  }, [apiBaseUrl]);

  return (
    <div className="container py-4">
      <h2 className="mb-3">Leaderboard</h2>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <div className="list-group">
        {entries.map((entry) => (
          <div className="list-group-item d-flex justify-content-between align-items-center" key={entry._id ?? entry.rank}>
            <div>
              <div className="fw-bold">Rank #{entry.rank}</div>
              <div className="text-muted">Score: {entry.score}</div>
            </div>
            <span className="badge bg-primary rounded-pill">{entry.streak} day streak</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leaderboard;
