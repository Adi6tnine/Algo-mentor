import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { 
  School, Users, BarChart3, AlertCircle, FileText, LogOut, 
  Menu, Bell, ChevronRight, LayoutDashboard, Settings, 
  Loader2, Download, RefreshCw, TrendingUp, Code2
} from 'lucide-react';

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

// Helper Components
const StatCard = ({ title, value, icon: Icon, color, subtitle }) => (
  <div className="stat-card">
    <div className="stat-card-content">
      <div>
        <p className="stat-title">{title}</p>
        <h3 className="stat-value">{value}</h3>
        {subtitle && <p className="stat-subtitle">{subtitle}</p>}
      </div>
      <div className={`stat-icon ${color}`}>
        <Icon size={20} />
      </div>
    </div>
  </div>
);

function TeacherDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState('');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  useEffect(() => {
    loadSections();
  }, []);

  useEffect(() => {
    if (selectedSection) {
      loadStudentsBySection(selectedSection);
    }
  }, [selectedSection]);

  const loadSections = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/teacher/sections`);
      setSections(Array.from(response.data).sort());
    } catch (error) {
      console.error('Error loading sections:', error);
      if (error.response?.status === 403 || error.response?.status === 401) {
        alert('Access denied. Teacher access required.');
        if (onLogout) onLogout();
      }
    }
  };

  const loadStudentsBySection = async (section) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/teacher/section/${encodeURIComponent(section)}/students`);
      setStudents(response.data);
    } catch (error) {
      console.error('Error loading students:', error);
      alert('Error loading students: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async (format) => {
    if (!selectedSection) return;
    try {
      const response = await axios.get(
        `${API_BASE_URL}/teacher/section/${encodeURIComponent(selectedSection)}/export/${format}`,
        { responseType: 'blob' }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `section_${selectedSection}_progress.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      alert(`Error exporting ${format.toUpperCase()}. Please try again.`);
    }
  };

  const handleSyncAll = async () => {
    if (!selectedSection) return;
    
    if (!window.confirm(`Sync all students in section ${selectedSection}?`)) {
      return;
    }

    setSyncing(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/teacher/section/${encodeURIComponent(selectedSection)}/sync-all`, {});
      alert(response.data.message);
      loadStudentsBySection(selectedSection);
    } catch (error) {
      alert('Error syncing: ' + (error.response?.data?.message || error.message));
    } finally {
      setSyncing(false);
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Overview', icon: School },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const avgSolved = students.length > 0 
    ? Math.round(students.reduce((acc, s) => acc + (s.leetCodeTotal || 0), 0) / students.length)
    : 0;
  
  const struggling = students.filter(s => (s.leetCodeTotal || 0) < 50);

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-content">
          <div className="sidebar-header">
            <div className="logo-icon">
              <School size={24} />
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
            TEACHER SESSION
          </div>

          <div className="header-actions">
            <button onClick={() => setDarkMode(!darkMode)} className="theme-toggle">
              {darkMode ? '☀️' : '🌙'}
            </button>
            <Bell className="icon-btn" size={20} />
            <div className="user-avatar">T</div>
          </div>
        </header>

        <div className="content-area">
          {activeTab === 'dashboard' && (
            <div className="dashboard-view">
              <header className="page-header">
                <div>
                  <h1>Instructor Overview</h1>
                  <p>Monitoring Batch: <span style={{ fontWeight: 700, color: '#6366f1' }}>24BCS</span></p>
                </div>
              </header>

              {/* Section Selector */}
              <div style={{ marginBottom: '2rem', background: 'white', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--slate-100)' }} className="dark:bg-slate-800 dark:border-slate-700">
                <h3 style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--slate-700)' }} className="dark:text-white">Select Section</h3>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  <select
                    value={selectedSection}
                    onChange={(e) => setSelectedSection(e.target.value)}
                    style={{ 
                      padding: '0.75rem 1rem', 
                      fontSize: '1rem', 
                      borderRadius: '0.75rem', 
                      border: '2px solid var(--slate-200)', 
                      minWidth: '200px',
                      background: 'white',
                      color: 'var(--slate-900)',
                      fontWeight: 600
                    }}
                  >
                    <option value="">-- Select Section --</option>
                    {sections.map(section => (
                      <option key={section} value={section}>{section}</option>
                    ))}
                  </select>
                  {selectedSection && (
                    <>
                      <button
                        onClick={handleSyncAll}
                        disabled={syncing}
                        className="sync-btn"
                      >
                        {syncing ? <Loader2 size={16} className="spin" /> : <RefreshCw size={16} />}
                        {syncing ? 'Syncing...' : 'Sync All'}
                      </button>
                      <button
                        onClick={() => handleExport('csv')}
                        style={{
                          background: 'var(--emerald-500)',
                          color: 'white',
                          padding: '0.5rem 1rem',
                          borderRadius: '0.75rem',
                          fontSize: '0.875rem',
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          border: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        <Download size={16} />
                        Export CSV
                      </button>
                      <button
                        onClick={() => handleExport('pdf')}
                        style={{
                          background: 'var(--rose-500)',
                          color: 'white',
                          padding: '0.5rem 1rem',
                          borderRadius: '0.75rem',
                          fontSize: '0.875rem',
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          border: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        <Download size={16} />
                        Export PDF
                      </button>
                    </>
                  )}
                </div>
              </div>

              {selectedSection && (
                <>
                  <div className="stats-grid">
                    <StatCard 
                      title="Total Students" 
                      value={students.length} 
                      icon={Users} 
                      color="indigo" 
                    />
                    <StatCard 
                      title="Class Avg Solved" 
                      value={avgSolved} 
                      icon={BarChart3} 
                      color="emerald" 
                      subtitle="LeetCode problems"
                    />
                    <StatCard 
                      title="Active Students" 
                      value={students.filter(s => s.leetCodeTotal > 0).length} 
                      icon={TrendingUp} 
                      color="amber" 
                      subtitle="Have solved problems"
                    />
                    <StatCard 
                      title="Struggling" 
                      value={struggling.length} 
                      icon={AlertCircle} 
                      color="rose" 
                      subtitle="Needs attention"
                    />
                  </div>

                  {/* Students Table */}
                  <div className="problems-table-card" style={{ marginTop: '2rem' }}>
                    {loading ? (
                      <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--slate-400)' }}>
                        <Loader2 size={32} className="spin" style={{ margin: '0 auto 1rem' }} />
                        <p>Loading students...</p>
                      </div>
                    ) : students.length === 0 ? (
                      <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--slate-400)' }}>
                        No students found in this section.
                      </div>
                    ) : (
                      <table className="problems-table">
                        <thead>
                          <tr>
                            <th>Roll No.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Group</th>
                            <th>Total</th>
                            <th>Easy</th>
                            <th>Medium</th>
                            <th>Hard</th>
                          </tr>
                        </thead>
                        <tbody>
                          {students.map((student) => (
                            <tr key={student.studentId}>
                              <td className="problem-title-cell">{student.rollNumber || 'N/A'}</td>
                              <td className="problem-title-cell">{student.studentName}</td>
                              <td className="date-cell">{student.email}</td>
                              <td className="date-cell">{student.group || '-'}</td>
                              <td className="problem-title-cell" style={{ color: 'var(--indigo-600)' }}>
                                {student.leetCodeTotal || 0}
                              </td>
                              <td className="date-cell">{student.leetCodeEasy || 0}</td>
                              <td className="date-cell">{student.leetCodeMedium || 0}</td>
                              <td className="date-cell">{student.leetCodeHard || 0}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </>
              )}
            </div>
          )}

          {activeTab === 'students' && (
            <div className="problems-view">
              <header className="page-header">
                <h1>Student Roster</h1>
                <p>View and manage all students</p>
              </header>
              
              {selectedSection ? (
                <div className="problems-table-card">
                  <table className="problems-table">
                    <thead>
                      <tr>
                        <th>Roll No.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>LeetCode</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((s) => (
                        <tr key={s.studentId}>
                          <td className="problem-title-cell">{s.rollNumber}</td>
                          <td className="problem-title-cell">{s.studentName}</td>
                          <td className="date-cell">{s.email}</td>
                          <td className="problem-title-cell" style={{ color: 'var(--indigo-600)' }}>
                            {s.leetCodeTotal || 0}
                          </td>
                          <td>
                            <span style={{
                              padding: '0.25rem 0.75rem',
                              borderRadius: '0.5rem',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              background: s.leetCodeTotal > 50 ? 'var(--emerald-100)' : 'var(--amber-100)',
                              color: s.leetCodeTotal > 50 ? 'var(--emerald-600)' : 'var(--amber-600)'
                            }}>
                              {s.leetCodeTotal > 50 ? 'Active' : 'Needs Attention'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div style={{ 
                  background: 'white', 
                  padding: '3rem', 
                  borderRadius: '1rem', 
                  textAlign: 'center',
                  color: 'var(--slate-400)'
                }} className="dark:bg-slate-800">
                  <Users size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                  <p>Please select a section to view students</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="settings-view">
              <div className="settings-card">
                <h2>Teacher Settings</h2>
                <div className="settings-list">
                  <div className="setting-item">
                    <p className="setting-label">Account Type</p>
                    <p className="setting-value">Faculty Instructor</p>
                  </div>
                  <div className="setting-item">
                    <p className="setting-label">Sections</p>
                    <p className="setting-value">{sections.length} sections assigned</p>
                  </div>
                  <div className="setting-item">
                    <p className="setting-label">Total Students</p>
                    <p className="setting-value">{students.length} students</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <footer className="app-footer">
          ALGOMENTOR V2.4 • TEACHER DASHBOARD • CONNECTED TO SPRING BOOT PROD
        </footer>
      </main>
    </div>
  );
}

export default TeacherDashboard;
