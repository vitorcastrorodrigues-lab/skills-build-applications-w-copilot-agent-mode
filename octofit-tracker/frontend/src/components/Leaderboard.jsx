import { useEffect, useState } from 'react';
import { extractCollection } from './collection.js';

function Leaderboard({ apiBaseUrl }) {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function fetchLeaderboard() {
      try {
        const response = await fetch(`${apiBaseUrl}/api/leaderboard/`, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Unable to load leaderboard (HTTP ${response.status}).`);
        }
        setEntries(extractCollection(await response.json(), 'leaderboard'));
      } catch (loadError) {
        if (!controller.signal.aborted) {
          setError(loadError instanceof Error ? loadError.message : 'Unable to load leaderboard.');
        }
      }
    }

    fetchLeaderboard();
    return () => controller.abort();
  }, [apiBaseUrl]);

  return (
    <div className="container py-4">
      <h2 className="mb-3">Leaderboard</h2>
      {error ? <div className="alert alert-danger" role="alert">{error}</div> : null}
      {!error && entries.length === 0 ? <p className="text-muted">No leaderboard entries found.</p> : null}
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
