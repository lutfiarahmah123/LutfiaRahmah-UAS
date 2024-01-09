-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 05 Jan 2024 pada 05.50
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_2209259_lutfia_uas_pilkomb`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `peminjamanbuku_lutfia`
--

CREATE TABLE `peminjamanbuku_lutfia` (
  `id` int(11) NOT NULL,
  `judul_buku` text NOT NULL,
  `jumlah` int(11) NOT NULL,
  `nama_peminjam` text NOT NULL,
  `alamat_peminjam` text NOT NULL,
  `noHp_peminjam` text NOT NULL,
  `tanggal_pinjam` date NOT NULL,
  `tanggal_pengembalian` date NOT NULL,
  `lama_pinjam` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `peminjamanbuku_lutfia`
--

INSERT INTO `peminjamanbuku_lutfia` (`id`, `judul_buku`, `jumlah`, `nama_peminjam`, `alamat_peminjam`, `noHp_peminjam`, `tanggal_pinjam`, `tanggal_pengembalian`, `lama_pinjam`) VALUES
(1, 'Laskar pelangi', 1, 'faiq', 'jl soekarno', '081218786734', '2024-01-03', '2024-01-06', '3 hari'),
(2, 'the maze runner', 3, 'zahra', 'perum alamanda', '08358363839', '2024-01-04', '2024-01-11', '7 hari'),
(3, '5 cm', 1, 'dilla', 'perum papanmas', '08128354748', '2024-01-04', '2024-01-11', '7 hari'),
(4, 'perahu kertas', 1, 'cia', 'perum bumi sani', '08129384573', '2024-01-05', '2024-01-08', '5 hari'),
(5, 'koala kumal', 1, 'amalia', 'jl villa makmur 2', '08124578346', '2024-01-07', '2024-01-13', '7 hari');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `peminjamanbuku_lutfia`
--
ALTER TABLE `peminjamanbuku_lutfia`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `peminjamanbuku_lutfia`
--
ALTER TABLE `peminjamanbuku_lutfia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
