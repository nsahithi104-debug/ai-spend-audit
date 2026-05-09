import React, { useState } from 'react';
import './App.css';
import InputForm from './components/InputForm';
import AuditResults from './components/AuditResults';

function App() {
  const [auditData, setAuditData] = useState(null);

  return (
    <div className="app">
      {!auditData ? (
        <InputForm onSubmit={setAuditData} />
      ) : (
        <AuditResults data={auditData} onReset={() => setAuditData(null)} />
      )}
    </div>
  );
}

export default App;