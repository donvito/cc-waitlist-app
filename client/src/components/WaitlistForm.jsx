import { useState } from 'react';
import './WaitlistForm.css';

function WaitlistForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('/api/add-to-waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          type: 'success',
          message: `Success! You're #${data.data.position} on the waitlist.`
        });
        setPosition(data.data.position);
        setFormData({ name: '', email: '' });
      } else {
        setStatus({
          type: 'error',
          message: data.error || 'Failed to join waitlist'
        });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Network error. Please try again later.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="waitlist-form-container">
      <div className="form-card">
        <h2>Join the Waitlist</h2>
        <p className="form-description">
          Be the first to know when we launch. Enter your details below to secure your spot!
        </p>

        <form onSubmit={handleSubmit} className="waitlist-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              required
              disabled={loading}
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Joining...' : 'Join Waitlist'}
          </button>
        </form>

        {status.message && (
          <div className={`status-message ${status.type}`}>
            {status.message}
          </div>
        )}

        {position && (
          <div className="position-badge">
            <span className="position-number">#{position}</span>
            <span className="position-text">in line</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default WaitlistForm;
