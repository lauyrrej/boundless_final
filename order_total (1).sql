-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2024-03-22 15:10:02
-- 伺服器版本： 10.4.28-MariaDB
-- PHP 版本： 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `boundless_final`
--

-- --------------------------------------------------------

--
-- 資料表結構 `order_total`
--

CREATE TABLE `order_total` (
  `id` int(6) NOT NULL,
  `user_id` varchar(20) NOT NULL,
  `payment` int(4) NOT NULL,
  `transportation_state` varchar(6) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `discount` tinyint(4) NOT NULL,
  `postcode` int(11) NOT NULL,
  `country` varchar(60) NOT NULL,
  `township` varchar(60) NOT NULL,
  `address` varchar(60) NOT NULL,
  `created_time` datetime NOT NULL,
  `ouid` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `order_total`
--

INSERT INTO `order_total` (`id`, `user_id`, `payment`, `transportation_state`, `phone`, `discount`, `postcode`, `country`, `township`, `address`, `created_time`, `ouid`) VALUES
(1, 'oBJwewHoMOOa', 48600, '運送中', '0989280111', 127, 820, '岡山區', '高雄市', '帕魯大陸', '2024-03-22 10:53:19', ''),
(2, 'oBJwewHoMOOa', 1, '運送中', '', 127, 820, '岡山區', '高雄市', '', '2024-03-22 11:27:44', '25TCAyIF8goh'),
(3, 'BrnNlTPmvcWO', 2, '運送中', '', 127, 820, '岡山區', '高雄市', '', '2024-03-22 11:45:19', 'ekICaKlZiJzd'),
(4, 'BrnNlTPmvcWO', 39600, '運送中', '', 127, 820, '岡山區', '高雄市', '', '2024-03-22 11:50:23', 'RmizWeYkU1hN');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `order_total`
--
ALTER TABLE `order_total`
  ADD PRIMARY KEY (`id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `order_total`
--
ALTER TABLE `order_total`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
