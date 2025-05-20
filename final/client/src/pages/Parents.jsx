import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';

export default function Parents() {
  const [parents, setParents] = useState([]);
  const [form, setForm] = useState({
    parentNationalId: '', // <-- added field
    firstname: '', lastname: '', gender: '', phone: '', district: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  const fetchParents = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/parent');
      const data = await res.json();
      setParents(data);
    } catch (err) {
      setError('Failed to fetch parents', err);
    }
  };

  useEffect(() => { fetchParents(); }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `http://localhost:5000/api/parent/${editingId}` : 'http://localhost:5000/api/parent';
      const payload = { ...form, parentNationalId: Number(form.parentNationalId) }; // convert to number
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const errorMsg = await res.text();
        throw new Error(errorMsg);
      }
      setForm({ parentNationalId: '', firstname: '', lastname: '', gender: '', phone: '', district: '' });
      setEditingId(null);
      fetchParents();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = parent => {
    setForm({
      parentNationalId: parent.parentNationalId || '', // <-- added field
      firstname: parent.firstname,
      lastname: parent.lastname,
      gender: parent.gender,
      phone: parent.phone,
      district: parent.district
    });
    setEditingId(parent._id);
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this parent?')) return;
    try {
      await fetch(`http://localhost:5000/api/parent/${id}`, { method: 'DELETE' });
      fetchParents();
    } catch {
      setError('Failed to delete parent');
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Parents Management</h2>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <form onSubmit={handleSubmit} className="bg-white rounded shadow p-4 mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            name="parentNationalId"
            value={form.parentNationalId}
            onChange={handleChange}
            placeholder="Parent National ID"
            className="border p-2 rounded"
            required
            type="number"
          />
          <input name="firstname" value={form.firstname} onChange={handleChange} placeholder="First Name" className="border p-2 rounded" required />
          <input name="lastname" value={form.lastname} onChange={handleChange} placeholder="Last Name" className="border p-2 rounded" required />
          <select name="gender" value={form.gender} onChange={handleChange} className="border p-2 rounded" required>
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" className="border p-2 rounded" required />
          <input name="district" value={form.district} onChange={handleChange} placeholder="District" className="border p-2 rounded" required />
          <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2 col-span-1 md:col-span-3">{editingId ? 'Update' : 'Add'} Parent</button>
        </form>
        <table className="w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-blue-100">
              <th className="p-2">National ID</th>
              <th className="p-2">First Name</th>
              <th className="p-2">Last Name</th>
              <th className="p-2">Gender</th>
              <th className="p-2">Phone</th>
              <th className="p-2">District</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {parents.map(p => (
              <tr key={p._id} className="border-t">
                <td className="p-2">{p.parentNationalId}</td>
                <td className="p-2">{p.firstname}</td>
                <td className="p-2">{p.lastname}</td>
                <td className="p-2">{p.gender}</td>
                <td className="p-2">{p.phone}</td>
                <td className="p-2">{p.district}</td>
                <td className="p-2">
                  <button onClick={() => handleEdit(p)} className="text-blue-600 mr-2">Edit</button>
                  <button onClick={() => handleDelete(p._id)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
