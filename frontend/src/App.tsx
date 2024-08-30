import React, { useEffect, useState } from 'react';

const App: React.FC = () => {
  const [dbStatus, setDbStatus] = useState<string>('Not connected');

  useEffect(() => {
    const interval = setInterval(() => {
      fetch('http://localhost:3000/db-status')
        .then(response => response.json())
        .then(data => setDbStatus(data.status))
        .catch(error => console.error('Error fetching DB status:', error));
    }, 5000); // 5秒ごとにポーリング

    return () => clearInterval(interval); // コンポーネントがアンマウントされたときにポーリングを停止
  }, []);

  return (
    <div>
      <h1>DB接続状況: {dbStatus}</h1>
    </div>
  );
};

export default App;