import { useState, useEffect } from 'react';
import './AdminDashboard.css';

function AdminDashboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({ totalEntries: 0 });

  useEffect(() => {
    fetchWaitlist();
    fetchStats();
  }, []);

  const fetchWaitlist = async () => {
    try {
      const response = await fetch('/api/get-waitlist');
      const data = await response.json();

      if (response.ok) {
        setEntries(data.data);
      } else {
        setError(data.error || 'Failed to fetch waitlist');
      }
    } catch (err) {
      setError('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/get-stats');
      const data = await response.json();

      if (response.ok) {
        setStats(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to remove this entry?')) {
      return;
    }

    try {
      const response = await fetch(`/api/delete-entry?id=${id}`, {
        method: 'DELETE'
      });

      const data = await response.json();

      if (response.ok) {
        // Refresh the list
        fetchWaitlist();
        fetchStats();
      } else {
        alert(data.error || 'Failed to delete entry');
      }
    } catch (err) {
      alert('Network error. Please try again later.');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-dashboard">
        <div className="error-message">{error}</div>
        <button onClick={fetchWaitlist} className="retry-btn">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h2>Waitlist Dashboard</h2>
        <button onClick={fetchWaitlist} className="refresh-btn">
          Refresh
        </button>
      </div>

      <div className="stats-card">
        <div className="stat">
          <span className="stat-label">Total Entries</span>
          <span className="stat-value">{stats.totalEntries}</span>
        </div>
      </div>

      {entries.length === 0 ? (
        <div className="empty-state">
          <p>No entries yet. Be the first to join!</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="waitlist-table">
            <thead>
              <tr>
                <th>Position</th>
                <th>Name</th>
                <th>Email</th>
                <th>Joined Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id}>
                  <td className="position-cell">#{entry.position}</td>
                  <td>{entry.name}</td>
                  <td>{entry.email}</td>
                  <td className="date-cell">{formatDate(entry.created_at)}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="delete-btn"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
