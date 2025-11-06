import { useState } from 'react';
import './WaitlistForm.css';

function WaitlistForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

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
      // Create FormData object from the form
      const myForm = e.target;
      const formDataObj = new FormData(myForm);

      // Submit to Netlify Forms using URL-encoded format
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formDataObj).toString(),
        redirect: 'manual' // Don't follow redirects automatically
      });

      // Netlify Forms returns 200 or redirects on success
      if (response.ok || response.type === 'opaqueredirect' || response.status === 0) {
        setStatus({
          type: 'success',
          message: 'Success! You\'re now on the waitlist. We\'ll be in touch soon!'
        });
        setFormData({ name: '', email: '' });
      } else {
        console.error('Form submission failed:', response.status, response.statusText);
        setStatus({
          type: 'error',
          message: 'Failed to join waitlist. Please try again.'
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
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

        <form
          name="waitlist"
          method="POST"
          onSubmit={handleSubmit}
          className="waitlist-form"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
        >
          <input type="hidden" name="form-name" value="waitlist" />
          {/* Honeypot field for spam protection - hidden from users */}
          <p style={{ display: 'none' }}>
            <label>
              Don't fill this out if you're human: <input name="bot-field" />
            </label>
          </p>

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
      </div>
    </div>
  );
}

export default WaitlistForm;
