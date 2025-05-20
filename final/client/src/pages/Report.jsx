import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';

export default function Report() {
  const [trainees, setTrainees] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTrainees = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/trainee');
        const data = await res.json();
        setTrainees(data);
      } catch (err) {
        setError('Failed to fetch trainees', err);
      }
    };
    fetchTrainees();
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-8 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Trainees Report</h2>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <table className="w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-blue-100">
              <th className="p-2">First Name</th>
              <th className="p-2">Last Name</th>
              <th className="p-2">Gender</th>
              <th className="p-2">DOB</th>
              <th className="p-2">Level</th>
              <th className="p-2">Parent ID</th>
              <th className="p-2">Trade ID</th>
            </tr>
          </thead>
          <tbody>
            {trainees.map(t => (
              <tr key={t._id} className="border-t">
                <td className="p-2">{t.firstname}</td>
                <td className="p-2">{t.lastname}</td>
                <td className="p-2">{t.gender}</td>
                <td className="p-2">{t.dob ? t.dob.slice(0,10) : ''}</td>
                <td className="p-2">{t.level}</td>
                <td className="p-2">{t.parentId}</td>
                <td className="p-2">{t.tradeId}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded" onClick={() => window.print()}>Print Report</button>
      </div>
    </>
  );
}
