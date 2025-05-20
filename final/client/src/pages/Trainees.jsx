import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';

export default function Trainees() {
  const [trainees, setTrainees] = useState([]);
  const [parents, setParents] = useState([]);
  const [trades, setTrades] = useState([]);
  const [form, setForm] = useState({
    firstname: '', lastname: '', gender: '', dob: '', level: '', parentId: '', tradeId: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  // Fetch trainees
  const fetchTrainees = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/trainee');
      const data = await res.json();
      setTrainees(data);
    } catch (err) {
      setError('Failed to fetch trainees', err);
    }
  };

  // Fetch parents
  const fetchParents = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/parent');
      const data = await res.json();
      setParents(data);
    } catch (err) {
      setError('Failed to fetch parents', err);
    }
  };

  // Fetch trades
  const fetchTrades = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/trade');
      const data = await res.json();
      setTrades(data);
    } catch (err) {
      setError('Failed to fetch trades', err);
    }
  };

  useEffect(() => {
    fetchTrainees();
    fetchParents();
    fetchTrades();
  }, []);

  console.log('Trainees:', trainees);
  console.log('Parents:', parents);
  console.log('Trades:', trades);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `http://localhost:5000/api/trainee/${editingId}` : 'http://localhost:5000/api/trainee';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error('Error saving trainee');
      setForm({ firstname: '', lastname: '', gender: '', dob: '', level: '', parentId: '', tradeId: '' });
      setEditingId(null);
      fetchTrainees();
    } catch (err) {
      setError('Failed to save trainee', err);
    }
  };

  const handleEdit = trainee => {
    setForm({
      firstname: trainee.firstname,
      lastname: trainee.lastname,
      gender: trainee.gender,
      dob: trainee.dob ? trainee.dob.slice(0, 10) : '',
      level: trainee.level,
      parentId: trainee.parentId || '',
      tradeId: trainee.tradeId || ''
    });
    setEditingId(trainee._id);
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this trainee?')) return;
    try {
      await fetch(`http://localhost:5000/api/trainee/${id}`, { method: 'DELETE' });
      fetchTrainees();
    } catch {
      setError('Failed to delete trainee');
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-8 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Trainees Management</h2>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <form onSubmit={handleSubmit} className="bg-white rounded shadow p-4 mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <input name="firstname" value={form.firstname} onChange={handleChange} placeholder="First Name" className="border p-2 rounded" required />
          <input name="lastname" value={form.lastname} onChange={handleChange} placeholder="Last Name" className="border p-2 rounded" required />
          <select name="gender" value={form.gender} onChange={handleChange} className="border p-2 rounded" required>
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input name="dob" type="date" value={form.dob} onChange={handleChange} className="border p-2 rounded" required />
          <input name="level" value={form.level} onChange={handleChange} placeholder="Level (e.g. 3, 4, 5)" className="border p-2 rounded" required />
          <select name="parentId" value={form.parentId} onChange={handleChange} className="border p-2 rounded" required>
            <option value="">Select Parent</option>
            {parents.map(p => (
              <option key={p._id} value={p._id}>
                {p.firstname} {p.lastname} ({p.parentNationalId})
              </option>
            ))}
          </select>
          <select name="tradeId" value={form.tradeId} onChange={handleChange} className="border p-2 rounded" required>
            <option value="">Select Trade</option>
            {trades.map(t => (
              <option key={t._id} value={t._id}>
                {t.name}
              </option>
            ))}
          </select>
          <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2 col-span-1 md:col-span-3">{editingId ? 'Update' : 'Add'} Trainee</button>
        </form>
        <table className="w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-blue-100">
              <th className="p-2">First Name</th>
              <th className="p-2">Last Name</th>
              <th className="p-2">Gender</th>
              <th className="p-2">DOB</th>
              <th className="p-2">Level</th>
              <th className="p-2">Parent</th>
              <th className="p-2">Trade</th>
              <th className="p-2">Actions</th>
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
                <td className="p-2">
                  {parents.find(p => p._id === t.parentId)
                    ? `${parents.find(p => p._id === t.parentId).firstname} ${parents.find(p => p._id === t.parentId).lastname}`
                    : t.parentId}
                </td>
                <td className="p-2">
                  {trades.find(tr => tr._id === t.tradeId)
                    ? trades.find(tr => tr._id === t.tradeId).name
                    : t.tradeId}
                </td>
                <td className="p-2">
                  <button onClick={() => handleEdit(t)} className="text-blue-600 mr-2">Edit</button>
                  <button onClick={() => handleDelete(t._id)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
