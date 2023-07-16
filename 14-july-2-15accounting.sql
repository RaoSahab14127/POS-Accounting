-- MariaDB dump 10.19  Distrib 10.6.12-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: test
-- ------------------------------------------------------
-- Server version	10.6.12-MariaDB-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account_type`
--

DROP TABLE IF EXISTS `account_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account_type` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_type`
--

LOCK TABLES `account_type` WRITE;
/*!40000 ALTER TABLE `account_type` DISABLE KEYS */;
INSERT INTO `account_type` VALUES (1,'Assets'),(2,'Liability'),(3,'Revenue'),(4,'Expense'),(5,'Owner Equity');
/*!40000 ALTER TABLE `account_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `general_journal`
--

DROP TABLE IF EXISTS `general_journal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `general_journal` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_type_id` int(11) DEFAULT NULL,
  `transaction_type_id` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `account_type_id` (`account_type_id`),
  KEY `transaction_type_id` (`transaction_type_id`),
  CONSTRAINT `general_journal_ibfk_1` FOREIGN KEY (`account_type_id`) REFERENCES `account_type` (`id`),
  CONSTRAINT `general_journal_ibfk_2` FOREIGN KEY (`transaction_type_id`) REFERENCES `transaction_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `general_journal`
--

LOCK TABLES `general_journal` WRITE;
/*!40000 ALTER TABLE `general_journal` DISABLE KEYS */;
INSERT INTO `general_journal` VALUES (21,1,2,'2023-06-20',170.00,'Purchase product '),(22,1,1,'2023-06-20',170.00,'Get inventory from supplier'),(23,1,2,'2023-06-20',180.00,'Purchase product '),(24,1,1,'2023-06-20',180.00,'Get inventory from supplier'),(25,1,2,'2023-06-20',120.00,'Purchase product '),(26,1,1,'2023-06-20',120.00,'Get inventory from supplier'),(27,1,2,'2023-06-20',340.00,'Purchase product '),(28,1,1,'2023-06-20',340.00,'Get inventory from supplier'),(31,1,2,'2023-06-20',400.00,'Purchase product '),(32,1,1,'2023-06-20',400.00,'Get inventory from supplier'),(33,3,2,'2023-07-13',16.00,'sales'),(34,4,1,'2023-07-13',90.00,'cost of good sold'),(35,3,2,'2023-07-13',16.00,'sales'),(36,4,1,'2023-07-13',20.00,'cost of good sold'),(37,1,1,'2023-06-20',27000.00,'cash come from capital'),(38,5,2,'2023-06-20',27000.00,'owners investment'),(39,2,2,'2023-06-20',1000.00,'bank loan'),(40,1,1,'2023-06-20',1000.00,'cash from loan'),(41,2,2,'2023-06-20',90000.00,'bill expense'),(42,1,2,'2023-06-20',90000.00,'pay bill of current year'),(43,5,1,'2021-01-01',10000.00,'Initial Capital'),(44,1,2,'2021-01-01',10000.00,'Cash'),(45,1,1,'2021-01-01',5000.00,'Cash'),(46,2,2,'2021-01-01',5000.00,'Accounts Payable'),(47,1,1,'2021-01-01',2000.00,'Cash'),(48,3,2,'2021-01-01',2000.00,'Revenue'),(49,2,1,'2021-01-01',500.00,'Accounts Payable'),(50,1,2,'2021-01-01',500.00,'Cash'),(51,5,2,'1991-06-20',27000.00,'cash investment'),(52,1,1,'1991-12-20',27000.00,'owners capital cash coming'),(53,2,2,'1991-06-19',20.00,'salary given'),(54,1,2,'1991-06-19',20.00,'salary paid to employee'),(55,1,1,'1991-06-19',900.00,'loan money'),(56,2,2,'1991-06-19',900.00,'take loan'),(57,5,2,'1992-12-28',27000.00,'owners ny pesa invest kya'),(58,1,1,'1992-12-28',27000.00,'cash aya owner sy'),(59,5,2,'1989-12-28',27000.00,'owner sy invest kya'),(60,1,1,'1989-12-28',27000.00,'cash aya ownser sy'),(61,2,2,'1989-12-28',5.00,'paid salary to employee'),(62,1,2,'1989-12-28',5.00,'salary expense given'),(63,2,2,'1989-12-28',50.00,'take loan'),(64,1,1,'1989-12-28',50.00,'cash from loan');
/*!40000 ALTER TABLE `general_journal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory`
--

DROP TABLE IF EXISTS `inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inventory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `selling_price` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `inventory_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory`
--

LOCK TABLES `inventory` WRITE;
/*!40000 ALTER TABLE `inventory` DISABLE KEYS */;
INSERT INTO `inventory` VALUES (9,21,2,32.00),(10,22,11,64.00),(11,25,1,96.00),(12,23,14,16.00);
/*!40000 ALTER TABLE `inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoices`
--

DROP TABLE IF EXISTS `invoices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `invoices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `supplier_id` int(11) DEFAULT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `date` date NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `supplier_id` (`supplier_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `invoices_ibfk_1` FOREIGN KEY (`supplier_id`) REFERENCES `supplier` (`id`),
  CONSTRAINT `invoices_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoices`
--

LOCK TABLES `invoices` WRITE;
/*!40000 ALTER TABLE `invoices` DISABLE KEYS */;
INSERT INTO `invoices` VALUES (30,4,100.00,'2023-07-13',NULL),(31,4,80.00,'2023-07-13',NULL),(33,NULL,1000.00,'2023-07-13',6),(34,NULL,1000.00,'2023-07-13',6),(35,6,120.00,'2023-07-13',NULL),(36,NULL,96.00,'2023-07-13',6),(37,4,340.00,'2023-07-13',NULL),(38,NULL,80.00,'2023-07-13',6),(39,NULL,64.00,'2023-07-13',6),(40,4,400.00,'2023-07-13',NULL),(41,NULL,144.00,'2023-07-13',6),(42,NULL,32.00,'2023-07-13',6);
/*!40000 ALTER TABLE `invoices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock` int(11) NOT NULL,
  `supplier_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `supplier_id` (`supplier_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`supplier_id`) REFERENCES `supplier` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (21,'Product A',20.00,95,4),(22,'Product B',40.00,38,4),(23,'Product C',10.00,166,4),(24,'Product D',100.00,75,5),(25,'Product E',60.00,28,6);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sales`
--

DROP TABLE IF EXISTS `sales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sales` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `invoice_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `invoice_id` (`invoice_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `sales_ibfk_1` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`),
  CONSTRAINT `sales_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sales`
--

LOCK TABLES `sales` WRITE;
/*!40000 ALTER TABLE `sales` DISABLE KEYS */;
INSERT INTO `sales` VALUES (5,33,21,3,10000.00),(6,34,22,1,10000.00),(7,36,25,1,10000.00),(8,38,23,5,80.00),(9,39,23,4,64.00),(10,41,23,9,144.00),(11,42,23,2,32.00);
/*!40000 ALTER TABLE `sales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supplier`
--

DROP TABLE IF EXISTS `supplier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `supplier` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplier`
--

LOCK TABLES `supplier` WRITE;
/*!40000 ALTER TABLE `supplier` DISABLE KEYS */;
INSERT INTO `supplier` VALUES (4,'Supplier A','suppliera@example.com','1234567890'),(5,'Supplier B','supplierb@example.com','9876543210'),(6,'Supplier C','supplierc@example.com','4561237890');
/*!40000 ALTER TABLE `supplier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction_type`
--

DROP TABLE IF EXISTS `transaction_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transaction_type` (
  `id` int(11) NOT NULL,
  `name` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction_type`
--

LOCK TABLES `transaction_type` WRITE;
/*!40000 ALTER TABLE `transaction_type` DISABLE KEYS */;
INSERT INTO `transaction_type` VALUES (1,'Debit'),(2,'Credit');
/*!40000 ALTER TABLE `transaction_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('cashier','manager','admin') NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (6,'john_doe','password123','cashier','1234567890','john.doe@example.com'),(7,'jane_smith','password456','manager','9876543210','jane.smith@example.com'),(8,'admin','admin123','admin','5555555555','admin@example.com'),(9,'john_doe','password123','manager','1234567890','john.doe@example.com'),(10,'john_doe','password123','manager','1234567890','john.doe@example.com'),(11,'john_doe','password123','manager','1234567890','john.doe@example.com'),(12,'john_doe','password123','manager','1234567890','john.doe@example.com'),(13,'john_doe','password123','manager','1234567890','john.doe@example.com'),(14,'john_doe','password123','manager','1234567890','john.doe@example.com');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-14 14:13:14
