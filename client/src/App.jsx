import WaitlistForm from './components/WaitlistForm';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

function App() {
  return (
    <div className="app">
      <ThemeToggle />
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
        </div>

        <div className="hero-content">
          <div className="container">
            <div className="badge">🚀 Coming Soon</div>
            <h1 className="hero-title">
              Be the First to Experience
              <span className="gradient-text"> Something Amazing</span>
            </h1>
            <p className="hero-subtitle">
              Join thousands of early adopters who are getting exclusive access to our revolutionary platform.
              Don't miss out on being part of something special.
            </p>
            <div className="hero-form">
              <WaitlistForm />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Join Early?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Early Access</h3>
              <p>Be among the first to access exclusive features before the public launch.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎁</div>
              <h3>Special Perks</h3>
              <p>Unlock founding member benefits and lifetime discounts just for joining early.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💬</div>
              <h3>Direct Influence</h3>
              <p>Shape the product roadmap and get priority support from our team.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="social-proof">
        <div className="container">
          <div className="stats-grid">
            <div className="stat">
              <div className="stat-number">10,000+</div>
              <div className="stat-label">People Waiting</div>
            </div>
            <div className="stat">
              <div className="stat-number">50+</div>
              <div className="stat-label">Countries</div>
            </div>
            <div className="stat">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <h2 className="cta-title">Ready to Get Started?</h2>
          <p className="cta-subtitle">
            Join our waitlist today and be notified the moment we launch.
          </p>
          <a href="#hero" className="cta-button">Join the Waitlist</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 Waitlist App. All rights reserved.</p>
          <p className="footer-note">
            Powered by{' '}
            <a
              href="https://www.netlify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              Netlify
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
