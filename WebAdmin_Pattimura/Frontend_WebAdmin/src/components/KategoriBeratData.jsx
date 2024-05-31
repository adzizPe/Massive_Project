import React from "react";
import cody from "../assets/images/cody.png";
import floyid from "../assets/images/floyd.png";
import fotojalanrusak from "../assets/images/fotojalanrusak.png";
import fotojalananrusak1 from "../assets/images/fotojalananrusak1.png";

export const KategoriBeratData = [
    {   
        fotoprofil: <img src={cody} alt='cody' />,
        nama: 'Cody Fisher',
        tanggal: '12 September 2023',
        foto:  <img src={fotojalananrusak1} alt='jalan rusak' />,
        lokasi: 'Pasar Sukaramai',
        deskripsi: 'Jalanan di sekitar Pasar Sukaramai telah lama menjadi perhatian utama bagi pengguna jalan. Lubang-lubang yang tersebar di sepanjang jalan menciptakan kondisi yang sangat tidak nyaman bagi pengendara. Para pengguna jalan sering kali harus berhati-hati ekstra untuk menghindari lubang-lubang tersebut, karena lubang-lubang tersebut dapat menyebabkan kerusakan pada kendaraan atau bahkan kecelakaan. Selain itu, lubang-lubang ini juga menjadi penyebab kemacetan lalu lintas, karena pengendara sering kali harus melambat atau menghindari lubang-lubang tersebut, yang dapat menyebabkan penumpukan kendaraan. Perbaikan jalan yang sudah sangat dibutuhkan ini menjadi salah satu tuntutan utama dari masyarakat setempat, agar kondisi lalu lintas di sekitar Pasar Sukaramai dapat menjadi lebih lancar dan aman bagi semua pengguna jalan',
        cName: 'card-container'
    },
    {   
        fotoprofil: <img src={floyid} alt='floyid' />,
        nama: 'Floyid Miles',
        tanggal: '11 September 2023',
        foto:  <img src={fotojalanrusak} alt='jalan rusak' />,
        lokasi: 'Kantor Dinas Pemuda dan Olahraga',
        deskripsi: 'Lokasinya tidak jauh dari Kantor Dinas Pemuda dan Olahraga dan Dinas Kesehatan Medan. Jalan Tulang Bawang biasanya dijadikan jalur alternatif pengendara yang ingin mempersingkat jarak tempuh dari Jalan Iskandar Muda menuju titik nol Kota Medan atau kawasan Lapangan Merdeka. Terlihat jelas lubang berdiameter hampir 1 meter.',
        cName: 'card-container'
    }
]