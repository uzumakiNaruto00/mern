import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';

export default function Trades() {
  const [trades, setTrades] = useState([]);
  const [form, setForm] = useState({
    name: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  const fetchTrades = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/trade');
      const data = await res.json();
      setTrades(data);
    } catch (err) {
      setError('Failed to fetch trades',err);
    }
  };

  useEffect(() => { fetchTrades(); }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `http://localhost:5000/api/trade/${editingId}` : 'http://localhost:5000/api/trade';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error('Error saving trade');
      setForm({ name: '' });
      setEditingId(null);
      fetchTrades();
    } catch (err) {
      setError('Failed to save trade',err);
    }
  };

  const handleEdit = trade => {
    setForm({ name: trade.name });
    setEditingId(trade._id);
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this trade?')) return;
    try {
      await fetch(`/api/trade/${id}`, { method: 'DELETE' });
      fetchTrades();
    } catch {
      setError('Failed to delete trade');
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-8 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Trades Management</h2>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <form onSubmit={handleSubmit} className="bg-white rounded shadow p-4 mb-8 flex gap-4">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Trade Name" className="border p-2 rounded flex-1" required />
          <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2">{editingId ? 'Update' : 'Add'} Trade</button>
        </form>
        <table className="w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-blue-100">
              <th className="p-2">Trade Name</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {trades.map(t => (
              <tr key={t._id} className="border-t">
                <td className="p-2">{t.name}</td>
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
