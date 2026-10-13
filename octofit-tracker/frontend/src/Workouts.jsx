import { useEffect, useState } from 'react';

function Workouts({ apiBaseUrl }) {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/workouts/`);
        if (!response.ok) {
          throw new Error('Unable to load workouts');
        }

        const data = await response.json();
        setWorkouts(Array.isArray(data.workouts) ? data.workouts : []);
      } catch (loadError) {
        setError(loadError.message);
      }
    };

    fetchWorkouts();
  }, [apiBaseUrl]);

  return (
    <div className="container py-4">
      <h2 className="mb-3">Recommended Workouts</h2>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <div className="row g-3">
        {workouts.map((workout) => (
          <div className="col-md-6 col-xl-4" key={workout._id ?? workout.name}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start gap-2">
                  <h5 className="card-title mb-1">{workout.name}</h5>
                  <span className="badge text-bg-light">{workout.category}</span>
                </div>
                <p className="card-text text-muted">{workout.description}</p>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Difficulty: {workout.difficulty}</li>
                  <li className="list-group-item">Length: {workout.durationMinutes} min</li>
                  <li className="list-group-item">Focus: {workout.focusArea?.join(', ') || 'General fitness'}</li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Workouts;
