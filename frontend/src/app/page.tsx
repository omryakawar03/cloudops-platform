'use client';

import { useEffect, useState } from 'react';

const BACKEND =
  process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

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
      const res = await fetch(`${BACKEND}/core/health`);
      setHealth(res.ok ? 'Healthy' : 'Down');
    } catch {
      setHealth('down');
    }
  };

  const loadDbStatus = async () => {
    try {
      const res = await fetch(`${BACKEND}/core/db-status`);
      const data = await res.json();
      setDbStatus(data.database);
    } catch {
      setDbStatus('disconnected');
    }
  };

  /* -------- USERS -------- */
  const loadUsers = async () => {
    const res = await fetch(`${BACKEND}/api/v1/users`);
    setUsers(await res.json());
  };

  const addUser = async () => {
    if (!name) return;
    await fetch(`${BACKEND}/api/v1/users`, {
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
    await fetch(`${BACKEND}/api/v1/users/${editingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: editingName }),
    });
    setEditingId(null);
    setEditingName('');
    loadUsers();
  };

  const deleteUser = async (id: string) => {
    await fetch(`${BACKEND}/api/v1/users/${id}`, {
      method: 'DELETE',
    });
    loadUsers();
  };

  /* -------- OPS -------- */
  const toggleAppInfo = async () => {
    if (!showAppInfo) {
      const res = await fetch(`${BACKEND}/ops/info`);
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
        <h1 className="text-2xl font-semibold text-center">
          CloudOps Platform
        </h1>

        {/* SYSTEM STATUS */}
        <section className="space-y-1 flex flex-col items-center">
          <h2 className="font-medium">System Status</h2>
          <p>
            Backend:{' '}
            <span className={health === 'Healthy' ? 'text-green-500' : health === 'Down' ? 'text-red-500' : ''}>{health}</span>
          </p>
          <p>
            Database:{' '}
            <span className={dbStatus === 'connected' ? 'text-green-500' : dbStatus === 'disconnected' ? 'text-red-500' : ''}>{dbStatus}</span>
          </p>
          <button
            onClick={() => {
              loadHealth();
              loadDbStatus();
            }}
            className="mt-2 px-3 py-1 text-sm bg-blue-600 rounded hover:bg-blue-700"
          >
            Recheck
          </button>
        </section>

        <hr />

        {/* USERS CRUD */}
        <section className="space-y-3 flex flex-col items-center">
          <h2 className="font-medium">Users Service</h2>

          <div className="flex gap-2">
            <input
              className="flex-1 border rounded px-2 py-1"
              placeholder="User name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <button
              onClick={addUser}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add
            </button>
          </div>

          <ul className="space-y-2">
            {users.map(user => (
              <li
                key={user._id}
                className="flex items-center border  rounded  p-1 justify-around "
              > User Added =&gt; 
                {editingId === user._id ? (
                  <div className="flex gap-2 w-full">
                    <input
                      className="flex-1 border rounded px-2 py-1"
                      value={editingName}
                      onChange={e => setEditingName(e.target.value)}
                    />
                    <button
                      onClick={updateUser}
                      className="px-2 bg-green-600 text-white rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="px-2 bg-blue-600 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <span>{user.name}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(user)}
                        className="px-2 bg-green-600 text-white rounded text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="px-2 bg-red-600 text-white rounded text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </section>

        <hr />

        {/* APP INFO */}
        <section className="space-y-2 flex flex-col items-center">
          <h2 className="font-medium">Application Info</h2>
          <button
            onClick={toggleAppInfo}
            className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-700"
          >
            {showAppInfo ? 'Hide Info' : 'Show Info'}
          </button>

          {showAppInfo && appInfo && (
            <pre className="bg-black p-3 rounded text-xs text-green-400 overflow-x-auto">
              {JSON.stringify(appInfo, null, 2)}
            </pre>
          )}
        </section>
      </div>
    </main>
  );
}
