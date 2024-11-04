const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');  // JWT 토큰 처리 모듈
const connection = require('../db');
const app = express();

const cors = require('cors');
app.use(cors());  // 모든 도메인에서 오는 요청 허용

// JWT 시크릿 키 설정 (로그인 시 토큰을 발급할 때 사용한 것과 동일해야 함)
const SECRET_KEY = 'your_secret_key';  // 정확한 시크릿 키로 설정

// multer 설정: 파일 저장 경로 및 이름 설정
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// 파일 업로드 및 데이터 처리 경로
router.post('/', upload.single('file'), (req, res) => {
  // JWT 토큰을 Authorization 헤더에서 가져옴
  const token = req.headers.authorization?.split(' ')[1];  // "Bearer " 다음의 토큰만 추출

  if (!token) {
    return res.status(401).json({ success: false, message: '인증되지 않은 사용자입니다.' });
  }

  // JWT 토큰 검증
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: '토큰이 유효하지 않습니다.' });
    }

    const userId = decoded.id;  // JWT에서 추출한 사용자 ID

    // 피드 데이터와 함께 DB에 저장
    const { title, content, category } = req.body;
    const filePath = req.file ? req.file.path : null;

    // DB에 저장할 쿼리
    const query = 'INSERT INTO TBL_FEED (userId, title, content, category, imgPath, favorait) VALUES (?, ?, ?, ?, ?, 0)';

    connection.query(query, [userId, title, content, category, filePath], (err, result) => {
      if (err) {
        console.error('DB 저장 중 오류 발생:', err);
        return res.status(500).json({ success: false, message: 'DB 오류 발생' });
      }

      // 성공적으로 저장됨
      return res.json({ success: true, message: '피드가 등록되었습니다.' });
    });

    console.log('title:', title);
    console.log('content:', content);
    console.log('category:', category);
    console.log('file:', filePath);
  });
});

module.exports = router;