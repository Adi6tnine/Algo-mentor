import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { 
  LayoutDashboard, Code2, TrendingUp, Settings, LogOut, Search, Bell, 
  ChevronRight, Menu, Loader2, CheckCircle2, Zap, BarChart3, Clock, Award 
} from 'lucide-react';
import AnalyticsDashboard from './components/AnalyticsDashboard';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/v1';

// Configure axios interceptors
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Helper Components
const StatCard = ({ title, value, icon: Icon, color, trend, subtitle }) => (
  <div className="stat-card">
    <div className="stat-card-content">
      <div>
        <p className="stat-title">{title}</p>
        <h3 className="stat-value">{value}</h3>
        {trend ? (
          <p className={`stat-trend ${trend > 0 ? 'positive' : 'negative'}`}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% <span>vs last week</span>
          </p>
        ) : subtitle && (
          <p className="stat-subtitle">{subtitle}</p>
        )}
      </div>
      <div className={`stat-icon ${color}`}>
        <Icon size={20} />
      </div>
    </div>
  </div>
);

const PlatformBadge = ({ platform }) => (
  <span className={`platform-badge ${platform.toLowerCase()}`}>
    {platform}
  </span>
);

const DifficultyBadge = ({ level }) => (
  <div className="difficulty-badge">
    <div className={`difficulty-dot ${level.toLowerCase()}`} />
    <span>{level}</span>
  </div>
);

