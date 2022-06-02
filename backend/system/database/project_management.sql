-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 24, 2022 at 12:53 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `member`
--

CREATE TABLE `member` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `userId` varchar(60) NOT NULL,
  `email` varchar(70) NOT NULL,
  `password` varchar(100) NOT NULL,
  `designation` varchar(200) NOT NULL,
  `status` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `member`
--

INSERT INTO `member` (`id`, `name`, `userId`, `email`, `password`, `designation`, `status`) VALUES
(1, 'Bellal hossain', 'bellal', 'bellal@gmail.com', 'bellal', 'Software Engineer', 'working'),
(2, 'Sakib Al Hasan', 'sakib', 'sakib@gmail.com', 'sakib', 'Software Engineer', 'working'),
(3, 'Akash Chandra', 'akash', 'akash@gmail.com', 'akash', 'Software Engineer', 'at home'),
(4, 'Ahasanulla Nahid', 'ahasanulla', 'ahasanulla@gmail.com', 'Ahasanulla', 'Software Engineer', 'working'),
(5, 'Rana', 'rana', 'rana@gmail.com', 'rana', 'Software Engineer', 'at home'),
(6, 'Humaun Kabir', 'kabir', 'kabir@gmail.com', 'kabir', 'Software Engineer', 'working'),
(7, 'Raju Bormon', 'raju', 'raju@gmail.com', 'raju', 'Software Engineer', 'at home'),
(8, 'Jahangir Alom', 'jahangir', 'jahangir@gmail.com', 'jahangir', 'Software Engineer', 'working');

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE `project` (
  `id` int(11) NOT NULL,
  `project_id` varchar(50) NOT NULL,
  `project_name` varchar(200) NOT NULL,
  `description` text NOT NULL,
  `client_company` varchar(200) NOT NULL,
  `project_budget` double NOT NULL,
  `amount_spend` double NOT NULL,
  `project_duration` varchar(100) NOT NULL,
  `progress` int(11) NOT NULL DEFAULT 0,
  `opening_time` varchar(100) NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'open',
  `action` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`id`, `project_id`, `project_name`, `description`, `client_company`, `project_budget`, `amount_spend`, `project_duration`, `progress`, `opening_time`, `status`, `action`) VALUES
(2, 'P-0001', 'E-commerce', 'E-commerce is the activity of electronically buying or selling of products on online services or over the Internet.', 'E-commerce', 10000, 2000, '5 month', 100, '23-5-2022 12:59 pm', 'completed', 0),
(3, 'P-0002', 'Project management', 'E-commerce is the activity of electronically buying or selling of products on online services or over the Internet.', 'Project management', 1000, 200, '5 month', 75, '23-5-2022 13:1 pm', 'on-going', 0),
(4, 'P-0003', 'Game', 'E-commerce is the activity of electronically buying or selling of products on online services or over the Internet.', 'Game', 1000, 200, '5 month', 15, '23-5-2022 13:6 pm', 'on-going', 0),
(9, 'P-0004', 'Point of sale', 'The point of sale or point of purchase is the time and place where a retail transaction is completed. At the point of sale, the merchant calculates the amount owed by the customer, indicates that amount, may prepare an invoice for the customer, and indicates the options for the customer to make payment. ', 'Point of sale', 200000, 10000, '6 month', 100, '24-5-2022 12:44 am', 'completed', 0),
(10, 'P-0009', 'Point of sale', 'The point of sale or point of purchase is the time and place where a retail transaction is completed. At the point of sale, the merchant calculates the amount owed by the customer, indicates that amount, may prepare an invoice for the customer, and indicates the options for the customer to make payment. ', 'Bata Ltd', 333000, 22000, '7 month', 0, '24-5-2022 12:44 am', 'open', 0);

-- --------------------------------------------------------

--
-- Table structure for table `project_member`
--

CREATE TABLE `project_member` (
  `id` int(11) NOT NULL,
  `project_id` varchar(50) NOT NULL,
  `member_id` varchar(60) NOT NULL,
  `join_time` varchar(50) NOT NULL,
  `active` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `project_member`
--

INSERT INTO `project_member` (`id`, `project_id`, `member_id`, `join_time`, `active`) VALUES
(1, 'P-0001', 'bellal', '23-5-2022 13:59 pm', 0),
(2, 'P-0001', 'akash', '23-5-2022 14:7 pm', 0),
(3, 'P-0001', 'jahangir', '23-5-2022 14:7 pm', 0),
(6, 'P-0003', 'kabir', '23-5-2022 14:8 pm', 0),
(9, 'P-0002', 'bellal', '23-5-2022 14:34 pm', 0),
(10, 'P-0002', 'ahasanulla', '23-5-2022 14:34 pm', 0),
(12, 'P-0002', 'jahangir', '23-5-2022 14:35 pm', 0),
(13, 'P-0002', 'sakib', '23-5-2022 14:35 pm', 0),
(14, 'P-0003', 'raju', '23-5-2022 20:42 pm', 0),
(15, 'P-0003', 'rana', '23-5-2022 20:42 pm', 0),
(17, 'P-0004', 'kabir', '24-5-2022 12:45 am', 0),
(18, 'P-0004', 'akash', '24-5-2022 12:45 am', 0),
(19, 'P-0004', 'jahangir', '24-5-2022 12:45 am', 0),
(20, 'P-0009', 'sakib', '24-5-2022 12:45 am', 0),
(21, 'P-0009', 'rana', '24-5-2022 12:45 am', 0),
(22, 'P-0009', 'raju', '24-5-2022 12:45 am', 0),
(23, 'P-0009', 'akash', '24-5-2022 12:45 am', 0);

-- --------------------------------------------------------

--
-- Table structure for table `supervisor`
--

CREATE TABLE `supervisor` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `userId` varchar(60) NOT NULL,
  `email` varchar(70) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `supervisor`
--

INSERT INTO `supervisor` (`id`, `name`, `userId`, `email`, `password`) VALUES
(1, 'Bellal Hossain', 'bellalhoss66', 'bellalhoss66@gmail.com', '12345');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `project_member`
--
ALTER TABLE `project_member`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `supervisor`
--
ALTER TABLE `supervisor`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `member`
--
ALTER TABLE `member`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `project`
--
ALTER TABLE `project`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `project_member`
--
ALTER TABLE `project_member`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `supervisor`
--
ALTER TABLE `supervisor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
