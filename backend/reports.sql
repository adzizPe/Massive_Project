CREATE TABLE reports (
    idlaporan INT AUTO_INCREMENT PRIMARY KEY,
    iduser INT,
    laporan_date DATE,
    location VARCHAR(45),
    description VARCHAR(100),
    status ENUM('menunggu', 'diproses', 'selesai'),
    category ENUM('berat', 'sedang'),
    photo BLOB
);