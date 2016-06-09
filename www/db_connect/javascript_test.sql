-- phpMyAdmin SQL Dump
-- version 4.4.3
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: 2015-12-09 03:41:40
-- 服务器版本： 5.6.24
-- PHP Version: 5.6.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `javascript_test`
--

-- --------------------------------------------------------

--
-- 表的结构 `models`
--

CREATE TABLE IF NOT EXISTS `models` (
  `ID` int(11) NOT NULL,
  `obj_name` text NOT NULL,
  `obj_type` varchar(100) NOT NULL,
  `obj_category` varchar(100) NOT NULL,
  `obj_path` text NOT NULL,
  `obj_width` text NOT NULL,
  `obj_length` text NOT NULL,
  `obj_height` text NOT NULL,
  `obj_Material` text NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `models`
--

INSERT INTO `models` (`ID`, `obj_name`, `obj_type`, `obj_category`, `obj_path`,`obj_width`,`obj_length`,`obj_height`,`obj_Material`) VALUES
(1, 'bed', 'ground', 'bed', 'models/bed/bed','30','20','10','Iron'),
(2, 'bednew', 'ground', 'bed', 'models/bednew/bednew','30','20','10','Wood'),
(3, 'doornew', 'wallGround', 'door', 'models/doornew/doornew','30','20','10','Wood'),
(4, 'windownew', 'wall', 'window', 'models/windownew/windownew','30','20','10','Iron'),
(5, 'tabletestnew', 'ground', 'table', 'models/tabletestnew/tabletestnew','30','20','10','Iron'),
(6, 'Office Chairnew', 'ground', 'chair', 'models/Office Chairnew/Office Chairnew','30','20','10','Iron'),
(7, 'desktest', 'ground', 'table', 'models/desktest/desktest','30','20','10','Wood'),
(8, 'office_chair', 'ground', 'chair', 'models/office_chair/office_chair','30','20','10','Iron');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `models`
--
ALTER TABLE `models`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `models`
--
ALTER TABLE `models`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
