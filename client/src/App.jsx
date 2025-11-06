import WaitlistForm from './components/WaitlistForm';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>Waitlist App</h1>
        <p className="subtitle">Join our exclusive waitlist</p>
      </header>

      <main className="main">
        <WaitlistForm />
      </main>

      <footer className="footer">
        <p>&copy; 2025 Waitlist App. All rights reserved.</p>
        <p className="admin-note">
          View submissions in your{' '}
          <a
            href="https://app.netlify.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Netlify Dashboard
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
