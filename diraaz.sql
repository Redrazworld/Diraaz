-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 13, 2023 at 08:49 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `diraaz`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `email`, `password`, `created_at`, `updated_at`) VALUES
(1, 'admin@gmail.com', '$2b$10$XRofQ4ipax7nI7r/lXyrTuA82.xjC5d2bM0IbsufCmrb1IPZ7xziu', '2023-11-04 10:16:03', '2023-11-13 13:26:42');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `parent` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`_id`, `name`, `parent`, `created_at`, `updated_at`) VALUES
(2, 'lower3', NULL, '2023-11-04 11:05:49', '2023-11-04 13:37:40'),
(9, 'edf', 2, '2023-11-04 11:30:49', '2023-11-04 11:30:49'),
(10, 'xrfg', 2, '2023-11-04 12:57:21', '2023-11-04 12:57:21'),
(11, 'fx', 11, '2023-11-04 13:04:08', '2023-11-04 13:04:14');

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE `clients` (
  `_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `Aphone` varchar(20) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `parent` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `carts` longtext DEFAULT NULL,
  `orders` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`orders`)),
  `address` varchar(225) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`_id`, `name`, `email`, `password`, `phone`, `Aphone`, `image`, `parent`, `created_at`, `updated_at`, `carts`, `orders`, `address`, `city`) VALUES
(1, 'Prashant Srivastav', 'srivastavp891@gmail.com', '$2b$10$MG6L7Zqm/2IUJ.ebILb.BuTuCZVyH1NDEr2eI00USvKete3CSRrrK', '+919984529509', NULL, 'https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/profile-images%2FIMG_20230827_184911.jpg?alt=media&token=7d332434-c3d6-46bf-b856-8a42c1746f9f', NULL, '2023-11-08 22:04:23', '2023-11-14 01:16:54', '', '[44,45,46,47,48,49,50,51,52]', 'jeetpur, Birdpur no. 13, Naugarh\nLucknow', 'SiddharthNagar'),
(2, '', '', '$2b$10$x9saYSPhEmqlHwjnt0jMR.q7MVBXq.mm.O99.osqlOp2fRmOpCnFq', NULL, NULL, NULL, NULL, '2023-11-08 22:24:23', '2023-11-08 22:24:23', NULL, NULL, NULL, NULL),
(3, 'sangam', 'sangam@gmail.com', '$2b$10$jKXC1R1qOJHDnzhZ6HQzOeyUWmyy/Yv8UGV6GhX6jbD0NHGEWE1ye', NULL, NULL, NULL, NULL, '2023-11-08 22:30:59', '2023-11-08 22:30:59', NULL, NULL, NULL, NULL),
(4, 'sngam', 'sangam2@gmail.com', '$2b$10$p9JMXsnpvYWqxe/zIM6afenikiOXCnbo0aFSBcHIxz8ZYrpN7CKuC', NULL, NULL, NULL, NULL, '2023-11-08 22:46:33', '2023-11-08 22:46:33', NULL, NULL, NULL, NULL),
(5, 'sngam', 'sangam3@gmail.com', '$2b$10$ighd0b3NlBY/.BDHi3oA9O9Q8p9QPZmYUk1i60u8Cf7cK.HliFwRO', NULL, NULL, NULL, NULL, '2023-11-08 22:46:52', '2023-11-08 22:46:52', NULL, NULL, NULL, NULL),
(6, 'sngam', 'sangam4@gmail.com', '$2b$10$mnNhXvYnsqG75bWBH2Ba8OMFMhC0oMu10FffU9246jULqaOWhhC6C', NULL, NULL, NULL, NULL, '2023-11-08 22:48:02', '2023-11-08 22:48:02', NULL, NULL, NULL, NULL),
(7, 'sngam', 'sangam5@gmail.com', '$2b$10$BEG2IxvW8LTKMyEY8GJOm.sYrFCJ0kfu7xs0Q/3Oo/4BmB/8MZR5a', NULL, NULL, NULL, NULL, '2023-11-08 22:53:06', '2023-11-08 22:53:06', NULL, NULL, NULL, NULL),
(8, 'srivastav', 'srivastav@gmail.com', '$2b$10$ZLWSTVuKvLQE.cfAiWQi9OIhL6J8vgiDtZmi7HQW8Emhj1aCpa1IS', NULL, NULL, NULL, NULL, '2023-11-08 22:59:22', '2023-11-08 22:59:22', NULL, NULL, NULL, NULL),
(9, 'srivastavp', 'srivastavp@gmail.com', '$2b$10$/kjavOJeKxnqz7LHMRraI.rK28j4BTnXdT1JruPmxYtp3ocawOdW6', NULL, NULL, NULL, NULL, '2023-11-08 23:07:19', '2023-11-08 23:07:19', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `response` text DEFAULT NULL,
  `responsed` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `country` varchar(50) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`_id`, `name`, `email`, `message`, `response`, `responsed`, `created_at`, `updated_at`, `country`, `phone`) VALUES
(1, 'Prashant Srivastav', 'srivastavp891@gmail.com', 'hjgk', NULL, NULL, '2023-11-13 09:24:36', '2023-11-13 09:24:36', 'India', '+919984529509'),
(2, 'Prashant Srivastav', 'srivastavp891@gmail.com', 'hjgk', NULL, NULL, '2023-11-13 09:25:31', '2023-11-13 09:25:31', 'India', '+919984529509'),
(3, 'Prashant Srivastav', 'srivastavp891@gmail.com', 'hjgk', NULL, NULL, '2023-11-13 09:33:20', '2023-11-13 09:33:20', 'India', '+919984529509'),
(4, 'Prashant Srivastav', 'srivastavp891@gmail.com', '4647757', 'oky', 1, '2023-11-13 13:07:46', '2023-11-13 13:11:13', 'India', '+919984529509'),
(5, 'Prashant Srivastav', 'srivastavp891@gmail.com', 'sert', 'ok', 1, '2023-11-13 13:14:40', '2023-11-13 13:15:05', 'India', '+919984529509'),
(6, 'Prashant Srivastav', 'srivastavp891@gmail.com', 'xty', 'cfg', 1, '2023-11-13 13:18:42', '2023-11-13 13:19:01', 'India', '+919984529509'),
(7, 'Prashant Srivastav', 'srivastavp891@gmail.com', 'FGFG\n', 'FJFKJFJK', 1, '2023-11-13 13:21:50', '2023-11-13 13:22:15', 'India', '+919984529509'),
(8, 'Prashant Srivastav', 'srivastavp891@gmail.com', 'DFHD', 'jt\n', 1, '2023-11-13 13:22:41', '2023-11-13 13:23:52', 'India', '+919984529509'),
(9, 'Prashant Srivastav', 'srivastavp891@gmail.com', 'DFHD', NULL, 0, '2023-11-13 13:22:53', '2023-11-13 13:22:53', 'India', '+919984529509'),
(10, 'Prashant Srivastav', 'srivastavp891@gmail.com', 'DFHD', NULL, 0, '2023-11-13 13:23:00', '2023-11-13 13:23:00', 'India', '+919984529509'),
(11, 'Prashant Srivastav', 'srivastavp891@gmail.com', 'DFHD', NULL, 0, '2023-11-13 13:23:14', '2023-11-13 13:23:14', 'India', '+919984529509'),
(12, 'Prashant Srivastav', 'srivastavp891@gmail.com', 'DFHD', NULL, 0, '2023-11-13 13:23:14', '2023-11-13 13:23:14', 'India', '+919984529509'),
(13, 'Prashant Srivastav', 'srivastavp891@gmail.com', 'DFHD', NULL, 0, '2023-11-13 13:23:19', '2023-11-13 13:23:19', 'India', '+919984529509');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `_id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `total` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `APhone` varchar(255) DEFAULT NULL,
  `postalCode` varchar(255) DEFAULT NULL,
  `street` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `paid` tinyint(1) DEFAULT NULL,
  `line_items` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`line_items`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`_id`, `name`, `total`, `email`, `city`, `phone`, `APhone`, `postalCode`, `street`, `country`, `status`, `paid`, `line_items`, `created_at`, `updated_at`) VALUES
