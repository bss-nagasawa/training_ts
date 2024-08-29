import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App: React.FC = () => {
  const [dbStatus, setDbStatus] = useState<string>('Checking...');

  useEffect(() => {
    axios.get('http://localhost:3000/db-status')
      .then(response => {
        setDbStatus(response.data.status);
      })
      .catch(error => {
        console.error('Error fetching DB status:', error);
        setDbStatus('Error fetching DB status');
      });
  }, []);

  return (
    <div>
      <h1>Hello World!</h1>
      <p>DB接続ステータス: {dbStatus}</p>
    </div>
  );
};

export default App;