import React, { useState } from 'react';
import sqlite3 from 'better-sqlite3';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [gamesPlayed, setGamesPlayed] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const gamesPlayed = await handleLogin(username, password);
    setGamesPlayed(gamesPlayed);
  };

  const handleLogin = async (username, password) => {
    const db = sqlite3('./mydb.sqlite');
    const user = db.prepare('SELECT games_played FROM users WHERE username = ? AND password = ?').get(username, password);
    db.close();
    return user ? user.games_played : null;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button type="submit">Login</button>
      </form>

      {gamesPlayed !== null && (
        <div>
          <p>Number of games played: {gamesPlayed}</p>
        </div>
      )}
    </div>
  );
}

export default LoginForm;
