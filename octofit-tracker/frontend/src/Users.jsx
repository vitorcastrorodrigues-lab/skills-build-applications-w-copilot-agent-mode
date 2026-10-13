import { useEffect, useState } from 'react';

function Users({ apiBaseUrl }) {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/users/`);
        if (!response.ok) {
          throw new Error('Unable to load users');
        }

        const data = await response.json();
        setUsers(Array.isArray(data.users) ? data.users : []);
      } catch (loadError) {
        setError(loadError.message);
      }
    };

    fetchUsers();
  }, [apiBaseUrl]);

  return (
    <div className="container py-4">
      <h2 className="mb-3">Users</h2>
      {error ? <div className="alert alert-danger">{error}</div> : null}
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
