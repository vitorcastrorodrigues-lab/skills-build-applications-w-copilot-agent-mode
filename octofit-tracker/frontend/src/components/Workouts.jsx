import { useEffect, useState } from 'react';
import { extractCollection } from './collection.js';

function Workouts({ apiBaseUrl }) {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function fetchWorkouts() {
      try {
        const response = await fetch(`${apiBaseUrl}/api/workouts/`, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Unable to load workouts (HTTP ${response.status}).`);
        }
        setWorkouts(extractCollection(await response.json(), 'workouts'));
      } catch (loadError) {
        if (!controller.signal.aborted) {
          setError(loadError instanceof Error ? loadError.message : 'Unable to load workouts.');
        }
      }
    }

    fetchWorkouts();
    return () => controller.abort();
  }, [apiBaseUrl]);

  return (
    <div className="container py-4">
      <h2 className="mb-3">Recommended Workouts</h2>
      {error ? <div className="alert alert-danger" role="alert">{error}</div> : null}
      {!error && workouts.length === 0 ? <p className="text-muted">No workouts found.</p> : null}
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
