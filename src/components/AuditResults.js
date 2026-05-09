import React from 'react';

function AuditResults({ data, onReset }) {
  const { companyName, teamSize, tools } = data;

  const totalMonthly = tools.reduce((sum, t) => sum + (t.monthlyCost * t.seats), 0);
  const totalAnnual = totalMonthly * 12;

  const suggestions = tools.map(t => {
    const totalForTool = t.monthlyCost * t.seats;
    const utilizationRate = t.seats / teamSize;
    let suggestion = '';
    let saving = 0;

    if (utilizationRate < 0.3) {
      saving = Math.round(totalForTool * 0.5);
      suggestion = `Only ${t.seats} out of ${teamSize} people use ${t.tool}. Consider cutting seats by 50% and save ~$${saving}/month.`;
    } else if (t.seats > teamSize) {
      saving = Math.round((t.seats - teamSize) * t.monthlyCost);
      suggestion = `You have more ${t.tool} seats than team members! Remove ${t.seats - teamSize} seats and save ~$${saving}/month.`;
    } else {
      suggestion = `${t.tool} looks reasonably used across your team. ✅`;
    }

    return { ...t, suggestion, saving, totalForTool };
  });

  const totalSavings = suggestions.reduce((sum, s) => sum + s.saving, 0);

  return (
    <div className="container">
      <h1>📊 Audit Results for {companyName}</h1>
      <p className="subtitle">Here's where your money is going</p>

      <div className="summary-cards">
        <div className="summary-card red">
          <h3>Monthly Spend</h3>
          <p>${totalMonthly.toFixed(2)}</p>
        </div>
        <div className="summary-card orange">
          <h3>Annual Spend</h3>
          <p>${totalAnnual.toFixed(2)}</p>
        </div>
        <div className="summary-card green">
          <h3>Potential Savings</h3>
          <p>${totalSavings}/month</p>
        </div>
      </div>

      <div className="card">
        <h2>Tool-by-Tool Breakdown</h2>
        {suggestions.map((s, i) => (
          <div key={i} className="result-row">
            <div className="tool-name">{s.tool}</div>
            <div className="tool-cost">${s.totalForTool}/month ({s.seats} seats × ${s.monthlyCost})</div>
            <div className={`suggestion ${s.saving > 0 ? 'warning' : 'ok'}`}>
              💡 {s.suggestion}
            </div>
          </div>
        ))}
      </div>

      <button className="submit-btn" onClick={onReset}>
        ← Start New Audit
      </button>
    </div>
  );
}

export default AuditResults;