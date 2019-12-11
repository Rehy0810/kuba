-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Počítač: 127.0.0.1
-- Vytvořeno: Stř 11. pro 2019, 23:51
-- Verze serveru: 10.4.6-MariaDB
-- Verze PHP: 7.1.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databáze: `kuba`
--

-- --------------------------------------------------------

--
-- Struktura tabulky `day`
--

CREATE TABLE `day` (
  `day_id` int(10) NOT NULL,
  `day_of_week` int(1) NOT NULL,
  `name` varchar(20) COLLATE utf8_czech_ci NOT NULL,
  `routine_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

--
-- Vypisuji data pro tabulku `day`
--

INSERT INTO `day` (`day_id`, `day_of_week`, `name`, `routine_id`) VALUES
(1, 1, 'Pondělí', 1),
(2, 2, 'Úterý', 2),
(3, 3, 'Středa', 1),
(4, 4, 'čtvrtek', 1),
(5, 5, 'Pátek', 1),
(6, 6, 'Sobota', 2),
(7, 0, 'Neděle', 2);

-- --------------------------------------------------------

--
-- Struktura tabulky `role`
--

CREATE TABLE `role` (
  `role_id` int(10) NOT NULL,
  `name` varchar(20) COLLATE utf8_czech_ci NOT NULL,
  `full_name` varchar(40) COLLATE utf8_czech_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

--
-- Vypisuji data pro tabulku `role`
--

INSERT INTO `role` (`role_id`, `name`, `full_name`) VALUES
(1, 'admin', 'Administrátor'),
(2, 'reg', 'Registrovaný');

-- --------------------------------------------------------

--
-- Struktura tabulky `routine`
--

CREATE TABLE `routine` (
  `routine_id` int(10) NOT NULL,
  `name` varchar(20) COLLATE utf8_czech_ci NOT NULL,
  `start` int(11) NOT NULL,
  `end` int(11) NOT NULL,
  `spin_secs` int(11) NOT NULL,
  `delay` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

--
-- Vypisuji data pro tabulku `routine`
--

INSERT INTO `routine` (`routine_id`, `name`, `start`, `end`, `spin_secs`, `delay`) VALUES
(1, 'Normál', 450, 1380, 30, 30),
(2, 'Méně stravy', 360, 1380, 30, 60);

-- --------------------------------------------------------

--
-- Struktura tabulky `user`
--

CREATE TABLE `user` (
  `user_id` int(10) UNSIGNED NOT NULL,
  `username` varchar(20) COLLATE utf8_czech_ci NOT NULL,
  `password` char(128) COLLATE utf8_czech_ci DEFAULT NULL,
  `name` varchar(50) COLLATE utf8_czech_ci DEFAULT NULL,
  `role` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

--
-- Vypisuji data pro tabulku `user`
--

INSERT INTO `user` (`user_id`, `username`, `password`, `name`, `role`) VALUES
(1, 'admin', '$2y$10$H4IvjrTbf5p0eRPAXAgBvu3/7S0ELi3Ek5.KrffKjxpV9qRbGE/sK', 'Administrátor', 1),
(18, 'test', '', 'Danko', 2);

--
-- Klíče pro exportované tabulky
--

--
-- Klíče pro tabulku `day`
--
ALTER TABLE `day`
  ADD PRIMARY KEY (`day_id`),
  ADD KEY `routine` (`routine_id`),
  ADD KEY `day_of_week` (`day_of_week`);

--
-- Klíče pro tabulku `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`role_id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Klíče pro tabulku `routine`
--
ALTER TABLE `routine`
  ADD PRIMARY KEY (`routine_id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Klíče pro tabulku `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `role` (`role`),
  ADD KEY `name` (`name`);

--
-- AUTO_INCREMENT pro tabulky
--

--
-- AUTO_INCREMENT pro tabulku `day`
--
ALTER TABLE `day`
  MODIFY `day_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT pro tabulku `role`
--
ALTER TABLE `role`
  MODIFY `role_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pro tabulku `routine`
--
ALTER TABLE `routine`
  MODIFY `routine_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pro tabulku `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Omezení pro exportované tabulky
--

--
-- Omezení pro tabulku `day`
--
ALTER TABLE `day`
  ADD CONSTRAINT `routine` FOREIGN KEY (`routine_id`) REFERENCES `routine` (`routine_id`);

--
-- Omezení pro tabulku `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `role` FOREIGN KEY (`role`) REFERENCES `role` (`role_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
