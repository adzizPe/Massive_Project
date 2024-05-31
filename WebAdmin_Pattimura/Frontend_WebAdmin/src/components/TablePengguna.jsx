// TablePengguna.js
import React, { useState } from 'react';
import DeleteButton from './DeleteButton';
import { PenggunaData } from './PenggunaData';
import Searchbar from './Searchbar';

const TablePengguna = () => {
  const [search, setSearch] = useState('');

  const handleSearchChange = (query) => {
    setSearch(query);
  };

  const filteredData = PenggunaData.filter((item) => {
    return item.nama.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <>
      <Searchbar onSearch={handleSearchChange} /> 
      <h2>Data Pengguna</h2>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Foto</th>
              <th>Nama Lengkap</th>
              <th>Username</th>
              <th>Email</th>
              <th>No. Telepon</th>
              <th>Password</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index} className={item.cName}>
                <td>{item.fotoprofil}</td>
                <td>{item.nama}</td>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>{item.notelp}</td>
                <td>{item.password}</td>
                <td className="td-button">
                  <DeleteButton />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TablePengguna;
