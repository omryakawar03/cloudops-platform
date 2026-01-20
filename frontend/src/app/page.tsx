'use client';

import { useState } from 'react';

export default function Home() {
  const [status, setStatus] = useState<string>('unknown');
  const checkHealth = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/core/health`
      );
      if (!res.ok) throw new Error('Down');
      setStatus('Healthy');
    } catch {
      setStatus('Down');
    }
  };

  
  return (
    <main className='flex flex-col items-center min-h-screen p-1'>
      <h1 className='p-1 font-bold'>CloudOps Platform</h1>
      <div className='flex flex-col items-center justify-center mt-20'>

      <p className='p-1'>
        Backend Status:{' '}
        <span className={status === 'Healthy' ? 'text-green-500' : status === 'Down' ? 'text-red-500' : ''}>
          {status}
        </span>
      </p>
      <button className='border-blue-900 rounded p-2 bg-blue-500 hover:bg-blue-400 hover:text-black' onClick={checkHealth}>
        Check Backend Health
      </button>
      </div>
    </main>
  );
}
 