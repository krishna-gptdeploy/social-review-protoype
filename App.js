import React, { useState } from 'react';

export default function App() {
  const [step, setStep] = useState('menu');
  const [form, setForm] = useState({ keyword: '', name: '', comment: '' });
  const [comments, setComments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = () => {
    setComments([...comments, { ...form }]);
    setForm({ keyword: '', name: '', comment: '' });
    setStep('menu');
  };

  const filteredComments = comments.filter(c =>
    c.keyword.includes(searchTerm)
  );

  return (
    <div style={{ padding: 20 }}>
      {step === 'menu' && (
        <>
          <button onClick={() => setStep('leave')}>Leave a Comment</button>
          <button onClick={() => setStep('read')}>Read Comments</button>
        </>
      )}

      {step === 'leave' && (
        <div>
          <input placeholder="Keyword" value={form.keyword} onChange={e => setForm({ ...form, keyword: e.target.value })} /><br/>
          <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /><br/>
          <textarea placeholder="Comment" value={form.comment} onChange={e => setForm({ ...form, comment: e.target.value })} /><br/>
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={() => setStep('menu')}>Back</button>
        </div>
      )}

      {step === 'read' && (
        <div>
          <input placeholder="Search keyword" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} /><br/>
          <ul>
            {filteredComments.map((c, i) => (
              <li key={i}><strong>{c.name}</strong>: {c.comment}</li>
            ))}
          </ul>
          <button onClick={() => setStep('menu')}>Back</button>
        </div>
      )}
    </div>
  );
}