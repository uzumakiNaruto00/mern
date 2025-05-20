import React from 'react';

import Navbar from '../components/navbar';

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-blue-50">
        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <a href="/trainees" className="bg-white rounded shadow p-6 hover:bg-blue-100">
            <h2 className="text-lg font-bold mb-2">Manage Trainees</h2>
            <p>Register, update, view, and delete trainees.</p>
          </a>
          <a href="/parents" className="bg-white rounded shadow p-6 hover:bg-blue-100">
            <h2 className="text-lg font-bold mb-2">Manage Parents</h2>
            <p>Register, update, view, and delete parents.</p>
          </a>
          <a href="/trades" className="bg-white rounded shadow p-6 hover:bg-blue-100">
            <h2 className="text-lg font-bold mb-2">Manage Trades</h2>
            <p>Register, update, view, and delete trades.</p>
          </a>
          <a href="/report" className="bg-white rounded shadow p-6 hover:bg-blue-100 col-span-1 md:col-span-3">
            <h2 className="text-lg font-bold mb-2">Trainee Report</h2>
            <p>View and print trainees' information report.</p>
          </a>
        </div>
      </div>
    </>
  );
}
