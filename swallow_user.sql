-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        8.0.39 - MySQL Community Server - GPL
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- sample 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `sample` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `sample`;

-- 테이블 sample.swallow_user 구조 내보내기
CREATE TABLE IF NOT EXISTS `swallow_user` (
  `id` varchar(500) NOT NULL,
  `pwd` varchar(100) NOT NULL,
  `name` varchar(50) NOT NULL,
  `profileImg` varchar(500) DEFAULT NULL,
  `followingNum` int DEFAULT '0',
  `followerNum` int DEFAULT '0',
  `posts` int DEFAULT '0',
  `biography` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 sample.swallow_user:~4 rows (대략적) 내보내기
INSERT INTO `swallow_user` (`id`, `pwd`, `name`, `profileImg`, `followingNum`, `followerNum`, `posts`, `biography`) VALUES
	('mynameis', 'hahaha', '누군가', NULL, 0, 0, 0, NULL),
	('user1', '1234', '홍길동', NULL, 0, 0, 3, NULL),
	('user2', '5678', '박영희', NULL, 0, 0, 3, NULL),
	('user3', 'abcd', '김철수', NULL, 0, 0, 2, NULL);

-- 테이블 sample.tbl_feed 구조 내보내기
CREATE TABLE IF NOT EXISTS `tbl_feed` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` varchar(100) DEFAULT NULL,
  `content` text,
  `cdatetime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `favorait` int DEFAULT NULL,
  `imgPath` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 sample.tbl_feed:~12 rows (대략적) 내보내기
INSERT INTO `tbl_feed` (`id`, `userId`, `content`, `cdatetime`, `favorait`, `imgPath`, `category`, `title`) VALUES
	(1, 'user2', '오랜만에 친구를 만났어요. 정말 반가웠어요!', '2024-10-15 08:00:00', 1, NULL, NULL, '재미'),
	(2, 'user1', '드디어 휴가! 이번엔 멀리 여행을 갈 거예요.', '2024-10-16 00:50:00', 1, NULL, NULL, '놀러간다'),
	(3, 'user1', '오늘은 운동을 열심히 했어요. 뿌듯하네요!', '2024-10-17 11:00:00', 1, NULL, NULL, '오운완'),
	(4, 'user3', '책을 읽다 보면 시간 가는 줄 몰라요.', '2024-10-18 05:25:00', 1, NULL, NULL, '독서'),
	(5, 'user2', '친구들과 맛있는 저녁을 먹었어요. 정말 즐거운 시간이었어요.', '2024-10-19 09:30:00', 2, NULL, NULL, '즐거운 식사'),
	(6, 'user2', '새로운 프로젝트를 시작했어요. 열심히 해야겠어요!', '2024-10-20 01:15:00', 4, NULL, NULL, '새로운'),
	(7, 'user3', '맛있는 커피 한 잔과 함께 여유로운 아침을 보내고 있어요.', '2024-10-20 02:00:00', 1, NULL, NULL, 'Good'),
	(8, 'user1', '주말엔 산책이 최고인 것 같아요!', '2024-10-20 04:45:00', 2, NULL, NULL, '산책'),
	(34, 'user1', '오늘 수요일', '2024-10-30 01:54:42', 1, 'uploads\\1730253282135-130840764.jpg', '1', '오늘 수요일'),
	(35, 'user1', '', '2024-10-30 02:12:35', 2, 'uploads\\1730254355912-432695885.jpg', '1', '나는 지금 아무 생각 없다'),
	(36, 'user1', '난 여기', '2024-10-30 06:48:57', 0, 'uploads\\1730270937296-140366089.jpg', '2', '어디로 가고 싶니?'),
	(37, 'mynameis', '뭘까요?', '2024-10-30 06:51:53', 0, NULL, '1', '내 이름은'),
	(38, 'user2', '단풍 구경이죠~', '2024-10-30 06:57:12', 0, 'uploads\\1730271432521-470256261.png', '2', '가을에는 역시');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
