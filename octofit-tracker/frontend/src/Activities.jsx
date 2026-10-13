import { useEffect, useState } from 'react';

function Activities({ apiBaseUrl }) {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/activities/`);
        if (!response.ok) {
          throw new Error('Unable to load activities');
        }

        const data = await response.json();
        setActivities(Array.isArray(data.activities) ? data.activities : []);
      } catch (loadError) {
        setError(loadError.message);
      }
    };

    fetchActivities();
  }, [apiBaseUrl]);

  return (
    <div className="container py-4">
      <h2 className="mb-3">Activities</h2>
      {error ? <div className="alert alert-danger">{error}</div> : null}
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
