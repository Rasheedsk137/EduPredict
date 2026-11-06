import React, { useState, useEffect } from 'react';
import { adminAPI } from '../api/api';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';

export default function AdminPage() {
  const [users,   setUsers]   = useState([]);
  const [stats,   setStats]   = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const toast = useToast();
  const { user: currentUser } = useAuth();

  const fetchData = async () => {
    setLoading(true);
    try {
      const [usersRes, statsRes] = await Promise.all([
        adminAPI.getUsers(),
        adminAPI.getStatistics(),
      ]);
      setUsers(usersRes.data);
      setStats(statsRes.data);
    } catch { toast.addToast('Failed to load admin data.', 'error'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user account?')) return;
    setDeleting(id);
    try {
      await adminAPI.deleteUser(id);
      toast.addToast('User deleted.', 'success');
      fetchData();
    } catch (err) {
      toast.addToast(err.response?.data?.message || 'Failed to delete user.', 'error');
    } finally { setDeleting(null); }
  };

  if (loading) return <div className="loading-center"><div className="loading-spinner dark" style={{ width: 36, height: 36, borderWidth: 4 }} /></div>;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Admin Panel</h1>
          <p>Manage users and view system statistics</p>
        </div>
      </div>

      {/* System Stats */}
      {stats && (
        <div className="stats-grid" style={{ marginBottom: 28 }}>
          {[
            { label: 'Total Users',       value: stats.totalUsers,       icon: '👤', cls: 'blue'   },
            { label: 'Total Students',    value: stats.totalStudents,    icon: '🎓', cls: 'green'  },
            { label: 'Total Predictions', value: stats.totalPredictions, icon: '📊', cls: 'yellow' },
          ].map(s => (
            <div key={s.label} className={`stat-card ${s.cls}`}>
              <div className="stat-icon">{s.icon}</div>
              <div className="stat-info">
                <h3>{s.value}</h3>
                <p>{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Category Breakdown */}
      {stats?.categoryBreakdown && (
        <div className="card" style={{ marginBottom: 24 }}>
          <h2 className="section-title">Performance Category Breakdown</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {Object.entries(stats.categoryBreakdown).map(([cat, count]) => {
              const colorMap = { Excellent: '#10b981', Good: '#4f46e5', Average: '#f59e0b', 'Needs Improvement': '#f97316', 'At Risk': '#ef4444' };
              const bgMap    = { Excellent: '#d1fae5', Good: '#ede9fe', Average: '#fef3c7', 'Needs Improvement': '#fed7aa', 'At Risk': '#fee2e2' };
              return (
                <div key={cat} style={{ background: bgMap[cat] || '#f1f5f9', border: `2px solid ${colorMap[cat] || '#94a3b8'}`, borderRadius: 12, padding: '12px 20px', minWidth: 120, textAlign: 'center' }}>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: colorMap[cat] }}>{count}</div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: colorMap[cat] }}>{cat}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="card">
        <h2 className="section-title">System Users ({users.length})</h2>
        {users.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">👤</div>
            <h3>No Users Found</h3>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u._id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#4f46e5,#06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '0.9rem', flexShrink: 0 }}>
                          {u.name?.[0]?.toUpperCase() || '?'}
                        </div>
                        <span style={{ fontWeight: 600 }}>{u.name}</span>
                        {u._id === currentUser?._id && (
                          <span className="badge badge-admin" style={{ fontSize: '0.65rem' }}>You</span>
                        )}
                      </div>
                    </td>
                    <td>{u.email}</td>
                    <td><span className={`badge badge-${u.role?.toLowerCase()}`}>{u.role}</span></td>
                    <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      {u._id !== currentUser?._id ? (
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(u._id)}
                          disabled={deleting === u._id}
                        >
                          {deleting === u._id ? '…' : 'Delete'}
                        </button>
                      ) : (
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
