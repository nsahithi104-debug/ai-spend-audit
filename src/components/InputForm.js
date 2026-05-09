import React, { useState } from 'react';

const AI_TOOLS = [
  { name: 'ChatGPT Plus', cost: 20 },
  { name: 'ChatGPT Team', cost: 30 },
  { name: 'Claude Pro', cost: 20 },
  { name: 'Claude Team', cost: 30 },
  { name: 'GitHub Copilot', cost: 19 },
  { name: 'Midjourney', cost: 10 },
  { name: 'Notion AI', cost: 10 },
  { name: 'Grammarly', cost: 12 },
  { name: 'Custom/Other', cost: 0 },
];

function InputForm({ onSubmit }) {
  const [companyName, setCompanyName] = useState('');
  const [teamSize, setTeamSize] = useState('');
  const [tools, setTools] = useState([
    { tool: '', seats: 1, monthlyCost: 0 }
  ]);

  const addTool = () => {
    setTools([...tools, { tool: '', seats: 1, monthlyCost: 0 }]);
  };

  const updateTool = (index, field, value) => {
    const updated = [...tools];
    updated[index][field] = value;
    if (field === 'tool') {
      const found = AI_TOOLS.find(t => t.name === value);
      if (found) updated[index].monthlyCost = found.cost;
    }
    setTools(updated);
  };

  const removeTool = (index) => {
    setTools(tools.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!companyName || !teamSize || tools[0].tool === '') {
      alert('Please fill in all fields!');
      return;
    }
    onSubmit({ companyName, teamSize: parseInt(teamSize), tools });
  };

  return (
    <div className="container">
      <h1>🔍 AI Spend Audit</h1>
      <p className="subtitle">Find out where your startup is overspending on AI tools</p>

      <div className="card">
        <h2>Company Info</h2>
        <input
          type="text"
          placeholder="Company name"
          value={companyName}
          onChange={e => setCompanyName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Team size (number of people)"
          value={teamSize}
          onChange={e => setTeamSize(e.target.value)}
        />
      </div>

      <div className="card">
        <h2>Your AI Tools</h2>
        {tools.map((t, i) => (
          <div key={i} className="tool-row">
            <select value={t.tool} onChange={e => updateTool(i, 'tool', e.target.value)}>
              <option value="">Select a tool</option>
              {AI_TOOLS.map(opt => (
                <option key={opt.name} value={opt.name}>{opt.name}</option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Seats"
              value={t.seats}
              onChange={e => updateTool(i, 'seats', parseInt(e.target.value))}
            />
            <input
              type="number"
              placeholder="Monthly cost $"
              value={t.monthlyCost}
              onChange={e => updateTool(i, 'monthlyCost', parseFloat(e.target.value))}
            />
            {tools.length > 1 && (
              <button className="remove-btn" onClick={() => removeTool(i)}>✕</button>
            )}
          </div>
        ))}
        <button className="add-btn" onClick={addTool}>+ Add another tool</button>
      </div>

      <button className="submit-btn" onClick={handleSubmit}>
        Run My Audit →
      </button>
    </div>
  );
}

export default InputForm;