function App({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [problems, setProblems] = useState([]);
  const [fetchingData, setFetchingData] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  useEffect(() => {
    loadStudents();
    loadStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedStudent) {
      loadProblems(selectedStudent.id);
    }
  }, [selectedStudent]);

  const loadStudents = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/students/me`);
      if (!selectedStudent) {
        setSelectedStudent(response.data);
      }
    } catch (error) {
      console.error('Error loading student data:', error);
    }
  };

  const loadProblems = async (studentId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/students/${studentId}/problems`);
      setProblems(response.data);
    } catch (error) {
      console.error('Error loading problems:', error);
    }
  };

  const loadStats = async () => {
    try {
      await axios.get(`${API_BASE_URL}/stats`);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleSyncData = async () => {
    if (!selectedStudent) return;
    
    setFetchingData(true);
    try {
      await axios.post(`${API_BASE_URL}/progress/sync-all/${selectedStudent.id}`, {}, {
        timeout: 60000
      });
      await loadStudents();
      await loadProblems(selectedStudent.id);
      await loadStats();
      alert('Successfully synced progress!');
    } catch (error) {
      alert('Error syncing data: ' + (error.response?.data?.message || error.message));
    } finally {
      setFetchingData(false);
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'problems', label: 'My Problems', icon: Code2 },
    { id: 'analytics', label: 'My Growth', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const filteredProblems = problems.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.platform.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const recentProblems = [...problems]
    .sort((a, b) => new Date(b.solvedAt) - new Date(a.solvedAt))
    .slice(0, 4);

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-content">
          <div className="sidebar-header">
            <div className="logo-icon">
              <Code2 size={24} />
            </div>
            <h2 className="logo-text">ALGOMENTOR</h2>
          </div>

          <nav className="sidebar-nav">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }}
                className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              >
                <item.icon size={20} />
                {item.label}
                {activeTab === item.id && <ChevronRight size={16} className="nav-arrow" />}
              </button>
            ))}
          </nav>

          <div className="sidebar-footer">
            <button className="logout-btn" onClick={onLogout}>
              <LogOut size={20} />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="top-header">
          <button className="menu-btn" onClick={() => setIsSidebarOpen(true)}>
            <Menu />
          </button>
          
          <div className="session-badge">
            <span className="session-dot" />
            STUDENT SESSION
          </div>

          <div className="header-actions">
            <button onClick={() => setDarkMode(!darkMode)} className="theme-toggle">
              {darkMode ? '☀️' : '🌙'}
            </button>
            <Bell className="icon-btn" size={20} />
            <div className="user-avatar">
              {selectedStudent?.name?.charAt(0) || 'S'}
            </div>
          </div>
        </header>

        <div className="content-area">
          {activeTab === 'dashboard' && (
            <div className="dashboard-view">
              <header className="page-header">
                <h1>Student Dashboard</h1>
                <p>Welcome back! Tracking your progress from HackerRank & LeetCode.</p>
              </header>

              <div className="stats-grid">
                <StatCard 
                  title="Total Solved" 
                  value={selectedStudent?.leetCodeTotal || 0} 
                  icon={CheckCircle2} 
                  color="indigo" 
                  trend={12} 
                />
                <StatCard 
                  title="Current Streak" 
                  value="15 Days" 
                  icon={Zap} 
                  color="amber" 
                  trend={5} 
                />
                <StatCard 
                  title="Easy Problems" 
                  value={selectedStudent?.leetCodeEasy || 0} 
                  icon={Award} 
                  color="emerald" 
                />
                <StatCard 
                  title="Hard Problems" 
                  value={selectedStudent?.leetCodeHard || 0} 
                  icon={Clock} 
                  color="rose" 
                />
              </div>

              <div className="dashboard-grid">
                <div className="activity-card">
                  <h3 className="card-title">
                    <BarChart3 size={18} className="title-icon" />
                    Solving Activity
                  </h3>
                  <div className="activity-chart">
                    {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                      <div key={i} className="activity-bar-wrapper">
                        <div style={{ height: `${h}%` }} className="activity-bar" />
                        <p className="activity-label">
                          {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="recent-card">
                  <h3 className="card-title">
                    <Clock size={18} className="title-icon" />
                    Recent Submissions
                  </h3>
                  <div className="recent-list">
                    {recentProblems.map(prob => (
                      <div key={prob.id} className="recent-item">
                        <div>
                          <p className="recent-title">{prob.title}</p>
                          <div className="recent-badges">
                            <PlatformBadge platform={prob.platform} />
                            <DifficultyBadge level={prob.difficulty} />
                          </div>
                        </div>
                        <p className="recent-time">
                          {new Date(prob.solvedAt).toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'problems' && (
            <div className="problems-view">
              <div className="problems-header">
                <div>
                  <h1>Problem Repository</h1>
                  <p>Managing {problems.length} solved problems.</p>
                </div>
                <div className="problems-actions">
                  <div className="search-box">
                    <Search size={16} />
                    <input
                      type="text"
                      placeholder="Search problems..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <button 
                    onClick={handleSyncData}
                    disabled={fetchingData}
                    className="sync-btn"
                  >
                    {fetchingData ? <Loader2 size={16} className="spin" /> : <Code2 size={16} />}
                    {fetchingData ? 'Syncing...' : 'Sync Now'}
                  </button>
                </div>
              </div>

              <div className="problems-table-card">
                <table className="problems-table">
                  <thead>
                    <tr>
                      <th>Problem</th>
                      <th>Platform</th>
                      <th>Difficulty</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProblems.map(p => (
                      <tr key={p.id}>
                        <td className="problem-title-cell">{p.title}</td>
                        <td><PlatformBadge platform={p.platform} /></td>
                        <td><DifficultyBadge level={p.difficulty} /></td>
                        <td className="status-cell">
                          <CheckCircle2 size={14} /> Solved
                        </td>
                        <td className="date-cell">
                          {new Date(p.solvedAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                    {filteredProblems.length === 0 && (
                      <tr>
                        <td colSpan="5" className="empty-cell">
                          No problems found matching "{searchQuery}"
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="analytics-view">
              <header className="page-header">
                <h1>My Growth</h1>
                <p>Track your progress and improvement over time</p>
              </header>
              <AnalyticsDashboard problems={problems} studentData={selectedStudent} />
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="settings-view">
              <div className="settings-card">
                <h2>User Settings</h2>
                <div className="settings-list">
                  <div className="setting-item">
                    <p className="setting-label">Account Type</p>
                    <p className="setting-value">Undergraduate Student</p>
                  </div>
                  <div className="setting-item">
                    <p className="setting-label">Registered Batch</p>
                    <p className="setting-value">{selectedStudent?.section || '24BCS'} - Computer Science</p>
                  </div>
                  <div className="setting-item">
                    <p className="setting-label">LeetCode Profile</p>
                    <p className="setting-value">{selectedStudent?.leetcodeProfile || 'Not configured'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <footer className="app-footer">
          ALGOMENTOR V2.4 • CONNECTED TO SPRING BOOT PROD • DB: POSTGRESQL
        </footer>
      </main>
    </div>
  );
}

export default App;
