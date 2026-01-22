'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [health, setHealth] = useState('unknown');
  const [dbStatus, setDbStatus] = useState('unknown');

  const [users, setUsers] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');

  const [appInfo, setAppInfo] = useState<any>(null);
  const [showAppInfo, setShowAppInfo] = useState(false);

  /* -------- SYSTEM -------- */
  const loadHealth = async () => {
    try {
      const res = await fetch('/core/health');
      setHealth(res.ok ? 'Healthy' : 'Down');
    } catch {
      setHealth('Down');
    }
  };

  const loadDbStatus = async () => {
    try {
      const res = await fetch('/core/db-status');
      const data = await res.json();
      setDbStatus(data.database);
    } catch {
      setDbStatus('disconnected');
    }
  };

  /* -------- USERS -------- */
  const loadUsers = async () => {
    const res = await fetch('/api/v1/users');
    setUsers(await res.json());
  };

  const addUser = async () => {
    if (!name) return;
    await fetch('/api/v1/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    setName('');
    loadUsers();
  };

  const startEdit = (user: any) => {
    setEditingId(user._id);
    setEditingName(user.name);
  };

  const updateUser = async () => {
    await fetch(`/api/v1/users/${editingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: editingName }),
    });
    setEditingId(null);
    setEditingName('');
    loadUsers();
  };

  const deleteUser = async (id: string) => {
    await fetch(`/api/v1/users/${id}`, { method: 'DELETE' });
    loadUsers();
  };

  /* -------- OPS -------- */
  const toggleAppInfo = async () => {
    if (!showAppInfo) {
      const res = await fetch('/ops/info');
      setAppInfo(await res.json());
    }
    setShowAppInfo(!showAppInfo);
  };

  useEffect(() => {
    loadHealth();
    loadDbStatus();
    loadUsers();
  }, []);

  return (
    <main className="min-h-screen bg-gray-300 flex items-center justify-center">
      <div className="w-full max-w-lg bg-gray-500 rounded-xl shadow-lg p-8 space-y-6">
        <h1 className="text-2xl font-semibold text-center">CloudOps Platform</h1>

        <section className="flex flex-col items-center">
          <p>Backend: {health}</p>
          <p>Database: {dbStatus}</p>
        </section>

        <section>
          <input value={name} onChange={e => setName(e.target.value)} />
          <button onClick={addUser}>Add</button>

          {users.map(u => (
            <div key={u._id}>
              {u.name}
              <button onClick={() => deleteUser(u._id)}>Delete</button>
            </div>
          ))}
        </section>

        <section>
          <button onClick={toggleAppInfo}>App Info</button>
          {showAppInfo && <pre>{JSON.stringify(appInfo, null, 2)}</pre>}
        </section>
      </div>
    </main>
  );
}
