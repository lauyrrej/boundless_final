-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： localhost
-- 產生時間： 2024 年 03 月 21 日 03:42
-- 伺服器版本： 10.4.28-MariaDB
-- PHP 版本： 8.2.4

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
-- 資料表結構 `order_item`
--

CREATE TABLE `order_item` (
  `id` int(6) NOT NULL,
  `order_id` int(6) NOT NULL,
  `product_id` int(6) NOT NULL,
  `quantity` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `order_item`
--

INSERT INTO `order_item` (`id`, `order_id`, `product_id`, `quantity`) VALUES
(5, 217, 10, 2),
(6, 217, 25, 3),
(7, 217, 216, 1),
(8, 218, 25, 3),
(9, 218, 233, 1),
(10, 218, 216, 1),
(11, 218, 10, 2),
(12, 220, 10, 2),
(13, 220, 25, 3),
(14, 220, 216, 1),
(15, 220, 233, 1),
(16, 221, 10, 2),
(17, 221, 25, 3),
(18, 221, 233, 1),
(19, 221, 216, 1),
(20, 222, 10, 2),
(21, 222, 216, 1),
(22, 222, 25, 3),
(23, 223, 10, 2),
(24, 226, 10, 2),
(25, 227, 10, 2),
(26, 228, 10, 2),
(27, 228, 25, 3),
(28, 228, 233, 1),
(29, 228, 216, 1),
(30, 229, 10, 2),
(31, 229, 233, 1),
(32, 229, 25, 3),
(33, 229, 216, 1),
(34, 230, 10, 2),
(35, 230, 25, 3),
(36, 230, 216, 1),
(37, 230, 233, 1),
(38, 238, 10, 2),
(39, 238, 216, 1),
(40, 238, 25, 3),
(41, 238, 233, 1),
(42, 239, 10, 2),
(43, 239, 25, 3),
(44, 239, 216, 1),
(45, 239, 233, 1),
(46, 240, 10, 2),
(47, 240, 25, 3),
(48, 240, 216, 1),
(49, 240, 233, 1),
(50, 241, 10, 2),
(51, 241, 25, 3),
(52, 241, 216, 1),
(53, 241, 233, 1),
(54, 241, 10, 2),
(55, 241, 25, 3),
(56, 241, 216, 1),
(57, 241, 233, 1),
(58, 242, 10, 2),
(59, 242, 216, 1),
(60, 242, 25, 3),
(61, 242, 233, 1),
(62, 243, 10, 2),
(63, 243, 25, 3),
(64, 243, 233, 1),
(65, 243, 216, 1),
(66, 244, 10, 2),
(67, 244, 25, 3),
(68, 244, 233, 1),
(69, 244, 216, 1),
(70, 244, 216, 1),
(71, 244, 10, 1),
(72, 244, 233, 1),
(73, 244, 25, 1),
(74, 244, 216, 1),
(75, 244, 25, 1),
(76, 244, 233, 1),
(77, 244, 10, 1);

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `order_item`
--
ALTER TABLE `order_item`
  ADD PRIMARY KEY (`id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `order_item`
--
ALTER TABLE `order_item`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
