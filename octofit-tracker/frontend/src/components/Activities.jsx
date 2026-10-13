import { useEffect, useState } from 'react';
import { extractCollection } from './collection.js';

function Activities({ apiBaseUrl }) {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function fetchActivities() {
      try {
        const response = await fetch(`${apiBaseUrl}/api/activities/`, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Unable to load activities (HTTP ${response.status}).`);
        }
        setActivities(extractCollection(await response.json(), 'activities'));
      } catch (loadError) {
        if (!controller.signal.aborted) {
          setError(loadError instanceof Error ? loadError.message : 'Unable to load activities.');
        }
      }
    }

    fetchActivities();
    return () => controller.abort();
  }, [apiBaseUrl]);

  return (
    <div className="container py-4">
      <h2 className="mb-3">Activities</h2>
      {error ? <div className="alert alert-danger" role="alert">{error}</div> : null}
      {!error && activities.length === 0 ? <p className="text-muted">No activities found.</p> : null}
      <div className="table-responsive">
        <table className="table table-bordered align-middle">
          <thead>
            <tr>
              <th>Type</th>
              <th>Description</th>
              <th>Minutes</th>
              <th>Distance</th>
              <th>Calories</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity._id ?? activity.description}>
                <td>{activity.type}</td>
                <td>{activity.description}</td>
                <td>{activity.durationMinutes}</td>
                <td>{activity.distanceKm ?? 0} km</td>
                <td>{activity.caloriesBurned ?? 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Activities;
