import { useEffect, useState } from 'react';
import { extractCollection } from './collection.js';

function Users({ apiBaseUrl }) {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function fetchUsers() {
      try {
        const response = await fetch(`${apiBaseUrl}/api/users/`, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Unable to load users (HTTP ${response.status}).`);
        }
        setUsers(extractCollection(await response.json(), 'users'));
      } catch (loadError) {
        if (!controller.signal.aborted) {
          setError(loadError instanceof Error ? loadError.message : 'Unable to load users.');
        }
      }
    }

    fetchUsers();
    return () => controller.abort();
  }, [apiBaseUrl]);

  return (
    <div className="container py-4">
      <h2 className="mb-3">Users</h2>
      {error ? <div className="alert alert-danger" role="alert">{error}</div> : null}
      {!error && users.length === 0 ? <p className="text-muted">No users found.</p> : null}
      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Fitness Level</th>
              <th>Total Points</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id ?? user.email}>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.fitnessLevel}</td>
                <td>{user.totalPoints}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
