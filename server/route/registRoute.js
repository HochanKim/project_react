const express = require('express');
const router = express.Router();
const multer = require('multer');
const connection = require('../db');  // DB 연결 설정
const cors = require('cors');
const app = express();
app.use(cors()); // 모든 도메인에서 오는 요청 허용

// multer 설정: 파일 저장 경로 및 이름 설정
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');  // 파일이 저장될 경로
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));  // 파일명 설정
    }
  });
  
  const upload = multer({ storage: storage });
  
  // 파일 업로드 및 데이터 처리 경로
  router.post('/feed', upload.single('file'), (req, res) => {
    const { title, content, category } = req.body;  // 텍스트 데이터
    const filePath = req.file ? req.file.path : null;  // 업로드된 파일 경로
  
    // DB에 저장할 쿼리
    const query = 'INSERT INTO tbl_feed (title, content, category, imagePath) VALUES (?, ?, ?, ?)';
    
    connection.query(query, [title, content, category, filePath], (err, result) => {
      if (err) {
        console.error('DB 저장 중 오류 발생:', err);
        return res.status(500).json({ success: false, message: 'DB 오류 발생' });
      }
  
      // 성공적으로 저장됨
      return res.json({ success: true, message: '피드가 등록되었습니다.' });
    });
  });
  
  module.exports = router;