(40, 'Prashant Srivastav', '964', 'srivastavp891@gmail.com', 'wsx', '+919984529509', '', '272203', 'jeetpur, Birdpur no. 13, Naugarh', 'India', 'confirm', 0, '[{\"quantity\":1,\"price_data\":{\"currency\":\"inr\",\"product_data\":{\"name\":\"producvtt nsfe8\",\"images\":\"[\\\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20194550.png1699119484443?alt=media&token=baa48203-3958-419d-b30d-d39d91a59fee\\\",\\\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20164131.png1699119455661?alt=media&token=ea5536a1-803f-49a1-8b3a-486d4fc113fd\\\"]\"},\"unit_amount\":9700}},{\"quantity\":1,\"price_data\":{\"currency\":\"inr\",\"product_data\":{\"name\":\"producvtt nsfe7\",\"images\":\"[\\\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20194550.png1699117885907?alt=media&token=84d4414c-eebf-4cd5-b20a-055d62ffe53e\\\"]\"},\"unit_amount\":86700}}]', '2023-11-11 18:29:35', '2023-11-11 18:29:35'),
(41, 'Prashant Srivastav', '1158', 'srivastavp891@gmail.com', 'wsx', '+919984529509', '', '272203', 'jeetpur, Birdpur no. 13, Naugarh', 'India', 'confirm', 0, '[{\"quantity\":3,\"price_data\":{\"currency\":\"inr\",\"product_data\":{\"name\":\"producvtt nsfe8\",\"images\":\"[\\\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20194550.png1699119484443?alt=media&token=baa48203-3958-419d-b30d-d39d91a59fee\\\",\\\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20164131.png1699119455661?alt=media&token=ea5536a1-803f-49a1-8b3a-486d4fc113fd\\\"]\"},\"unit_amount\":29100}},{\"quantity\":3,\"price_data\":{\"currency\":\"inr\",\"product_data\":{\"name\":\"producvtt nsfe8\",\"images\":\"[\\\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20194550.png1699119484443?alt=media&token=baa48203-3958-419d-b30d-d39d91a59fee\\\",\\\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20164131.png1699119455661?alt=media&token=ea5536a1-803f-49a1-8b3a-486d4fc113fd\\\"]\"},\"unit_amount\":29100}},{\"quantity\":3,\"price_data\":{\"currency\":\"inr\",\"product_data\":{\"name\":\"producvtt nsfe8\",\"images\":\"[\\\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20194550.png1699119484443?alt=media&token=baa48203-3958-419d-b30d-d39d91a59fee\\\",\\\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20164131.png1699119455661?alt=media&token=ea5536a1-803f-49a1-8b3a-486d4fc113fd\\\"]\"},\"unit_amount\":29100}},{\"quantity\":1,\"price_data\":{\"currency\":\"inr\",\"product_data\":{\"name\":\"producvtt nsfe7\",\"images\":\"[\\\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20194550.png1699117885907?alt=media&token=84d4414c-eebf-4cd5-b20a-055d62ffe53e\\\"]\"},\"unit_amount\":86700}}]', '2023-11-11 18:30:35', '2023-11-11 18:30:35'),
(42, 'Prashant Srivastav', '97', 'srivastavp891@gmail.com', 'wsx', '+919984529509', '', '272203', 'jeetpur, Birdpur no. 13, Naugarh', 'India', 'confirm', 0, '[{\"quantity\":1,\"price_data\":{\"currency\":\"inr\",\"product_data\":{\"name\":\"producvtt nsfe8\",\"images\":\"[\\\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20194550.png1699119484443?alt=media&token=baa48203-3958-419d-b30d-d39d91a59fee\\\",\\\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20164131.png1699119455661?alt=media&token=ea5536a1-803f-49a1-8b3a-486d4fc113fd\\\"]\"},\"unit_amount\":9700}}]', '2023-11-11 18:31:37', '2023-11-11 18:31:37'),
(43, 'Prashant Srivastav', '867', 'srivastavp891@gmail.com', 'wsx', '+919984529509', '', '272203', 'jeetpur, Birdpur no. 13, Naugarh', 'India', 'confirm', 0, '[{\"quantity\":1,\"price_data\":{\"currency\":\"inr\",\"product_data\":{\"name\":\"producvtt nsfe7\",\"images\":\"[\\\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20194550.png1699117885907?alt=media&token=84d4414c-eebf-4cd5-b20a-055d62ffe53e\\\"]\"},\"unit_amount\":86700}}]', '2023-11-11 18:33:08', '2023-11-11 18:33:08'),
(44, 'Prashant Srivastav', '194', 'srivastavp891@gmail.com', 'wsx', '+919984529509', '', '272203', 'jeetpur, Birdpur no. 13, Naugarh', 'India', 'canceled', 0, '[{\"quantity\":2,\"price_data\":{\"currency\":\"inr\",\"product_data\":{\"name\":\"producvtt nsfe8\",\"images\":\"[\\\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20194550.png1699119484443?alt=media&token=baa48203-3958-419d-b30d-d39d91a59fee\\\",\\\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20164131.png1699119455661?alt=media&token=ea5536a1-803f-49a1-8b3a-486d4fc113fd\\\"]\"},\"unit_amount\":19400}},{\"quantity\":2,\"price_data\":{\"currency\":\"inr\",\"product_data\":{\"name\":\"producvtt nsfe8\",\"images\":\"[\\\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20194550.png1699119484443?alt=media&token=baa48203-3958-419d-b30d-d39d91a59fee\\\",\\\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20164131.png1699119455661?alt=media&token=ea5536a1-803f-49a1-8b3a-486d4fc113fd\\\"]\"},\"unit_amount\":19400}}]', '2023-11-11 18:35:40', '2023-11-11 19:39:04'),
(45, 'Prashant Srivastav', '1061', 'srivastavp891@gmail.com', 'wsx', '+919984529509', '', '272203', 'jeetpur, Birdpur no. 13, Naugarh', 'India', 'confirm', 0, '[{\"quantity\":1,\"price_data\":{\"currency\":\"inr\",\"product_data\":{\"name\":\"producvtt nsfe7\",\"images\":\"[\\\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20194550.png1699117885907?alt=media&token=84d4414c-eebf-4cd5-b20a-055d62ffe53e\\\"]\"},\"unit_amount\":86700}},{\"quantity\":2,\"price_data\":{\"currency\":\"inr\",\"product_data\":{\"name\":\"producvtt nsfe8\",\"images\":\"[\\\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20194550.png1699119484443?alt=media&token=baa48203-3958-419d-b30d-d39d91a59fee\\\",\\\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20164131.png1699119455661?alt=media&token=ea5536a1-803f-49a1-8b3a-486d4fc113fd\\\"]\"},\"unit_amount\":19400}},{\"quantity\":2,\"price_data\":{\"currency\":\"inr\",\"product_data\":{\"name\":\"producvtt nsfe8\",\"images\":\"[\\\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20194550.png1699119484443?alt=media&token=baa48203-3958-419d-b30d-d39d91a59fee\\\",\\\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20164131.png1699119455661?alt=media&token=ea5536a1-803f-49a1-8b3a-486d4fc113fd\\\"]\"},\"unit_amount\":19400}}]', '2023-11-11 18:35:55', '2023-11-11 18:35:55'),
(46, 'Prashant Srivastav', '964', 'srivastavp891@gmail.com', 'wsx', '+919984529509', '', '272203', 'jeetpur, Birdpur no. 13, Naugarh', 'India', 'confirm', 0, '[{\"quantity\":1,\"price_data\":{\"currency\":\"inr\",\"product_data\":{\"name\":\"producvtt nsfe8\",\"images\":\"[\\\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20194550.png1699119484443?alt=media&token=baa48203-3958-419d-b30d-d39d91a59fee\\\",\\\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20164131.png1699119455661?alt=media&token=ea5536a1-803f-49a1-8b3a-486d4fc113fd\\\"]\"},\"unit_amount\":9700}},{\"quantity\":1,\"price_data\":{\"currency\":\"inr\",\"product_data\":{\"name\":\"producvtt nsfe7\",\"images\":\"[\\\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20194550.png1699117885907?alt=media&token=84d4414c-eebf-4cd5-b20a-055d62ffe53e\\\"]\"},\"unit_amount\":86700}}]', '2023-11-11 18:52:44', '2023-11-11 18:52:44'),
(47, 'Prashant Srivastav', '97', 'srivastavp891@gmail.com', 'wsx', '+919984529509', '', '272203', 'jeetpur, Birdpur no. 13, Naugarh', 'India', 'confirm', 0, '[{\"quantity\":1,\"price_data\":{\"currency\":\"inr\",\"product_data\":{\"name\":\"producvtt nsfe8\",\"images\":\"[\\\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20194550.png1699119484443?alt=media&token=baa48203-3958-419d-b30d-d39d91a59fee\\\",\\\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20164131.png1699119455661?alt=media&token=ea5536a1-803f-49a1-8b3a-486d4fc113fd\\\"]\"},\"unit_amount\":9700}}]', '2023-11-11 18:52:59', '2023-11-11 18:52:59'),
(48, 'Prashant Srivastav', '964', 'srivastavp891@gmail.com', 'wsx', '+919984529509', '', '272203', 'jeetpur, Birdpur no. 13, Naugarh', 'India', 'confirm', 0, '[{\"quantity\":1,\"price_data\":{\"currency\":\"inr\",\"product_data\":{\"name\":\"producvtt nsfe8\",\"images\":\"[\\\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20194550.png1699119484443?alt=media&token=baa48203-3958-419d-b30d-d39d91a59fee\\\",\\\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20164131.png1699119455661?alt=media&token=ea5536a1-803f-49a1-8b3a-486d4fc113fd\\\"]\"},\"unit_amount\":97}},{\"quantity\":1,\"price_data\":{\"currency\":\"inr\",\"product_data\":{\"name\":\"producvtt nsfe7\",\"images\":\"[\\\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20194550.png1699117885907?alt=media&token=84d4414c-eebf-4cd5-b20a-055d62ffe53e\\\"]\"},\"unit_amount\":867}}]', '2023-11-11 19:05:28', '2023-11-11 19:05:28'),
(49, 'Prashant Srivastav', '2031', 'srivastavp891@gmail.com', 'wsx', '+919984529509', '', '272203', 'jeetpur, Birdpur no. 13, Naugarh', 'India', 'delivered', 0, '[{\"quantity\":12,\"price_data\":{\"currency\":\"inr\",\"product_data\":{\"name\":\"producvtt nsfe8\",\"images\":\"[\\\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20194550.png1699119484443?alt=media&token=baa48203-3958-419d-b30d-d39d91a59fee\\\",\\\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20164131.png1699119455661?alt=media&token=ea5536a1-803f-49a1-8b3a-486d4fc113fd\\\"]\"},\"unit_amount\":1164}},{\"quantity\":1,\"price_data\":{\"currency\":\"inr\",\"product_data\":{\"name\":\"producvtt nsfe7\",\"images\":\"[\\\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20194550.png1699117885907?alt=media&token=84d4414c-eebf-4cd5-b20a-055d62ffe53e\\\"]\"},\"unit_amount\":867}},{\"quantity\":12,\"price_data\":{\"currency\":\"inr\",\"product_data\":{\"name\":\"producvtt nsfe8\",\"images\":\"[\\\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20194550.png1699119484443?alt=media&token=baa48203-3958-419d-b30d-d39d91a59fee\\\",\\\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20164131.png1699119455661?alt=media&token=ea5536a1-803f-49a1-8b3a-486d4fc113fd\\\"]\"},\"unit_amount\":1164}},{\"quantity\":12,\"price_data\":{\"currency\":\"inr\",\"product_data\":{\"name\":\"producvtt nsfe8\",\"images\":\"[\\\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20194550.png1699119484443?alt=media&token=baa48203-3958-419d-b30d-d39d91a59fee\\\",\\\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20164131.png1699119455661?alt=media&token=ea5536a1-803f-49a1-8b3a-486d4fc113fd\\\"]\"},\"unit_amount\":1164}},{\"quantity\":12,\"price_data\":{\"currency\":\"inr\",\"product_data\":{\"name\":\"producvtt nsfe8\",\"images\":\"[\\\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20194550.png1699119484443?alt=media&token=baa48203-3958-419d-b30d-d39d91a59fee\\\",\\\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20164131.png1699119455661?alt=media&token=ea5536a1-803f-49a1-8b3a-486d4fc113fd\\\"]\"},\"unit_amount\":1164}},{\"quantity\":12,\"price_data\":{\"currency\":\"inr\",\"product_data\":{\"name\":\"producvtt nsfe8\",\"images\":\"[\\\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20194550.png1699119484443?alt=media&token=baa48203-3958-419d-b30d-d39d91a59fee\\\",\\\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20164131.png1699119455661?alt=media&token=ea5536a1-803f-49a1-8b3a-486d4fc113fd\\\"]\"},\"unit_amount\":1164}},{\"quantity\":12,\"price_data\":{\"currency\":\"inr\",\"product_data\":{\"name\":\"producvtt nsfe8\",\"images\":\"[\\\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20194550.png1699119484443?alt=media&token=baa48203-3958-419d-b30d-d39d91a59fee\\\",\\\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20164131.png1699119455661?alt=media&token=ea5536a1-803f-49a1-8b3a-486d4fc113fd\\\"]\"},\"unit_amount\":1164}},{\"quantity\":12,\"price_data\":{\"currency\":\"inr\",\"product_data\":{\"name\":\"producvtt nsfe8\",\"images\":\"[\\\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20194550.png1699119484443?alt=media&token=baa48203-3958-419d-b30d-d39d91a59fee\\\",\\\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20164131.png1699119455661?alt=media&token=ea5536a1-803f-49a1-8b3a-486d4fc113fd\\\"]\"},\"unit_amount\":1164}},{\"quantity\":12,\"price_data\":{\"currency\":\"inr\",\"product_data\":{\"name\":\"producvtt nsfe8\",\"images\":\"[\\\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20194550.png1699119484443?alt=media&token=baa48203-3958-419d-b30d-d39d91a59fee\\\",\\\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20164131.png1699119455661?alt=media&token=ea5536a1-803f-49a1-8b3a-486d4fc113fd\\\"]\"},\"unit_amount\":1164}},{\"quantity\":12,\"price_data\":{\"currency\":\"inr\",\"product_data\":{\"name\":\"producvtt nsfe8\",\"images\":\"[\\\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20194550.png1699119484443?alt=media&token=baa48203-3958-419d-b30d-d39d91a59fee\\\",\\\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20164131.png1699119455661?alt=media&token=ea5536a1-803f-49a1-8b3a-486d4fc113fd\\\"]\"},\"unit_amount\":1164}},{\"quantity\":12,\"price_data\":{\"currency\":\"inr\",\"product_data\":{\"name\":\"producvtt nsfe8\",\"images\":\"[\\\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20194550.png1699119484443?alt=media&token=baa48203-3958-419d-b30d-d39d91a59fee\\\",\\\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20164131.png1699119455661?alt=media&token=ea5536a1-803f-49a1-8b3a-486d4fc113fd\\\"]\"},\"unit_amount\":1164}},{\"quantity\":12,\"price_data\":{\"currency\":\"inr\",\"product_data\":{\"name\":\"producvtt nsfe8\",\"images\":\"[\\\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20194550.png1699119484443?alt=media&token=baa48203-3958-419d-b30d-d39d91a59fee\\\",\\\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20164131.png1699119455661?alt=media&token=ea5536a1-803f-49a1-8b3a-486d4fc113fd\\\"]\"},\"unit_amount\":1164}},{\"quantity\":12,\"price_data\":{\"currency\":\"inr\",\"product_data\":{\"name\":\"producvtt nsfe8\",\"images\":\"[\\\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20194550.png1699119484443?alt=media&token=baa48203-3958-419d-b30d-d39d91a59fee\\\",\\\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20164131.png1699119455661?alt=media&token=ea5536a1-803f-49a1-8b3a-486d4fc113fd\\\"]\"},\"unit_amount\":1164}}]', '2023-11-11 19:06:26', '2023-11-11 19:35:20'),
(50, 'Prashant Srivastav', '1643', 'srivastavp891@gmail.com', 'wsx', '+919984529509', '', '272203', 'jeetpur, Birdpur no. 13, Naugarh', 'India', 'confirm', 0, '[{\"quantity\":8,\"price_data\":{\"currency\":\"inr\",\"product_data\":{\"name\":\"producvtt nsfe8\",\"images\":\"[\\\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20194550.png1699119484443?alt=media&token=baa48203-3958-419d-b30d-d39d91a59fee\\\",\\\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20164131.png1699119455661?alt=media&token=ea5536a1-803f-49a1-8b3a-486d4fc113fd\\\"]\"},\"unit_amount\":776}},{\"quantity\":1,\"price_data\":{\"currency\":\"inr\",\"product_data\":{\"name\":\"producvtt nsfe7\",\"images\":\"[\\\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20194550.png1699117885907?alt=media&token=84d4414c-eebf-4cd5-b20a-055d62ffe53e\\\"]\"},\"unit_amount\":867}}]', '2023-11-11 19:11:32', '2023-11-11 19:11:32'),
(51, 'Prashant Srivastav', '20905', 'srivastavp891@gmail.com', 'wsx', '+919984529509', '', '272203', 'jeetpur, Birdpur no. 13, Naugarh', 'India', 'confirm', 0, '[{\"quantity\":1,\"price_data\":{\"currency\":\"inr\",\"product_data\":{\"name\":\"producvtt nsfe8\",\"images\":\"[\\\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20194550.png1699119484443?alt=media&token=baa48203-3958-419d-b30d-d39d91a59fee\\\",\\\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20164131.png1699119455661?alt=media&token=ea5536a1-803f-49a1-8b3a-486d4fc113fd\\\"]\"},\"unit_amount\":97}},{\"quantity\":24,\"price_data\":{\"currency\":\"inr\",\"product_data\":{\"name\":\"producvtt nsfe7\",\"images\":\"[\\\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20194550.png1699117885907?alt=media&token=84d4414c-eebf-4cd5-b20a-055d62ffe53e\\\"]\"},\"unit_amount\":20808}}]', '2023-11-11 19:45:06', '2023-11-11 19:45:06'),
(52, 'Prashant Srivastav', '97', 'srivastavp891@gmail.com', 'wsx', '+919984529509', '', '272203', 'jeetpur, Birdpur no. 13, Naugarh', 'India', 'confirm', 0, '[{\"quantity\":1,\"price_data\":{\"currency\":\"inr\",\"product_data\":{\"name\":\"producvtt nsfe8\",\"images\":\"[\\\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20194550.png1699119484443?alt=media&token=baa48203-3958-419d-b30d-d39d91a59fee\\\",\\\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20164131.png1699119455661?alt=media&token=ea5536a1-803f-49a1-8b3a-486d4fc113fd\\\"]\"},\"unit_amount\":97}}]', '2023-11-13 16:09:21', '2023-11-13 16:09:21');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`images`)),
  `category` varchar(50) DEFAULT NULL,
  `properties` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`properties`)),
  `isDeleted` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`_id`, `title`, `description`, `price`, `images`, `category`, `properties`, `isDeleted`, `created_at`, `updated_at`) VALUES
