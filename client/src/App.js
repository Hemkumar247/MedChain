import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Add your own custom CSS styling here later

function App() {
  const [batchId, setBatchId] = useState('');
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!file || !batchId) return alert("Please provide a Batch ID and an image.");

    setLoading(true);
    const formData = new FormData();
    formData.append('medicineImage', file);
    formData.append('batchId', batchId);

    try {
      const response = await axios.post('http://localhost:5000/api/verify', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResult(response.data);
    } catch (error) {
      console.error("Error verifying:", error);
      alert("Verification failed. Check server logs.");
    }
    setLoading(false);
  };

  return (
    <div className="container" style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>MedChain: Clinic Verification</h1>
      <p>Scan incoming medicine batches to verify authenticity before administering.</p>
      
      <form onSubmit={handleVerify} style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label>Batch ID (e.g., BATCH-101): </label>
          <input 
            type="text" 
            value={batchId} 
            onChange={(e) => setBatchId(e.target.value)} 
            required 
          />
        </div>
        
        <div style={{ marginBottom: '10px' }}>
          <label>Upload Medicine Box Image: </label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange} 
            required 
          />
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? "Analyzing via Gemini..." : "Verify Authenticity"}
        </button>
      </form>

      {result && (
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
          <h3>Analysis Result</h3>
          <p><strong>Status:</strong> {result.aiAnalysis.isAuthentic ? "✅ Authentic" : "❌ Counterfeit Detected"}</p>
          <p><strong>AI Reasoning:</strong> {result.aiAnalysis.reason}</p>
          {result.flaggedOnChain && (
            <p style={{ color: 'red', fontWeight: 'bold' }}>
              ⚠️ Alert: This batch has been permanently flagged on the Polygon blockchain.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
