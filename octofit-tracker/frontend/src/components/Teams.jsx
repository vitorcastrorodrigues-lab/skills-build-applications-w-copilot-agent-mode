import { useEffect, useState } from 'react';
import { extractCollection } from './collection.js';

function Teams({ apiBaseUrl }) {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function fetchTeams() {
      try {
        const response = await fetch(`${apiBaseUrl}/api/teams/`, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Unable to load teams (HTTP ${response.status}).`);
        }
        setTeams(extractCollection(await response.json(), 'teams'));
      } catch (loadError) {
        if (!controller.signal.aborted) {
          setError(loadError instanceof Error ? loadError.message : 'Unable to load teams.');
        }
      }
    }

    fetchTeams();
    return () => controller.abort();
  }, [apiBaseUrl]);

  return (
    <div className="container py-4">
      <h2 className="mb-3">Teams</h2>
      {error ? <div className="alert alert-danger" role="alert">{error}</div> : null}
      {!error && teams.length === 0 ? <p className="text-muted">No teams found.</p> : null}
      <div className="row g-3">
        {teams.map((team) => (
          <div className="col-md-6" key={team._id ?? team.name}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{team.name}</h5>
                <p className="card-text text-muted">{team.description}</p>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Coach: {team.coach}</li>
                  <li className="list-group-item">Total Points: {team.totalPoints}</li>
                  <li className="list-group-item">Members: {team.members?.length ?? 0}</li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Teams;