(1, 'producvtt nsfe', 'f g  d sfg  dfg ; sdfg sdfgl kdsfh gdhfghsdfg', 8690.00, '[]', 'xrfg', '\"\"', 1, '2023-11-04 14:19:15', '2023-11-04 17:37:17'),
(2, 'producvtt', 'kjghk', 97.00, NULL, 'edf', '\"\"', 1, '2023-11-04 14:20:00', '2023-11-04 17:37:18'),
(3, 'dfg', 'drt', 456.00, NULL, 'xrfg', '\"\"', 1, '2023-11-04 14:21:08', '2023-11-04 17:37:19'),
(4, 'producvtt nsfe', 'hjh gh hgg', 87.00, '[\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20194550.png1699107789205?alt=media&token=33127225-d1ca-44e6-bf07-1e48eb2fd3cc\"]', 'fx', '\"\"', 1, '2023-11-04 14:23:20', '2023-11-04 17:37:20'),
(5, 'producvtt nsfe 5', 'sdfg dfr', 87.00, '[\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20164131.png1699107816679?alt=media&token=ed9012c5-79a5-40f8-a0f2-19a510d3b124\",\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20194550.png1699107819757?alt=media&token=62c01fd0-d9f1-4cc3-9399-f0979daee26d\"]', 'edf', '\"xdf\"', 1, '2023-11-04 14:23:44', '2023-11-04 17:37:21'),
(6, 'producvtt nsfe6', 'jhnxzdfh  sdffjk v', 34.00, '[\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20194550.png1699116656619?alt=media&token=8cf40868-a1c0-47f5-93de-7a1ad57e1b17\"]', 'lower3', '\"\\\"xdf\\\"\"', 1, '2023-11-04 16:51:09', '2023-11-04 17:37:10'),
(7, 'producvtt nsfe7', 'jhgh86', 867.00, '[\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20194550.png1699117885907?alt=media&token=84d4414c-eebf-4cd5-b20a-055d62ffe53e\"]', 'lower3', '[{\"name\":\"gdfd\",\"parent\":\"4dfcfg\"},{\"name\":\"hello\",\"parent\":\"hi\"},{\"name\":\"xdf\",\"parent\":\"sehf\"},{\"name\":\"storage\",\"parent\":\"512GB\"},{\"name\":\"Storage\",\"parent\":\"250GB\"}]', 1, '2023-11-04 17:11:34', '2023-11-13 17:03:38'),
(8, 'producvtt nsfe8', 'bjh9877', 97.00, '[\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20194550.png1699119484443?alt=media&token=baa48203-3958-419d-b30d-d39d91a59fee\",\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-04%20164131.png1699119455661?alt=media&token=ea5536a1-803f-49a1-8b3a-486d4fc113fd\"]', 'lower3', '[{\"name\":\"storage\",\"parent\":\"512GB\"}]', 1, '2023-11-04 17:37:46', '2023-11-13 17:03:40'),
(9, '', '', 0.00, '[]', '', '[{\"name\":\"Storage\",\"parent\":\"250GB\"},{\"name\":\"storage\",\"parent\":\"512GB\"},{\"name\":\"gdfd\",\"parent\":\"4dfcfg\"},{\"name\":\"hello\",\"parent\":\"hi\"}]', 1, '2023-11-04 17:50:30', '2023-11-04 17:50:33'),
(10, 'product 1', 'product 1 to be checked.', 1211.00, '[\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-08%20130709.png1699892755675?alt=media&token=2001e735-5068-4b3f-bb64-005986d46c95\",\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-08%20131214.png1699892758976?alt=media&token=931e2fa9-ebd2-4b82-a8ee-8ab365690eb8\",\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-08%20131336.png1699892762551?alt=media&token=c0e0e765-946e-455c-9b01-9442076a0844\",\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-08%20131405.png1699892765417?alt=media&token=a08d1880-72e4-47b7-88b0-395d2f49966e\",\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-08%20132105.png1699892767061?alt=media&token=642ea1d2-694f-4c76-a343-60618ebdf060\"]', 'lower3', '[{\"name\":\"hello\",\"parent\":\"hi\"},{\"name\":\"gdfd\",\"parent\":\"4dfcfg\"},{\"name\":\"storage\",\"parent\":\"512GB\"}]', 1, '2023-11-13 16:26:22', '2023-11-13 17:03:42'),
(11, 'product 2', 'product 2 description', 123.00, '[\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-13%20222652.png1699894976055?alt=media&token=eb292e6a-7c88-4717-8f47-5fe35268d68e\",\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-13%20222652.png1699894995755?alt=media&token=d87d5483-751d-4d3f-b9cc-223eba765425\"]', 'lower3', '[{\"name\":\"gdfd\",\"parent\":\"4dfcfg\"},{\"name\":\"storage\",\"parent\":\"512GB\"}]', 0, '2023-11-13 17:03:35', '2023-11-13 17:03:35'),
(12, 'product 3', 'product 3 description here', 434.00, '[\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-13%20223410.png1699895059712?alt=media&token=5249c4e2-2dd7-4d8a-8a2c-08874e169be9\",\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-13%20222652.png1699895040770?alt=media&token=9e727e2b-697f-4dc3-91fd-54ddfcc07b05\"]', 'edf', '[{\"name\":\"storage\",\"parent\":\"512GB\"},{\"name\":\"Storage\",\"parent\":\"250GB\"}]', 0, '2023-11-13 17:04:45', '2023-11-13 17:05:54'),
(13, 'product 4', 'product 4 detail descrrioption', 232.00, '[\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-13%20222652.png1699895105684?alt=media&token=fb7484b0-c093-400d-a97b-e5aaaf03af26\",\"https://firebasestorage.googleapis.com/v0/b/kloth-ffea7.appspot.com/o/images%2FScreenshot%202023-11-13%20223410.png1699895117976?alt=media&token=f01b3eb5-e066-4265-b26e-deae354081db\"]', 'edf', '[{\"name\":\"storage\",\"parent\":\"512GB\"},{\"name\":\"Storage\",\"parent\":\"250GB\"}]', 0, '2023-11-13 17:05:34', '2023-11-13 17:05:34');

