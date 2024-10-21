import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const React_app = process.env.REACT_APP_BASE_URL;
  const [tableData, SetTableData] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: ['Nation','Year'], direction: 'ascending' });
  const fetchData = async () => {
    const res = await fetch('https://datausa.io/api/data?drilldowns=Nation&measures=Population');
    const data = await res.json()
    SetTableData(data.data)
    console.log(data, "data table");
  }
  // Sorting logic
  const sortedData = [...tableData].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <>
      <h2 className='text-center'>Population Table</h2>
      <table className='tabe-wrapper'>
        <thead>
          <th className="table-container" onClick={() => handleSort('Nation')}>
              Nation {sortConfig.key === 'Nation' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
            </th>
          <th className="table-container" onClick={() => handleSort('Year')}   >
            Year {sortConfig.key === 'Year' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
          </th>
          <th className="table-container">
            Population
          </th>
        </thead>
        <tbody>
          {tableData.length > 0 ? (
            tableData.map((item, index) => (
              <tr key={index}>
                <td className="table-container">{item.Nation}</td>
                <td className="table-container">{item.Year}</td>
                <td className="table-container">{item.Population}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">Loading...</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default App;
