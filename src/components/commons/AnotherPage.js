import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AnotherPage = () => {
  const [token, setToken] = useState(localStorage.getItem('authToken'));

  useEffect(() => {
    if (token) {
      axios.get('http://localhost:3000/some-protected-route', {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      .then(response => {
        console.log('Protected data:', response.data);
      })
      .catch(error => {
        console.error('Error fetching protected data:', error);
      });
    }
  }, [token]);

  return (
    <div className="App">
      <main>
        <h1>Another Page</h1>
        {token ? (
          <p>Token is available: {token}</p>
        ) : (
          <p>No token found, please login.</p>
        )}
      </main>
    </div>
  );
};

export default AnotherPage;
