import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import  './App.css';
import PatientDashboard from './pages/Dashboard';
import { Toaster } from './components/ui/toaster';

function App() {
  const [selectedPatient, setSelectedPatient] = useState(null);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route 
              path="/" 
              element={<PatientDashboard setSelectedPatient={setSelectedPatient} />} 
            />
            {/* <Route 
              path="/patient/:id" 
              element={<PatientDetail patient={selectedPatient} />} 
            />
            <Route 
              path="/prior-authorization" 
              element={<PriorAuthorizationForm patient={selectedPatient} />} 
            /> */}
          </Routes>
          <Toaster />
        </main>
      </div>
    </Router>
  );
}

export default App;