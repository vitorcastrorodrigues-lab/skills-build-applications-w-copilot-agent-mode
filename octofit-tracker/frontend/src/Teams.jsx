import { useEffect, useState } from 'react';

function Teams({ apiBaseUrl }) {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/teams/`);
        if (!response.ok) {
          throw new Error('Unable to load teams');
        }

        const data = await response.json();
        setTeams(Array.isArray(data.teams) ? data.teams : []);
      } catch (loadError) {
        setError(loadError.message);
      }
    };

    fetchTeams();
  }, [apiBaseUrl]);

  return (
    <div className="container py-4">
      <h2 className="mb-3">Teams</h2>
      {error ? <div className="alert alert-danger">{error}</div> : null}
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
