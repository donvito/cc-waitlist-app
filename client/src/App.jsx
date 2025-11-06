import { useState } from 'react';
import WaitlistForm from './components/WaitlistForm';
import AdminDashboard from './components/AdminDashboard';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('join');

  return (
    <div className="app">
      <header className="header">
        <h1>Waitlist App</h1>
        <p className="subtitle">Join our exclusive waitlist</p>
      </header>

      <nav className="tabs">
        <button
          className={`tab ${activeTab === 'join' ? 'active' : ''}`}
          onClick={() => setActiveTab('join')}
        >
          Join Waitlist
        </button>
        <button
          className={`tab ${activeTab === 'admin' ? 'active' : ''}`}
          onClick={() => setActiveTab('admin')}
        >
          Admin Dashboard
        </button>
      </nav>

      <main className="main">
        {activeTab === 'join' ? <WaitlistForm /> : <AdminDashboard />}
      </main>

      <footer className="footer">
        <p>&copy; 2025 Waitlist App. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