-- --------------------------------------------------------

--
-- Table structure for table `properties`
--

CREATE TABLE `properties` (
  `_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `parent` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `properties`
--

INSERT INTO `properties` (`_id`, `name`, `parent`, `created_at`, `updated_at`) VALUES
(4, 'hello', 'hi', '2023-11-04 13:44:54', '2023-11-04 13:44:54'),
(5, 'gdfd', '4dfcfg', '2023-11-04 13:45:55', '2023-11-04 13:45:55'),
(6, 'storage', '512GB', '2023-11-04 17:32:33', '2023-11-04 17:32:33'),
(7, 'Storage', '250GB', '2023-11-04 17:32:51', '2023-11-04 17:32:51');

-- --------------------------------------------------------

--
-- Table structure for table `subscriptions`
--

CREATE TABLE `subscriptions` (
  `_id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `subscribed_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`_id`),
  ADD KEY `parent` (`parent`);

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`_id`),
  ADD KEY `parent` (`parent`);

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`_id`);

--
-- Indexes for table `properties`
--
ALTER TABLE `properties`
  ADD PRIMARY KEY (`_id`);

--
-- Indexes for table `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD PRIMARY KEY (`_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `properties`
--
ALTER TABLE `properties`
  MODIFY `_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `subscriptions`
--
ALTER TABLE `subscriptions`
  MODIFY `_id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
