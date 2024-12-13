-- MySQL dump 10.13  Distrib 5.7.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: neoproduction
-- ------------------------------------------------------
-- Server version	5.7.40-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `additional_role`
--

DROP TABLE IF EXISTS `additional_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `additional_role` (
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `creation_date` date NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `addressmaster`
--

DROP TABLE IF EXISTS `addressmaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `addressmaster` (
  `srno` int(11) NOT NULL AUTO_INCREMENT,
  `studentid` int(11) DEFAULT NULL,
  `address` varchar(350) DEFAULT NULL,
  `postoffice` varchar(250) DEFAULT NULL,
  `pincode` int(11) DEFAULT NULL,
  `policestation` varchar(100) DEFAULT NULL,
  `municipality` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`srno`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `collegemaster`
--

DROP TABLE IF EXISTS `collegemaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `collegemaster` (
  `Coll_ID` int(11) NOT NULL AUTO_INCREMENT,
  `collegename` varchar(200) NOT NULL,
  `collegeemail` varchar(150) NOT NULL,
  `collegephone` bigint(20) DEFAULT NULL,
  `contactperson` varchar(200) DEFAULT NULL,
  `personphone` bigint(20) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `comments` varchar(300) DEFAULT NULL,
  `mail_status` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Coll_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `csr_approval`
--

DROP TABLE IF EXISTS `csr_approval`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `csr_approval` (
  `studentId` int(11) NOT NULL,
  `approverId` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `comments` varchar(200) NOT NULL DEFAULT 'default',
  `approval_Date` date NOT NULL,
  `approval_time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `educationmaster`
--

DROP TABLE IF EXISTS `educationmaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `educationmaster` (
  `srno` int(11) NOT NULL AUTO_INCREMENT,
  `studentid` int(11) DEFAULT NULL,
  `xschool` varchar(350) DEFAULT NULL,
  `xboard` varchar(250) DEFAULT NULL,
  `xmarks` float DEFAULT NULL,
  `xiischool` varchar(250) DEFAULT NULL,
  `xiiboard` varchar(100) DEFAULT NULL,
  `xiimarks` float DEFAULT NULL,
  `x_passing_year` date DEFAULT NULL,
  `xii_passing_year` date DEFAULT NULL,
  `last_exam` varchar(100) DEFAULT NULL,
  `last_exam_year` date DEFAULT NULL,
  `last_college` varchar(100) DEFAULT NULL,
  `last_marks` float DEFAULT NULL,
  PRIMARY KEY (`srno`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `fathermaster`
--

DROP TABLE IF EXISTS `fathermaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fathermaster` (
  `srno` int(11) NOT NULL AUTO_INCREMENT,
  `studentid` int(11) DEFAULT NULL,
  `name` varchar(250) DEFAULT NULL,
  `occupation` varchar(250) DEFAULT NULL,
  `income` decimal(10,0) DEFAULT NULL,
  `phone` decimal(10,0) DEFAULT NULL,
  `officeaddress` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`srno`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `fund_master`
--

DROP TABLE IF EXISTS `fund_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fund_master` (
  `srno` int(11) NOT NULL AUTO_INCREMENT,
  `financial_year` varchar(100) NOT NULL,
  `current_year_fund` float NOT NULL,
  `prev_year_balance` float NOT NULL,
  `total_balance` float NOT NULL,
  `allocator_id` int(11) NOT NULL,
  `send_date` date NOT NULL,
  `approval_status` int(11) NOT NULL DEFAULT '0',
  `approver_id` int(11) DEFAULT NULL,
  `approval_date` date NOT NULL,
  `comment` varchar(200) DEFAULT NULL,
  `emailFile` varchar(250) DEFAULT 'null',
  PRIMARY KEY (`srno`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `interview_feedback`
--

DROP TABLE IF EXISTS `interview_feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `interview_feedback` (
  `studentId` int(11) NOT NULL,
  `interviewerId` int(11) NOT NULL,
  `subject_knowledge` float NOT NULL DEFAULT '0',
  `communication` float NOT NULL DEFAULT '0',
  `conviction` float NOT NULL DEFAULT '0',
  `aspiration` float NOT NULL DEFAULT '0',
  `eligibility` float NOT NULL DEFAULT '0',
  `total` float NOT NULL DEFAULT '0',
  `remarks` int(11) NOT NULL DEFAULT '0',
  `comments` varchar(200) NOT NULL DEFAULT 'default',
  `int_Date` date NOT NULL,
  `int_time` time NOT NULL,
  `interview_feedback_status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `interviewerdetails`
--

DROP TABLE IF EXISTS `interviewerdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `interviewerdetails` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `interviewerId` int(11) NOT NULL,
  `HigherEducation` varchar(200) NOT NULL,
  `stream` varchar(150) NOT NULL,
  `phone` bigint(20) NOT NULL,
  `address` varchar(300) NOT NULL,
  `position` varchar(100) NOT NULL,
  `photo` varchar(200) NOT NULL,
  `experience` varchar(200) NOT NULL,
  `lastcompany` varchar(100) NOT NULL,
  `gender` varchar(50) NOT NULL,
  `others` varchar(300) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `md_approval`
--

DROP TABLE IF EXISTS `md_approval`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `md_approval` (
  `studentId` int(11) NOT NULL,
  `approverId` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `comments` varchar(200) NOT NULL DEFAULT 'default',
  `approval_Date` date NOT NULL,
  `approval_time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `mentordetails`
--

DROP TABLE IF EXISTS `mentordetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mentordetails` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mentorId` int(11) NOT NULL,
  `HigherEducation` varchar(200) NOT NULL,
  `stream` varchar(150) NOT NULL,
  `phone` bigint(20) NOT NULL,
  `address` varchar(300) NOT NULL,
  `position` varchar(100) NOT NULL,
  `experience` varchar(200) NOT NULL,
  `lastcompany` varchar(100) NOT NULL,
  `gender` varchar(50) NOT NULL,
  `others` varchar(300) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `message` (
  `id` int(50) NOT NULL AUTO_INCREMENT,
  `receiverid` int(50) DEFAULT NULL,
  `messages` varchar(250) DEFAULT NULL,
  `time` varchar(100) DEFAULT NULL,
  `senderid` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `mothermaster`
--

DROP TABLE IF EXISTS `mothermaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mothermaster` (
  `srno` int(11) NOT NULL AUTO_INCREMENT,
  `studentid` int(11) DEFAULT NULL,
  `name` varchar(250) DEFAULT NULL,
  `occupation` varchar(250) DEFAULT NULL,
  `income` decimal(10,0) DEFAULT NULL,
  `phone` decimal(10,0) DEFAULT NULL,
  `officeaddress` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`srno`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `neo`
--

DROP TABLE IF EXISTS `neo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `neo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) DEFAULT NULL,
  `mypassword` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `neoadminlogin`
--

DROP TABLE IF EXISTS `neoadminlogin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `neoadminlogin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) DEFAULT NULL,
  `mypassword` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `neofiles`
--

DROP TABLE IF EXISTS `neofiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `neofiles` (
  `srno` int(11) NOT NULL AUTO_INCREMENT,
  `studentid` int(11) DEFAULT NULL,
  `psp` varchar(250) DEFAULT NULL,
  `pap` varchar(250) DEFAULT NULL,
  `fip` varchar(100) DEFAULT NULL,
  `mip` varchar(100) DEFAULT NULL,
  `pop` varchar(100) DEFAULT NULL,
  `fbs` varchar(100) DEFAULT NULL,
  `mbs` varchar(100) DEFAULT NULL,
  `sbs` varchar(100) DEFAULT NULL,
  `adh` varchar(100) DEFAULT NULL,
  `msp` varchar(100) DEFAULT NULL,
  `ivf` varchar(100) DEFAULT NULL,
  `ia` varchar(100) DEFAULT NULL,
  `fsc` varchar(100) DEFAULT NULL,
  `id` varchar(100) NOT NULL,
  `marks_doc` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`srno`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notification` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `collegename` varchar(200) NOT NULL,
  `email` varchar(150) NOT NULL,
  `comments` varchar(300) NOT NULL,
  `cstatus` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `persons`
--

DROP TABLE IF EXISTS `persons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `persons` (
  `PersonID` int(11) DEFAULT NULL,
  `LastName` varchar(255) DEFAULT NULL,
  `FirstName` varchar(255) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `City` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `profilephoto`
--

DROP TABLE IF EXISTS `profilephoto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `profilephoto` (
  `srno` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) DEFAULT NULL,
  `profilepic` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`srno`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `rolemaster`
--

DROP TABLE IF EXISTS `rolemaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rolemaster` (
  `roleId` int(11) NOT NULL AUTO_INCREMENT,
  `roleName` varchar(200) NOT NULL,
  `accessList` json NOT NULL,
  `creationDate` varchar(100) NOT NULL,
  `status` int(10) NOT NULL DEFAULT '1',
  PRIMARY KEY (`roleId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `scholarshipmaster`
--

DROP TABLE IF EXISTS `scholarshipmaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `scholarshipmaster` (
  `srno` int(11) NOT NULL AUTO_INCREMENT,
  `studentid` int(11) DEFAULT NULL,
  `cof` varchar(250) DEFAULT NULL,
  `noc` varchar(250) DEFAULT NULL,
  `attclg` varchar(100) DEFAULT NULL,
  `ros` varchar(250) DEFAULT NULL,
  `clng` varchar(100) DEFAULT NULL,
  `str` varchar(250) DEFAULT NULL,
  `ces` varchar(250) DEFAULT NULL,
  `sb` varchar(250) DEFAULT NULL,
  `aos` varchar(250) DEFAULT NULL,
  `oia` varchar(250) DEFAULT NULL,
  `fut` varchar(250) DEFAULT NULL,
  `subjects` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`srno`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `st_intvw_schedule`
--

DROP TABLE IF EXISTS `st_intvw_schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `st_intvw_schedule` (
  `serialno` int(11) NOT NULL AUTO_INCREMENT,
  `Student_id` int(11) NOT NULL,
  `coll_id` int(11) NOT NULL,
  `slot_id` int(11) NOT NULL,
  `Slot_date` date NOT NULL,
  `Slot_time` time NOT NULL,
  `panelist_id` json DEFAULT NULL,
  `Role` json DEFAULT NULL,
  `Sys_date` date DEFAULT NULL,
  `mail_send_to_std` int(11) DEFAULT '0',
  `mail_send_date_to_std` date DEFAULT NULL,
  `mail_send_to_interviewer` int(11) DEFAULT '0',
  `status` int(11) DEFAULT '0',
  `interviewer_mail_date` date DEFAULT NULL,
  `coord_role_id` int(10) NOT NULL,
  PRIMARY KEY (`serialno`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `std_send_for_interview_to_panel`
--

DROP TABLE IF EXISTS `std_send_for_interview_to_panel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `std_send_for_interview_to_panel` (
  `serialno` int(11) NOT NULL AUTO_INCREMENT,
  `Student_id` json NOT NULL,
  `coll_id` int(11) NOT NULL,
  `Send_to_panel_id` int(11) NOT NULL,
  `panel_role` int(11) DEFAULT NULL,
  `send_date` date NOT NULL,
  `coord_id` int(11) DEFAULT NULL,
  `coord_role` int(11) DEFAULT NULL,
  `send_status` int(11) DEFAULT '0',
  PRIMARY KEY (`serialno`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `student_external_enquiry`
--

DROP TABLE IF EXISTS `student_external_enquiry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `student_external_enquiry` (
  `srno` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) DEFAULT NULL,
  `college` varchar(250) DEFAULT NULL,
  `address` varchar(250) DEFAULT NULL,
  `phone` decimal(10,0) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `grade` varchar(100) DEFAULT NULL,
  `marks` float DEFAULT NULL,
  `ref_person` varchar(200) DEFAULT NULL,
  `status` int(11) DEFAULT '0',
  `application_date` date DEFAULT NULL,
  PRIMARY KEY (`srno`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `student_initial_screening`
--

DROP TABLE IF EXISTS `student_initial_screening`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `student_initial_screening` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `coll_id` int(11) NOT NULL,
  `stu_id` int(11) NOT NULL,
  `snamestatus` int(11) DEFAULT '0',
  `sphonestatus` int(11) DEFAULT '0',
  `sgradestatus` int(11) DEFAULT '0',
  `smarksstatus` int(11) DEFAULT '0',
  `1comments` varchar(250) DEFAULT NULL,
  `2comments` varchar(250) DEFAULT NULL,
  `f_user_id` int(11) DEFAULT NULL,
  `second_user_id` int(11) DEFAULT NULL,
  `semailstatus` int(11) DEFAULT '0',
  `first_approval_date` date DEFAULT NULL,
  `final_approval_date` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `studentmaster`
--

DROP TABLE IF EXISTS `studentmaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `studentmaster` (
  `srno` int(11) NOT NULL AUTO_INCREMENT,
  `studentid` int(11) DEFAULT NULL,
  `name` varchar(250) DEFAULT NULL,
  `dob` varchar(250) DEFAULT NULL,
  `phone` decimal(10,0) DEFAULT NULL,
  `altphone` int(11) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `gender` varchar(100) DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`srno`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `studentnotification`
--

DROP TABLE IF EXISTS `studentnotification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `studentnotification` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `studentname` varchar(200) NOT NULL,
  `email` varchar(150) NOT NULL,
  `comments` varchar(300) NOT NULL,
  `sstatus` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `upload_student_details`
--

DROP TABLE IF EXISTS `upload_student_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `upload_student_details` (
  `serialno` int(11) NOT NULL AUTO_INCREMENT,
  `collegeid` int(11) NOT NULL,
  `studentname` varchar(200) NOT NULL,
  `grade` varchar(150) NOT NULL,
  `studentphone` bigint(20) NOT NULL,
  `studentmarks` float NOT NULL,
  `remarks` varchar(300) NOT NULL,
  `submit_stage` int(11) NOT NULL DEFAULT '0' COMMENT '2-Final_approve',
  `final_approved_status` int(11) NOT NULL DEFAULT '0',
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`serialno`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `usermaster`
--

DROP TABLE IF EXISTS `usermaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usermaster` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `userEmail` varchar(200) NOT NULL,
  `uPassword` varchar(100) NOT NULL,
  `creationDate` varchar(100) NOT NULL,
  `roleId` int(10) NOT NULL,
  `firstname` varchar(200) NOT NULL,
  `lastname` varchar(200) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1' COMMENT '0 - INACTIVE, 1 - ACTIVE',
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-02 19:58:04
-- MySQL dump 10.13  Distrib 5.7.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: neoproduction
-- ------------------------------------------------------
-- Server version	5.7.40-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping routines for database 'neoproduction'
--
/*!50003 DROP PROCEDURE IF EXISTS `additional_role_sp` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `additional_role_sp`(IN dbmode INT, IN userid INT, IN roleid INT, IN cdate DATE)
begin
	DECLARE usertable int;
    IF dbmode = 1 THEN
        INSERT INTO neoproduction.additional_role (user_id, role_id, creation_date)
        VALUES (userid, roleid, cdate);
    ELSEIF dbmode = 2 then
    SET usertable = 1;
        select r.roleName,r.accessList,r.roleId,u.status,usertable,u.userEmail,u.userId
        FROM usermaster u
        JOIN rolemaster r ON u.roleId = r.roleId
        WHERE u.userId = userid
        union
  
        SELECT r.roleName,r.accessList,r.roleId,a.status,usertable=0,u.userEmail,u.userId
        FROM additional_role a
        JOIN rolemaster r ON a.role_id = r.roleId
        JOIN usermaster u ON a.user_id = u.userId
        WHERE a.user_id = userid;
    ELSEIF dbmode = 3 then
    SET usertable = 1;
        SELECT r.roleName,r.accessList,r.roleId,u.status,usertable,u.userEmail,u.userId
        FROM usermaster u
        JOIN rolemaster r ON u.roleId = r.roleId
        WHERE u.userId = userid;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `checkAddRole` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `checkAddRole`(IN userid INT, OUT isPresent INT)
BEGIN
    DECLARE countRows INT;

    SELECT COUNT(*) INTO countRows
    FROM neoproduction.additional_role ar 
    WHERE ar.user_id = userid;

    IF countRows > 0 THEN
        SET isPresent = 1;
    ELSE
        SET isPresent = 0;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `checkGlobalRoleStatus` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `checkGlobalRoleStatus`(IN roleid INT, OUT isPresent INT)
begin
	
    DECLARE Rowstat INT;

    SELECT r.status  INTO Rowstat
    FROM neoproduction.rolemaster r  
    WHERE r.roleId = roleid;

    IF Rowstat =1 then
    
        SET isPresent = 1;
    ELSE
        SET isPresent = 0;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CheckIfStudentDataExists` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `CheckIfStudentDataExists`(
    IN `sname` VARCHAR(200),
    IN `mail` VARCHAR(100),
    IN `sphone` BIGINT,
    IN `grd` VARCHAR(100),
    IN `mrk` FLOAT,
    OUT `errorCode` INT,
    OUT `errorStatus` VARCHAR(200)
)
BEGIN
    DECLARE studentNameExists INT DEFAULT 0;
    DECLARE emailExists INT DEFAULT 0;
    DECLARE gradeExists INT DEFAULT 0;
    DECLARE studentPhoneExists INT DEFAULT 0;
    DECLARE studentMarksExists INT DEFAULT 0;

    -- Check if student name already exists
    SELECT COUNT(*) INTO studentNameExists FROM upload_student_details WHERE studentname = sname;

    -- Check if email already exists
    SELECT COUNT(*) INTO emailExists FROM upload_student_details WHERE email = mail;

    -- Check if grade already exists
    SELECT COUNT(*) INTO gradeExists FROM upload_student_details WHERE grade = grd;

    -- Check if student phone already exists
    SELECT COUNT(*) INTO studentPhoneExists FROM upload_student_details WHERE studentphone = sphone;

    -- Check if student marks already exists
    SELECT COUNT(*) INTO studentMarksExists FROM upload_student_details WHERE studentmarks = mrk;

    IF studentNameExists > 0 THEN
        SET errorCode = 1;
        SET errorStatus = sname;
    ELSEIF emailExists > 0 THEN
        SET errorCode = 2;
        SET errorStatus = mail;
    ELSEIF studentPhoneExists > 0 THEN
        SET errorCode = 3;
        SET errorStatus = sphone;
    ELSE
        SET errorCode = 0;
        SET errorStatus = 'No constraints violated';
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `checkMentorId` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `checkMentorId`(IN mentorid INT, OUT isPresent INT)
BEGIN
    DECLARE countRows INT;

    SELECT COUNT(*) INTO countRows
    FROM neoproduction.mentordetails
    WHERE mentorId = mentorid;

    IF countRows > 0 THEN
        SET isPresent = 1;
    ELSE
        SET isPresent = 0;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `check_additional_role_exist` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `check_additional_role_exist`(IN userid INT, IN roleid INT, OUT isPresent INT)
BEGIN
    DECLARE usermaster_count INT;
    DECLARE additional_role_count INT;

    -- Count the number of rows in usermaster for the given userid and roleId
    SELECT COUNT(*) INTO usermaster_count
    FROM usermaster u
    WHERE u.userId = userid AND u.roleId = roleid;

    -- Count the number of rows in additional_role for the given userid and roleId
    SELECT COUNT(*) INTO additional_role_count
    FROM additional_role ar
    WHERE ar.user_id = userid AND ar.role_id = roleid;

    -- Set isPresent based on the counts for both tables
    IF usermaster_count > 0 OR additional_role_count > 0 THEN
        SET isPresent = 1;
    ELSE
        SET isPresent = 0;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `check_External_Student` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `check_External_Student`(IN phn bigint, in mail varchar(200), OUT isPresent INT)
BEGIN
    DECLARE countRows INT;

    SELECT COUNT(*) INTO countRows
    FROM neoproduction.student_external_enquiry see 
    WHERE see.phone = phn or see.email = mail;

    IF countRows > 0 THEN
        SET isPresent = 1;
    ELSE
        SET isPresent = 0;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `check_student_id_from_studentmaster` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `check_student_id_from_studentmaster`(IN stuid INT, OUT isPresent INT)
begin

    DECLARE countRows INT;

    SELECT COUNT(*) INTO countRows
    FROM neoproduction.studentmaster s where s.studentid = stuid;

    IF countRows > 0 THEN
        SET isPresent = 1;
    ELSE
        SET isPresent = 0;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `collegeid` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `collegeid`(nm VARCHAR(255), mail VARCHAR(255))
BEGIN
    SELECT Coll_ID FROM collegemaster WHERE collegename = nm AND collegeemail = mail;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `countstudent` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `countstudent`()
begin
	SELECT COUNT(*) as total_count FROM neoproduction.upload_student_details usd WHERE submit_stage =1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `createInterviewer` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `createInterviewer`(in interviewerid int(11),in highEdu varchar(200),in strm varchar(150),in mobile bigint(20),addrs varchar(300),posi varchar(200),picture varchar(200),expe varchar(200),lastcomp varchar(200),gndr varchar(50),oth varchar(300))
begin
	insert into interviewerdetails (interviewerId,HigherEducation,stream,phone,address,mposition,photo,experience,lastcompany,gender,othersM)
	values (interviewerid,highEdu,strm,mobile,addrs,posi,picture,expe,lastcomp,gndr,oth);
	
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `createMentor` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `createMentor`(
    IN dbmode INT,
    IN mentorid INT(11),
    IN highEdu VARCHAR(200),
    IN strm VARCHAR(150),
    IN mobile BIGINT(20),
    IN addrs VARCHAR(300),
    IN posi VARCHAR(200),
    IN expe VARCHAR(200),
    IN lastcomp VARCHAR(200),
    IN gndr VARCHAR(50),
    IN oth VARCHAR(300)
)
BEGIN
    IF dbmode = 1 THEN
        -- Insert new record
        INSERT INTO mentordetails (mentorId, HigherEducation, stream, phone, address, position, experience, lastcompany, gender, others)
        VALUES (mentorid, highEdu, strm, mobile, addrs, posi, expe, lastcomp, gndr, oth);
    ELSEIF dbmode = 2 THEN
        -- Update existing record
        UPDATE mentordetails
        SET
            HigherEducation = IF(highEdu <> '', highEdu, HigherEducation),
            stream = IF(strm <> '', strm, stream),
            phone = IFNULL(mobile, phone),
            address = IF(addrs <> '', addrs, address),
            position = IF(posi <> '', posi, position),
            experience = IF(expe <> '', expe, experience),
            lastcompany = IF(lastcomp <> '', lastcomp, lastcompany),
            gender = IF(gndr <> '', gndr, gender),
            others = IF(oth <> '', oth, others)
        WHERE mentorId = mentorid;
    ELSE
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid dbmode';
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `createRole` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `createRole`(in rolename varchar(200),in accesslist json,in cdate varchar(150),in rstatus int(10))
begin
	insert into rolemaster  (roleName,accessList,creationDate,status)
	values (rolename,accesslist,cdate,rstatus);
	
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `createuser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `createuser`(in useremail varchar(200),in upassword VARCHAR(200),in cdate varchar(150),in userid int(10),in fname VARCHAR(200),in lname VARCHAR(200))
begin
	insert into usermaster  (userEmail,uPassword,creationDate,roleId,firstname,lastname)
	values (useremail,upassword,cdate,userid,fname,lname);
	
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `csr_md_approval` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `csr_md_approval`(in dbmode int, in stuid int
,in appid int,in sts int, in cmnt varchar(200),in ap_date date,
in ap_time time)
begin
	if dbmode = 1 then 
		insert into neoproduction.csr_approval(studentId,approverId,status,comments,approval_Date,approval_time)
		values(stuid,appid,sts,cmnt,ap_date,ap_time);
	update neoproduction.st_intvw_schedule 
		set status = 3;
	elseif dbmode = 2 then 
		insert into neoproduction.md_approval (studentId,approverId,status,comments,approval_Date,approval_time)
		values(stuid,appid,sts,cmnt,ap_date,ap_time);
	update neoproduction.csr_approval 
		set status = 3;
	elseif dbmode = 3 then
		select sis.Student_id,sis.coll_id,sis.Slot_date,usd.studentname,s.email ,c.collegename, c.collegeemail 
		from neoproduction.st_intvw_schedule sis
		join neoproduction.upload_student_details usd on usd.serialno = sis.Student_id
		join neoproduction.collegemaster c on c.Coll_ID = sis.coll_id
		join neoproduction.studentmaster s on s.studentid = sis.Student_id 
		where sis.status = 2;
	elseif dbmode = 4 then
		select ca.studentId ,usd.studentname, s.email ,c.collegename, c.collegeemail ,sis.Slot_date from neoproduction.csr_approval ca
		join neoproduction.upload_student_details usd on usd.serialno = ca.studentId
		join neoproduction.collegemaster c on c.Coll_ID = usd.collegeid
		join neoproduction.st_intvw_schedule sis on sis.Student_id = ca.studentId 
		join neoproduction.studentmaster s on s.studentid = ca.studentId
		where ca.status =1;
	elseif dbmode = 5 then
		select if2.*,usd.studentname ,u.firstname ,u.lastname,r.roleName  from neoproduction.interview_feedback if2 
		join neoproduction.upload_student_details usd on usd.serialno = if2.studentId 
		join neoproduction.usermaster u on u.userId = if2.interviewerId
		join neoproduction.rolemaster r on r.roleId = u.roleId 
		where if2.studentId = stuid;
	
	elseif dbmode =6 then
		select r.roleName from neoproduction.additional_role ar 
		join neoproduction.rolemaster r on r.roleId =ar.role_id  
		where ar.user_id =appid;
	
	end if;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `external_student` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `external_student`(in dbmode int,in nm varchar(200),
in clg varchar (200),in addrs varchar (200),
in phn bigint,in mail varchar (200),
in grd varchar (100),in marks float,
in refp varchar (200),in appdate date,in tdate date)
begin
	
	if dbmode =1 then
		insert into neoproduction.student_external_enquiry (name, college,address,phone,email,grade
		,marks,ref_person,application_date)
	
		values(nm, clg, addrs
		,phn , mail , grd , marks ,
		refp , appdate);
		
	elseif dbmode =2 then
		select * from neoproduction.student_external_enquiry see where see.status = 0;
	
	elseif dbmode = 3 then
		select * from neoproduction.student_external_enquiry see where see.status = 0 and see.application_date between 
		appdate and tdate;
	
	elseif dbmode =4 then
		select * from neoproduction.student_external_enquiry see where see.status = 1;
	
	elseif dbmode =5 then
		select * from neoproduction.student_external_enquiry see where see.status = 2;
	
	elseif dbmode =6 then
		select * from neoproduction.student_external_enquiry see where see.status = 1 and see.application_date between 
	appdate and tdate;
	
	elseif dbmode =7 then
		select * from neoproduction.student_external_enquiry see where see.status = 2 and see.application_date between 
	appdate and tdate;

end if;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `external_student_update` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `external_student_update`(
    IN dbmode INT,
    in stuid int(11),
    IN clgid INT(11),
    IN nm VARCHAR(200),
    IN clg VARCHAR(200),
    IN phn BIGINT,
    IN mail VARCHAR(200),
    IN grd VARCHAR(100),
    IN marks FLOAT
)
BEGIN
    IF dbmode = 1 THEN
        INSERT INTO neoproduction.collegemaster (collegename, collegeemail, collegephone, contactperson, personphone, address, comments, mail_status)
        VALUES (clg, '', null, '', null, '', '', 'external');
    ELSEIF dbmode = 2 THEN
        INSERT INTO neoproduction.upload_student_details (collegeid, studentname, grade, studentphone,
        studentmarks,remarks , email)
        VALUES (clgid, nm, grd, phn, marks,'', mail);
        
        UPDATE neoproduction.student_external_enquiry see
        SET status = 1 where see.srno = stuid;
    ELSEIF dbmode = 3 THEN
        UPDATE neoproduction.student_external_enquiry see
        SET status = 2 where see.srno = stuid;
       
    elseif dbmode = 4 then
    	select * from neoproduction.student_external_enquiry see where see.srno = stuid;
    
    elseif dbmode = 5 then
    	select c.Coll_ID  from neoproduction.collegemaster c  where c.collegename = clg;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `fetchMentorDetails` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `fetchMentorDetails`(IN userid INT)
BEGIN
    SELECT n.creationDate,n.userEmail , n.userId, n.roleId, n.firstname, n.lastname, c.roleName, m.HigherEducation, m.stream, m.phone, m.address, m.position, m.experience, m.lastcompany, m.gender, m.others,p.profilepic  
    FROM neoproduction.usermaster n
    JOIN neoproduction.rolemaster c ON n.roleId = c.roleId
    JOIN neoproduction.mentordetails m ON m.mentorId = n.userId
    join neoproduction.profilephoto p on p.userid = n.userId 
    WHERE n.userId = userid;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `fetchRole` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `fetchRole`(in userid int)
begin
	SELECT n.creationDate,n.userId,n.userEmail  , n.roleId, n.firstname, n.lastname, c.roleName
    FROM neoproduction.usermaster n
    JOIN neoproduction.rolemaster c ON n.roleId = c.roleId
    WHERE n.userId  = userid;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `fetchUserdetails` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `fetchUserdetails`(IN userid INT)
BEGIN
    SELECT n.creationDate,n.userId,n.userEmail  , n.roleId, n.firstname, n.lastname, c.roleName
    FROM neoproduction.usermaster n
    JOIN neoproduction.rolemaster c ON n.roleId = c.roleId
    WHERE n.userId  = userid;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `fetchUsers` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `fetchUsers`()
begin
	SELECT n.creationDate,n.userId,n.userEmail  , n.roleId, n.firstname, n.lastname, c.roleName, n.status
    FROM neoproduction.usermaster n
    JOIN neoproduction.rolemaster c ON n.roleId = c.roleId;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `fetch_access_list` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `fetch_access_list`(in user_role_id int)
begin
	select * from neoproduction.rolemaster r where r.roleId = user_role_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Fetch_All_Students` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Fetch_All_Students`(IN dbmode INT)
BEGIN
    IF dbmode = 1 THEN
        SELECT usd.studentname, usd.grade, usd.studentphone,usd.submit_stage , usd.studentmarks, usd.remarks, usd.final_approved_status,
            usd.email, c.collegename
        FROM neoproduction.upload_student_details usd
        JOIN neoproduction.collegemaster c ON c.Coll_ID = usd.collegeid
        WHERE usd.submit_stage = 0;
    ELSEIF dbmode = 2 THEN
        SELECT usd.studentname, usd.grade, usd.studentphone,usd.submit_stage , usd.studentmarks, usd.remarks, usd.final_approved_status,
            usd.email, c.collegename
        FROM neoproduction.upload_student_details usd
        JOIN neoproduction.collegemaster c ON c.Coll_ID = usd.collegeid
        WHERE usd.submit_stage = 1;
    ELSEIF dbmode = 3 THEN
        SELECT usd.studentname, usd.grade, usd.studentphone,usd.submit_stage , usd.studentmarks, usd.remarks, usd.final_approved_status,
            usd.email, c.collegename
        FROM neoproduction.upload_student_details usd
        JOIN neoproduction.collegemaster c ON c.Coll_ID = usd.collegeid
        WHERE usd.submit_stage = 2;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getAllStudents` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getAllStudents`(in dbmode int, in col_id int, in stu_id int)
begin
	if dbmode =1 then
		select * from neoproduction.upload_student_details usd where usd.collegeid = col_id ;
	
	elseif dbmode =2 then
		select usd.submit_stage , sis.first_approval_date ,sis.final_approval_date ,
		usd.final_approved_status,usd.studentname ,sis2.status 
		from neoproduction.upload_student_details usd  
		join neoproduction.student_initial_screening sis on sis.stu_id = usd.serialno
		join neoproduction.st_intvw_schedule sis2 on sis2.Student_id = usd.serialno
		where usd.serialno = stu_id;
	
	elseif dbmode =3 then
		select sis.Slot_date ,sis.Sys_date, sis.status from neoproduction.st_intvw_schedule sis
	where sis.Student_id =stu_id; 
	
	elseif dbmode =4 then
		select ca.status ,ca.approval_Date  from neoproduction.csr_approval ca where ca.studentId = stu_id;
	
	elseif dbmode =5 then
		select ma.status ,ma.approval_Date from neoproduction.md_approval ma  where ma.studentId = stu_id;
	end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getAllUsersRole` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getAllUsersRole`()
BEGIN
    SELECT
        u.userId,
        u.firstname,
        u.lastname,
        u.roleId,
        GROUP_CONCAT(ar.role_id) AS role_ids,
        JSON_ARRAYAGG(rm.roleName) AS assignedRoles,
        rm2.roleName as userRole
    FROM
        neoproduction.usermaster u
    LEFT JOIN
        neoproduction.additional_role ar
    ON
        ar.user_id = u.userId
    LEFT JOIN
        neoproduction.rolemaster rm
    ON
        rm.roleId = ar.role_id
    JOIN
        neoproduction.rolemaster rm2
    ON
        rm2.roleId = u.roleId
    GROUP BY
        u.userId, u.firstname, u.lastname, u.roleId;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getcollege` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getcollege`()
BEGIN
    SELECT * FROM collegemaster;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getDistinctAccessList` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getDistinctAccessList`(IN uname VARCHAR(100))
BEGIN
    -- Declare a variable to store the distinct access list
    DECLARE distinctAccessList JSON;

    -- Check if the user exists and is active in usermaster
    SELECT status INTO @userStatus
    FROM neoproduction.usermaster
    WHERE userEmail = uname;

    IF @userStatus = 1 THEN
        -- The user is active, initialize distinctAccessList
        SET distinctAccessList = '[]';

        -- Retrieve the accessList from rolemaster for the user's primary role
        SELECT rm.accessList INTO @primaryRoleAccessList
        FROM neoproduction.usermaster um
        JOIN neoproduction.rolemaster rm ON um.roleId = rm.roleId
        WHERE um.userEmail = uname AND rm.status = 1;

        -- If the primary role has accessList, merge it into distinctAccessList
        IF JSON_LENGTH(@primaryRoleAccessList) > 0 THEN
            SET distinctAccessList = JSON_MERGE_PRESERVE(distinctAccessList, @primaryRoleAccessList);
        END IF;

        -- Retrieve additional roles for the user
        SELECT ar.role_id INTO @additionalRoles
        FROM neoproduction.additional_role ar
        WHERE ar.user_id = (SELECT userId FROM neoproduction.usermaster WHERE userEmail = uname);

        -- Process additional roles
        WHILE JSON_LENGTH(@additionalRoles) > 0 DO
            -- Get the first role_id from the list
            SET @roleId = JSON_UNQUOTE(JSON_EXTRACT(@additionalRoles, '$[0]'));
            SET @additionalRoles = JSON_REMOVE(@additionalRoles, '$[0]');

            -- Check if the additional role's status is active
            SELECT status INTO @roleStatus
            FROM neoproduction.rolemaster
            WHERE roleId = @roleId;

            IF @roleStatus = 1 THEN
                -- The additional role is active, retrieve its accessList
                SELECT rm.accessList INTO @additionalRoleAccessList
                FROM neoproduction.rolemaster rm
                WHERE rm.roleId = @roleId;

                -- Merge the accessList of the additional role into distinctAccessList
                SET distinctAccessList = JSON_MERGE_PRESERVE(distinctAccessList, @additionalRoleAccessList);
            END IF;
        END WHILE;
    ELSE
        -- User is not active, return an empty JSON array
        SET distinctAccessList = '[]';
    END IF;

    -- Finally, return the distinct accessList
    SELECT distinctAccessList AS accessList;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getFundMaster` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getFundMaster`(in dbmode int,in f_year varchar(100),
  in c_y_fund float(12),in p_y_balance float(12),
  in t_balance float(15),
  in app_id int(11),in sdate date,
  in aprv_id int, in appdate date, 
  in status int,in cmnt varchar(200),
  in sno int, in cfile varchar(250))
begin
	if dbmode =1 then
		insert into neoproduction.fund_master (financial_year, current_year_fund, prev_year_balance,
  		total_balance, allocator_id,send_date,approver_id,approval_date)
  		
  		values(f_year, c_y_fund , p_y_balance , t_balance , app_id, sdate, aprv_id , appdate );
  	
    elseif dbmode = 2 then
   		update neoproduction.fund_master fm 
   		set fm.approval_status = status, fm.approver_id =aprv_id, fm.approval_date = appdate, fm.comment =cmnt
   	where fm.srno = sno;
   	
   	elseif dbmode =3 then
   		select * from neoproduction.fund_master;
   	
   	elseif dbmode =4 then
   		update neoproduction.fund_master fm 
   		set fm.emailFile = cfile where fm.srno = sno;
   	
   	elseif dbmode =5 then
   		update neoproduction.fund_master fm 
   		set fm.financial_year = f_year, fm.current_year_fund =c_y_fund,
   	fm.prev_year_balance = p_y_balance,fm.total_balance =t_balance,fm.approval_status =0 where fm.srno = sno;
  	end if;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getlist` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getlist`()
begin
	SELECT a.id, a.username, s.name AS stdname
  FROM neo a
  JOIN qtest.studentmaster s ON a.id = s.studentid
  WHERE s.status = 'approved' -- Add the condition for status
  GROUP BY a.id, a.username, s.name;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getroles` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getroles`()
begin
	select * from neoproduction.rolemaster;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getstudentbycollege` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getstudentbycollege`(IN dbmode INT, IN clgid INT, IN studentid INT)
BEGIN
--     DECLARE rowcount INT;
    
--     SELECT COUNT(*) INTO rowcount FROM upload_student_details WHERE collegeid = clgid;
    
--     IF rowcount = 0 THEN
--         SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'College not found';
--     ELSE
        IF dbmode = 1 THEN
            SELECT * FROM upload_student_details WHERE collegeid = clgid;
        ELSEIF dbmode = 2 THEN
            SELECT * FROM upload_student_details WHERE serialno = studentid AND collegeid = clgid;
        ELSE
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid dbmode';
--         END IF;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_all_results` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_results`()
begin
	
	SELECT a.id, a.username, s.name AS stdname
	FROM neo a
	JOIN qtest.studentmaster s ON a.id = s.studentid
	GROUP BY a.id, a.username, s.name;


END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_file_details` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_file_details`(in userid INT)
begin
	select n.psp as photo,n.pap as addProof,n.fip as fatheridproof,n.mip as motheridproof,n.pop as parentphoto,
	n.fbs as fbankstatement,n.mbs as mbankstatement,n.sbs as studentbank,n.adh as adhar,n.msp as marksheet,
	n.ivf as instituteverification,n.ia as Iacceptance,n.fsc as feestructure,n.id as incomeDec from neoproduction.neofiles n
where 
n.studentid = userid;

end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_fund_serial` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_fund_serial`(in fyear varchar(500))
begin
	select * from neoproduction.fund_master fm where fm.financial_year = fyear;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_interview_feedback` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_interview_feedback`(in dbmode int,
  in stuId int(11),
  in intvwId int(11),
  in sbjt float,
  in commun float,
  in convic float,
  in asp float,
  in elgblt float,
  in tot float,
  in rmrks int,
  in cmnt varchar(200)
  )
begin
	  if dbmode = 1 then
  	update neoproduction.interview_feedback 
  	set subject_knowledge = sbjt,communication = commun,conviction = convic,aspiration= asp,eligibility= elgblt,
  	total= tot,remarks= rmrks,comments= cmnt,interview_feedback_status = 1
  where interviewerId =intvwId and studentId = stuId;
  
    ELSEIF dbmode = 2 THEN
    SELECT if2.interview_feedback_status, if2.remarks FROM neoproduction.interview_feedback if2
    WHERE if2.studentId = stuId AND if2.interviewerId = intvwId;
   
   elseif dbmode =3 then
   	update neoproduction.st_intvw_schedule sis 
   	set sis.status = 2;
   
   elseif dbmode =4 then
   	update neoproduction.st_intvw_schedule sis 
   	set sis.status = 10;
   
   elseif dbmode =5 then
   	update neoproduction.st_intvw_schedule sis 
   	set sis.status = 11;
  END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_list` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_list`()
BEGIN
--   SELECT a.id, a.username, s.studentid, s.name AS stdname
--   FROM neo a
--   JOIN qtest.studentmaster s ON a.id = s.studentid
	select * from neoproduction.studentmaster s;
--   WHERE s.status = 'approved'; -- Add the condition for status
--  GROUP BY a.id, a.username, s.name; -- You can uncomment this line if needed
--  SELECT * FROM scholarshipmaster s; -- You can uncomment this line if needed
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_role_names_by_ids` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_role_names_by_ids`(IN dbmode INT, IN roleids JSON)
BEGIN
    -- Declare variables
    DECLARE i INT;
    DECLARE roleCount INT;
    DECLARE role INT;

    -- Create a temporary table to store the results
    CREATE TEMPORARY TABLE IF NOT EXISTS temp_role_names (roleid INT, rolename VARCHAR(200));

    IF dbmode = 6 THEN
        -- Loop through the roleids in the JSON array
        SET i = 0;
        SET roleCount = JSON_LENGTH(roleids);

        WHILE i < roleCount DO
            -- Get a roleid from the JSON array
            SET role = JSON_UNQUOTE(JSON_EXTRACT(roleids, CONCAT('$[', i, ']')));

            -- Insert the roleid and rolename into the temporary table
            BEGIN
                INSERT INTO temp_role_names (roleid, rolename)
                SELECT roleId, roleName
                FROM neoproduction.rolemaster
                WHERE roleId = role;
            END;

            SET i = i + 1;
        END WHILE;

        -- Select distinct roleid and rolename from the temporary table
        SELECT DISTINCT trn.roleid, trn.rolename
        FROM temp_role_names trn;

        -- Drop the temporary table
        DROP TEMPORARY TABLE IF EXISTS temp_role_names;
    END IF;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_student_details` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_student_details`(in userid INT)
begin
	select d.name as StudentName,d.dob as DateofBirth,d.gender as Gender,d.phone as StudentPhone,d.altphone as AltNumber,d.email as StudentEmail,a.name as fatherName, a.occupation as fatheroccupation,a.officeaddress as fatherOaddress,a.income as fatherIncome,a.phone as fatherPhone , b.name as motherName,b.occupation as motherOccupation,b.income as motherIncome,b.phone as motherPhone,
b.officeaddress as motherOaddress,e.address,e.postoffice,e.pincode,e.policestation,e.municipality,
f.xschool,f.xboard,f.xmarks,f.x_passing_year ,f.xiischool,f.xiiboard,f.xiimarks,f.xii_passing_year ,s.cof,s.noc,s.attclg,s.ros,s.clng,
s.str,s.ces,s.sb,s.aos,s.oia,s.fut,s.subjects from neoproduction.fathermaster a,neoproduction.mothermaster b, neoproduction.studentmaster d
,neoproduction.addressmaster e,neoproduction.educationmaster f,neoproduction.scholarshipmaster s  
where 
d.studentid=a.studentid and 
d.studentid=b.studentid and 
d.studentid=e.studentid and 
d.studentid=f.studentid and 
d.studentid=s.studentid and  
d.studentid = userid;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_user_login_details` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_user_login_details`(IN dbmode INT, IN uname VARCHAR(100), IN userid INT, IN roles JSON)
BEGIN
    -- Declare variables
    DECLARE i INT;
    DECLARE roleCount INT;
    DECLARE role VARCHAR(200);

    -- Create a temporary table to store the results
    CREATE TEMPORARY TABLE IF NOT EXISTS temp_access_list (access VARCHAR(500));

    IF dbmode = 1 THEN
        -- Mode 1: Retrieve user login details from neoadminlogin
        SELECT id, username, mypassword
        FROM neoadminlogin
        WHERE username = uname;

    ELSEIF dbmode = 2 THEN
        SELECT u.status as userstatus, u.userId, u.roleId, r.status as rolestatus
        FROM neoproduction.usermaster u
        JOIN neoproduction.rolemaster r ON r.roleId = u.roleId
        WHERE u.userEmail = uname;

    ELSEIF dbmode = 3 THEN
        SELECT ar.role_id, ar.status as addstatus, r.status as rolestatus
        FROM neoproduction.additional_role ar
        JOIN neoproduction.rolemaster r ON r.roleId = ar.role_id
        WHERE ar.user_id = userid;

    ELSEIF dbmode = 4 THEN
        SELECT u.userId, u.userEmail, u.uPassword, u.creationDate, u.firstname, u.lastname
        FROM neoproduction.usermaster u
        WHERE u.userId = userid;

    ELSEIF dbmode = 5 THEN
        -- Loop through the roles in the JSON array
        SET i = 0;
        SET roleCount = JSON_LENGTH(roles);

        WHILE i < roleCount DO
            -- Get a role from the JSON array
            SET role = JSON_UNQUOTE(JSON_EXTRACT(roles, CONCAT('$[', i, ']')));

            -- Insert the accessList for the role into the temporary table
            INSERT INTO temp_access_list (access)
            SELECT DISTINCT r.accessList
            FROM neoproduction.rolemaster r
            WHERE r.roleId = role;

            SET i = i + 1;
        END WHILE;

        -- Select distinct accessList from the temporary table
        SELECT DISTINCT access
        FROM temp_access_list;

    END IF;

    -- Drop the temporary table
    DROP TEMPORARY TABLE IF EXISTS temp_access_list;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insert_address` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_address`(in a int ,in b VARCHAR(200),in c VARCHAR(200),in d int,in e VARCHAR(300),in f varchar(100))
begin
	insert into addressmaster  (studentid,address,postoffice,pincode,policestation,municipality)
	values (a,b,c,d,e,f);
	
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insert_college` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_college`(in srno int,in cname VARCHAR(200),in cemail varchar(150),in cphone bigint,in cperson VARCHAR(200),in cpphone bigint,in cadd VARCHAR(200))
begin
	update  collegemaster set collegename = cname,collegeemail=cemail,collegephone=cphone,contactperson = cperson ,personphone = cpphone ,address = cadd where Coll_ID = srno ;
	
	
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insert_education` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_education`(in a int ,
in b VARCHAR(200),in c VARCHAR(200),in d float,in e varchar(200),in f VARCHAR(300),in g float,in h date,in i date,
in lexam varchar(100),in ldate date,in lcollege varchar(100),in lmarks float)
begin
	insert into neoproduction.educationmaster(studentid,xschool,xboard,xmarks,xiischool,xiiboard,xiimarks,
	x_passing_year,xii_passing_year,last_exam,last_exam_year,last_college,last_marks)
	values (a,b,c,d,e,f,g,h,i,lexam,ldate,lcollege,lmarks);
	
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insert_father` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_father`(in a int ,in b VARCHAR(200),in c VARCHAR(200),in d numeric,in e numeric,in f VARCHAR(300))
begin
	insert into fathermaster  (studentid,name,occupation,income,phone,officeaddress)
	values (a,b,c,d,e,f);
	
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insert_files` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_files`(in z int,in a VARCHAR(200),in b VARCHAR(200),
in c VARCHAR(200),in d VARCHAR(200),in e VARCHAR(200),in f VARCHAR(200),in g VARCHAR(200),in h VARCHAR(200),
in i VARCHAR(200),in j VARCHAR(200),in k VARCHAR(200),in l VARCHAR(200),in m VARCHAR(200),in n VARCHAR(200),
in mdoc VARCHAR(200))
begin
	insert into neofiles  (studentid,psp,pap,fip,mip,pop,fbs,mbs,sbs,adh,msp,ivf,ia,fsc,id,marks_doc)
	values (z,a,b,c,d,e,f,g,h,i,j,k,l,m,n,mdoc);
	
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insert_interview_schedule` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_interview_schedule`(in dbmode int,
in clgid int ,in sid json,in panelid int,in panelrole int
,in snddate date,in coid int,in corole int, in slotid int,in slotdate date,in slottime time,
in sndcolstatus int,in sndstustatus int,in senddate date )
begin
	
if dbmode =1 then
	insert into std_send_for_interview_to_panel  (coll_id,Student_id,Send_to_panel_id,panel_role,send_date,
	coord_id,coord_role)
	values (clgid,sid,panelid,panelrole,snddate,coid,corole);

update std_send_for_interview_to_panel
set send_status = 1;

elseif dbmode =2 then 

insert into st_intvw_schedule (coll_id,Student_id,slot_id,Slot_date,Slot_time,panelist_id,
	Role,Sys_date,mail_send_to_std,mail_send_date_to_std,mail_send_to_col,status)
	values (clgid,sid,slotid,slotdate,slottime,panelid,panelrole,snddate,sndstustatus,senddate,sndcolstatus,coid);

update std_send_for_interview_to_panel
set send_status = 2;

elseif dbmode =3 then 

update student_initial_screening
set 2comments = 2cmnt ,second_user_id = sec_userid,final_approval_date= secapprovedate
where stu_id = sid;

update upload_student_details 
    set submit_stage = 2,final_approved_status = fapprove where serialno = sid;
   
elseif dbmode = 4 then
select usd.studentname , usd.serialno from neoproduction.upload_student_details usd where usd.submit_stage =1;  
end if;

end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insert_mail_details` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_mail_details`(in cname VARCHAR(200),in cmail varchar(150),in comm VARCHAR(200),in stat VARCHAR(50))
begin
	insert into collegemaster (collegename,collegeemail,comments,mail_status)
	values (cname,cmail,comm,stat);
	
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insert_mother` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_mother`(in a int ,in b VARCHAR(200),in c VARCHAR(200),in d numeric,in e numeric,in f VARCHAR(300))
begin
	insert into mothermaster  (studentid,name,occupation,income,phone,officeaddress)
	values (a,b,c,d,e,f);
	
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insert_scholarship` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_scholarship`(in a int ,in b VARCHAR(200),
in c VARCHAR(200),in d varchar(200),in e VARCHAR(300),in f varchar(250),in g varchar(250),
in h varchar(250),in i varchar(250),in j varchar(250),in k varchar(250),in l varchar(250),in m varchar(250))
begin
	insert into scholarshipmaster  (studentid,cof,noc,attclg,ros,clng,str,ces,sb,aos,oia,fut,subjects)
	values (a,b,c,d,e,f,g,h,i,j,k,l,m);
	
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insert_student` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_student`(in a VARCHAR(200),in b VARCHAR(200),in c VARCHAR(200),in d VARCHAR(200),in e VARCHAR(200),in f VARCHAR(200),in g VARCHAR(200))
begin
	insert into studentmaster  (studentid,name,dob,phone,altphone,email,gender,status)
	values (a,b,c,d,e,f,g,"new");
	
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insert_student_by_college` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_student_by_college`(in clgid int ,in sname varchar(200),in grd varchar(100),in sphone bigint,in mrk float,in mail varchar(100),in rmrk VARCHAR(200),out errorCode int)
begin
        INSERT INTO upload_student_details (collegeid, studentname, grade, studentphone, studentmarks, email, remarks)
        VALUES (clgid, sname, grd, sphone, mrk, mail, rmrk);
        SET errorCode = 0;	
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insert_student_initial_screening` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_student_initial_screening`(in dbmode int,
in clgid int ,in sid int,in name int,in phone int
,in grade int,in mark int,in email int, in 1cmnt varchar(250),in frole int,in 2cmnt varchar(250),
in fapprove int,in sec_userid int,in fstapprovedate date,in secapprovedate date )
begin
	DECLARE total_count INT;

-- this is for 1st approval	
if dbmode =1 then
	insert into student_initial_screening  (coll_id,stu_id,snamestatus,sphonestatus,sgradestatus,
	smarksstatus,semailstatus,1comments,f_user_id,second_user_id,first_approval_date)
	values (clgid,sid,name,phone,grade,mark,email,1cmnt,frole,sec_userid,fstapprovedate);

    update neoproduction.upload_student_details 
    set submit_stage = 1 where serialno =sid;

elseif dbmode =2 then 
SELECT u.serialno,u.studentname,u.grade,u.studentphone,u.studentmarks,u.email ,s.snamestatus,s.first_approval_date ,s.final_approval_date , s.sphonestatus, s.sgradestatus, s.smarksstatus,
s.1comments as comment1, r.roleName, um.firstname, um.lastname, um.userEmail
FROM upload_student_details u
JOIN neoproduction.student_initial_screening s ON s.stu_id = u.serialno
JOIN neoproduction.usermaster um ON um.userId = s.f_user_id 
JOIN neoproduction.rolemaster r ON r.roleId = um.roleId
WHERE u.serialno = sid;

-- this is for final approval
elseif dbmode =3 then 

update student_initial_screening
set 2comments = 2cmnt ,second_user_id = sec_userid,final_approval_date= secapprovedate
where stu_id = sid;

update upload_student_details 
    set submit_stage = 2,final_approved_status = fapprove where serialno = sid;
   
elseif dbmode = 4 then
select usd.studentname , usd.serialno, c.collegename from neoproduction.upload_student_details usd 
join neoproduction.collegemaster c on c.Coll_ID =usd.collegeid 
where usd.submit_stage =1;  
end if;

end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insert_student_notification` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_student_notification`(in sname VARCHAR(200),in smail varchar(150),in comm VARCHAR(200),in stat VARCHAR(50))
begin
	insert into studentnotification  (studentname,email,comments,sstatus)
	values (sname,smail,comm,stat);
	
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Interview_Schedule` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Interview_Schedule`(
    IN dbmode INT,
    IN stdid INT,
    IN colid INT,
    IN slotid INT,
    IN slotdate DATE,
    IN slottime TIME,
    IN panelid JSON,
    IN panelroleid JSON,
    IN systmdate DATE,
    IN stdmailstatus INT,
    IN stdmaildate DATE,
    IN intmailstatus INT,
    IN intmaildate DATE,
    IN co_id INT,
    IN intvw_id INT
)
begin
	
	DECLARE i INT;
    DECLARE roleCount INT;
    DECLARE role INT;

    -- Create a temporary table to store the results
   CREATE TEMPORARY TABLE IF NOT EXISTS temp_role_names (
    panelid INT,
    firstname VARCHAR(200),
    lastname VARCHAR(200),
    panelEmail VARCHAR(200) -- Corrected the syntax error here
);
	
    IF dbmode = 1 THEN
        INSERT INTO neoproduction.st_intvw_schedule (
            Student_id, coll_id, slot_id, Slot_date, Slot_time, panelist_id,
            Role, Sys_date, mail_send_to_std, mail_send_date_to_std, mail_send_to_interviewer, interviewer_mail_date,
            coord_role_id, status
        )
        VALUES (
            stdid, colid, slotid, slotdate, slottime, panelid, panelroleid, systmdate,
            stdmailstatus, stdmaildate, intmailstatus, intmaildate, co_id, 1
        );
    ELSEIF dbmode = 2 THEN
        INSERT INTO neoproduction.interview_feedback (studentId, interviewerId,int_Date ,int_time,interview_feedback_status)
        VALUES (stdid ,intvw_id ,slotdate ,slottime, 0);
       
    ELSEIF dbmode = 3 THEN
    SET i = 0;
    SET roleCount = JSON_LENGTH(panelid);

    WHILE i < roleCount DO
        SET role = JSON_UNQUOTE(JSON_EXTRACT(panelid, CONCAT('$[', i, ']')));

        INSERT INTO temp_role_names (panelid, firstname, lastname, panelEmail)
        SELECT userId, firstname, lastname, userEmail
        FROM neoproduction.usermaster
        WHERE userId = role;

        SET i = i + 1;
    END WHILE;

    SELECT DISTINCT trn.panelid, trn.firstname, trn.lastname, trn.panelEmail
    FROM temp_role_names trn;

    DROP TEMPORARY TABLE IF EXISTS temp_role_names;
   
   ELSEIF dbmode = 4 THEN
        select s.name ,s.email ,u.firstname ,u.lastname ,u.userEmail from neoproduction.studentmaster s 
        join neoproduction.usermaster u on u.userId =co_id
        where s.studentid = stdid;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `mailstatus` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `mailstatus`()
begin
	declare total_count int;
	
select count(*) into total_count from neoproduction.collegemaster;
	select *,total_count from collegemaster
	ORDER BY Coll_ID DESC;
	
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `profilepicture` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `profilepicture`(IN dbmode INT, IN userId INT, IN profilePic VARCHAR(255))
BEGIN
--   DECLARE rowcount INT;
--   SELECT COUNT(*) INTO rowcount FROM profilephoto WHERE userid = userId;
-- 
--   IF rowcount = 0 THEN
--     SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Profile photo with specified mentorId not found';
--   ELSE
    IF dbmode = 1 THEN
      INSERT INTO profilephoto (userid, profilepic) VALUES (userId, profilePic);
    ELSEIF dbmode = 2 THEN
      UPDATE profilephoto SET profilepic = profilePic WHERE userid = userId;
    ELSE
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid dbmode';
    END IF;
--   END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `readyforinterview` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `readyforinterview`(IN dbmode INT, IN clgid INT)
begin
	declare rowcount int;
    IF dbmode = 1 THEN
        SELECT usd.*
        FROM neoproduction.upload_student_details usd
        WHERE usd.collegeid = clgid
        AND usd.final_approved_status = 1
        AND usd.serialno NOT IN (SELECT sis.Student_id FROM neoproduction.st_intvw_schedule sis, neoproduction.interview_feedback ifeedbck WHERE status = 1);
       
    ELSEIF dbmode = 2 THEN
        SELECT usd.studentname,usd.serialno, usd.studentphone, c.collegename, sis.slot_id, sis.Slot_date
        FROM neoproduction.st_intvw_schedule sis,neoproduction.upload_student_details usd,neoproduction.collegemaster c 
       where usd.serialno  = sis.Student_id and c.Coll_ID =sis.coll_id and sis.status =1;
    
   ELSEIF dbmode = 3 then
   select count(*) into rowcount from neoproduction.st_intvw_schedule sis 
   JOIN neoproduction.interview_feedback ifeedbck ON ifeedbck.interviewerId = clgid
    WHERE JSON_CONTAINS(sis.panelist_id, CAST(clgid AS JSON), '$')
   AND ifeedbck.interview_feedback_status = 0; 
   
        SELECT usd.serialno,usd.studentname,rowcount, usd.serialno, usd.studentphone,s.cof, c.collegename,
        sis.slot_id, sis.Slot_date,sis.panelist_id
FROM neoproduction.st_intvw_schedule sis
JOIN neoproduction.upload_student_details usd ON usd.serialno = sis.Student_id
JOIN neoproduction.collegemaster c ON c.Coll_ID = sis.coll_id
JOIN neoproduction.interview_feedback ifeedbck ON ifeedbck.interviewerId = clgid
join neoproduction.scholarshipmaster s on sis.Student_id 
WHERE JSON_CONTAINS(sis.panelist_id, CAST(clgid AS JSON), '$') 
  AND ifeedbck.interview_feedback_status = 0;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ready_for_funds` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ready_for_funds`(IN dbmode INT, IN fromdate DATE, IN todate DATE)
BEGIN
    IF dbmode = 1 THEN
        SELECT ma.*,usd.studentname ,c.collegename ,sm.phone FROM neoproduction.md_approval ma
       	join neoproduction.upload_student_details usd on usd.serialno = ma.studentId
       	join neoproduction.collegemaster c on c.Coll_ID = usd.collegeid
       	join neoproduction.studentmaster sm on sm.studentid = usd.serialno
        WHERE ma.status = 1;
    ELSEIF dbmode = 2 THEN
        SELECT ma.* ,usd.studentname ,c.collegename ,sm.phone FROM neoproduction.md_approval ma
       	join neoproduction.upload_student_details usd on usd.serialno = ma.studentId
       	join neoproduction.collegemaster c on c.Coll_ID = usd.collegeid
       	join neoproduction.studentmaster sm on sm.studentid = usd.serialno
        WHERE ma.approval_Date BETWEEN fromdate AND todate;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ready_for_interview_report` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ready_for_interview_report`(in dbmode int, in fdate date, in tdate date)
BEGIN
    IF dbmode = 1 THEN
        SELECT 
            sis.Student_id, 
            sis.coll_id, 
            sis.slot_id, 
            sis.Slot_date, 
            sis.Slot_time, 
            sis.panelist_id, 
            sis.Role, 
            sis.Sys_date, 
            sis.mail_send_to_std, 
            sis.mail_send_date_to_std, 
            sis.mail_send_to_interviewer, 
            sis.interviewer_mail_date, 
            sis.coord_role_id, 
            sis.status,
            usd.studentname, 
            c.collegename, 
            sm.phone,
            JSON_ARRAYAGG(JSON_OBJECT('panelist_id', trn.panelid, 'firstname', trn.firstname, 'lastname', trn.lastname, 'panelEmail', trn.panelEmail)) as panelists
        FROM neoproduction.st_intvw_schedule sis
        JOIN neoproduction.upload_student_details usd ON usd.serialno = sis.Student_id
        JOIN neoproduction.collegemaster c ON c.Coll_ID = usd.collegeid
        JOIN neoproduction.studentmaster sm ON sm.studentid = usd.serialno
        LEFT JOIN (
            SELECT userId as panelid, firstname, lastname, userEmail as panelEmail
            FROM neoproduction.usermaster
        ) trn ON JSON_CONTAINS(sis.panelist_id, JSON_ARRAY(trn.panelid))
        WHERE sis.status = 1
        GROUP BY 
            sis.Student_id, 
            sis.coll_id, 
            sis.slot_id, 
            sis.Slot_date, 
            sis.Slot_time, 
            sis.panelist_id, 
            sis.Role, 
            sis.Sys_date, 
            sis.mail_send_to_std, 
            sis.mail_send_date_to_std, 
            sis.mail_send_to_interviewer, 
            sis.interviewer_mail_date, 
            sis.coord_role_id, 
            sis.status,
            usd.studentname, 
            c.collegename, 
            sm.phone;
    ELSEIF dbmode = 2 THEN
        SELECT 
            sis.Student_id, 
            sis.coll_id, 
            sis.slot_id, 
            sis.Slot_date, 
            sis.Slot_time, 
            sis.panelist_id, 
            sis.Role, 
            sis.Sys_date, 
            sis.mail_send_to_std, 
            sis.mail_send_date_to_std, 
            sis.mail_send_to_interviewer, 
            sis.interviewer_mail_date, 
            sis.coord_role_id, 
            sis.status,
            usd.studentname, 
            c.collegename, 
            sm.phone,
            JSON_ARRAYAGG(JSON_OBJECT('panelist_id', trn.panelid, 'firstname', trn.firstname, 'lastname', trn.lastname, 'panelEmail', trn.panelEmail)) as panelists
        FROM neoproduction.st_intvw_schedule sis
        JOIN neoproduction.upload_student_details usd ON usd.serialno = sis.Student_id
        JOIN neoproduction.collegemaster c ON c.Coll_ID = usd.collegeid
        JOIN neoproduction.studentmaster sm ON sm.studentid = usd.serialno
        LEFT JOIN (
            SELECT userId as panelid, firstname, lastname, userEmail as panelEmail
            FROM neoproduction.usermaster
        ) trn ON JSON_CONTAINS(sis.panelist_id, JSON_ARRAY(trn.panelid))
        WHERE sis.status = 1 AND sis.Slot_date BETWEEN fdate AND tdate
        GROUP BY 
            sis.Student_id, 
            sis.coll_id, 
            sis.slot_id, 
            sis.Slot_date, 
            sis.Slot_time, 
            sis.panelist_id, 
            sis.Role, 
            sis.Sys_date, 
            sis.mail_send_to_std, 
            sis.mail_send_date_to_std, 
            sis.mail_send_to_interviewer, 
            sis.interviewer_mail_date, 
            sis.coord_role_id, 
            sis.status,
            usd.studentname, 
            c.collegename, 
            sm.phone;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `role_interview` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `role_interview`(IN dbmode INT, IN roleid INT)
BEGIN
    IF dbmode = 1 THEN
        SELECT n.creationDate, n.userId, n.userEmail, n.roleId, n.firstname, n.lastname, c.roleName, n.status
        FROM neoproduction.usermaster n
        JOIN neoproduction.rolemaster c ON n.roleId = c.roleId
        WHERE n.roleId  = roleid;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `studentid` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `studentid`(nm VARCHAR(255), mail VARCHAR(255))
BEGIN
    SELECT id FROM studentnotification WHERE studentname = nm AND email = mail;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `studentmailstatus` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `studentmailstatus`()
begin
	declare total_count int;
	
select count(*) into total_count from neoproduction.studentnotification; 
	
	SELECT *, total_count FROM studentnotification
ORDER BY id DESC;
	
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `total_count` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `total_count`()
BEGIN
    DECLARE college_count INT DEFAULT 0;
    DECLARE student_count INT DEFAULT 0;
    DECLARE student_by_college_count INT DEFAULT 0;
    DECLARE external_count INT DEFAULT 0;
    DECLARE successfull_interview_count INT DEFAULT 0;

    SELECT COUNT(*) INTO college_count FROM neoproduction.collegemaster;
    SELECT COUNT(*) INTO student_count FROM neoproduction.upload_student_details usd where usd.final_approved_status =1;
    SELECT COUNT(*) INTO external_count FROM neoproduction.student_external_enquiry;
    SELECT COUNT(*) INTO successfull_interview_count FROM neoproduction.st_intvw_schedule sis WHERE sis.status = 2;
    SELECT COUNT(*) INTO student_by_college_count FROM neoproduction.upload_student_details;

    SELECT college_count, student_count,student_by_college_count, external_count, successfull_interview_count;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `updateAccessList` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `updateAccessList`(id INT, pages JSON, cstatus int)
BEGIN
  -- Update the accessList in the database for the given roleId
  UPDATE rolemaster SET accessList = pages, status = cstatus WHERE roleId = id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `updateFirstApprove` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `updateFirstApprove`(
    IN stuid INT,
    IN name VARCHAR(255),
    IN phone bigint(20),
    IN mrks float,
    IN grd VARCHAR(10),
    IN mail VARCHAR(255)
)
BEGIN
    UPDATE upload_student_details
    SET
        studentname = CASE WHEN name <> '' THEN name ELSE studentname END,
        studentphone = CASE WHEN phone is not null THEN phone ELSE studentphone END,
        studentmarks = CASE WHEN mrks IS NOT NULL THEN mrks ELSE studentmarks END,
        grade = CASE WHEN grd <> '' THEN grd ELSE grade END,
        email = CASE WHEN mail <> '' THEN mail ELSE email END
    WHERE serialno = stuid;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `updateRole` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `updateRole`(id INT, pages JSON, status int)
BEGIN
  -- Update the accessList in the database for the given roleId
  UPDATE rolemaster SET accessList = pages, status = status WHERE roleId = id;
 update neoproduction.usermaster u set status = status where u.roleId = id;
update neoproduction.additional_role  a set status = status where a.role_id = id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UpdateUserStatus` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateUserStatus`(IN userid INT, IN newStatus INT)
BEGIN
    UPDATE usermaster
    SET status = newStatus
    WHERE userId = userid;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `userlogin` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `userlogin`(in uname VARCHAR(100),in pword VARCHAR(100))
begin
	insert into neoadminlogin  (username, mypassword)
	values (uname,pword);
	
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-02 19:58:51
