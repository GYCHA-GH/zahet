import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [table, setTable] = useState('Преподаватели');
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/data/${table}`)
      .then(res => setData(res.data))
      .catch(() => setData([]));
  }, [table]);

  return (
    <div>
      <h1>Таблица: {table}</h1>
      <button onClick={() => setTable('Преподаватели')}>Преподаватели</button>
      <button onClick={() => setTable('студенты')}>Студенты</button>

      <table>
        <thead>
          <tr>
            {data[0] && Object.keys(data[0]).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {Object.values(row).map((val, j) => <td key={j}>{val}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
