import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [searchCity, setSearchCity] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(res.data);
    };

    fetchUsers();
  }, []);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  let filteredUsers = users.filter((user) => user.address.city.toLowerCase().includes(searchCity.toLowerCase()));
  if (sortField !== null) {
    filteredUsers = [...filteredUsers].sort((a, b) => {
      if (sortDirection === 'asc') {
        return a[sortField].toString().localeCompare(b[sortField].toString());
      } else {
        return b[sortField].toString().localeCompare(a[sortField].toString());
      }
    });
  }

  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
      <div>
        <form onSubmit={handleSearch} className="search-form">
          <label htmlFor="city" className="search-label">Search by city:</label>
          <div className="search-input-container">
            <input
              type="text"
              id="city"
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">Search</button>
          </div>
        </form>

        <table>
          <thead>
            <tr>
              <th>
                <a href="#" onClick={() => handleSort('name')}>
                  Name {sortField === 'name' && sortDirection === 'asc' ? <>&uarr;</> : <>&darr;</>}
                </a>
              </th>
              <th>
                <a>
                  Address
                </a>
              </th>
              <th>
                <a>
                  Phone
                </a>
              </th>
              <th>
                <a>
                  Company
                </a>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.address.street+" "+user.address.suite+" "+user.address.city}</td>
                <td>{user.phone}</td>
                <td>{user.company.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          itemsPerPage={usersPerPage}
          totalItems={users.filter(user => user.address.city.toLowerCase().includes(searchCity.toLowerCase())).length}
          paginate={paginate}
          currentPage={currentPage}
        />

      </div>
  );
}

function Pagination({ itemsPerPage, totalItems, paginate, currentPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul>
      {pageNumbers.map((number) => (
        <li key={number}>
          <a href="/" onClick={() => paginate(number)} className={currentPage === number ? 'active' : ''}>
            {number}
          </a>
        </li>
      ))}
    </ul>
  );
}

