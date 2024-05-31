// TableLaporan.jsx
import React, { useState } from 'react';
import { LaporanData } from './LaporanData';
import Searchbar from './Searchbar';

const getStatusClass = (status) => {
    switch(status) {
        case 'Selesai':
            return 'status-selesai';
        case 'Diproses':
            return 'status-diproses';
        case 'Menunggu':
            return 'status-menunggu';
        default:
            return 'status-default';
    }
};

const TableLaporan = () => {
  const [search, setSearch] = useState('');

  const handleSearchChange = (query) => {
    setSearch(query);
  };

  const filteredData = LaporanData.filter((item) => {
    return (
      item.nama.toLowerCase().includes(search.toLowerCase()) ||   
      item.tanggal.toLowerCase().includes(search.toLowerCase()) ||
      item.lokasi.toLowerCase().includes(search.toLowerCase()) ||
      item.deskripsi.toLowerCase().includes(search.toLowerCase()) ||
      item.status.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <>
      <Searchbar onSearch={handleSearchChange} />
      <h2>Data Laporan</h2>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Nama dan Email</th>
              <th>Tanggal</th>
              <th>Lokasi</th>
              <th>Deskripsi</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td>
                  <b></b>{item.nama} <br />
                  <span>{item.email}</span>
                </td>
                <td>{item.tanggal}</td>
                <td>{item.lokasi}</td>
                <td>{item.deskripsi}</td>
                <td className={getStatusClass(item.status)}>
                  <b>{item.status}</b>
                </td>
                <td className="td-button">
                  {item.aksi}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableLaporan;
