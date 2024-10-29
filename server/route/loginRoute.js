const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
app.use(cors()); // 모든 도메인에서 오는 요청 허용

const SECRET_KEY = 'your_secret_key';  // JWT 서명에 사용할 비밀 키

app.use(bodyParser.json());

// 로그인 요청 처리 및 JWT 발급
app.post('/login', (req, res) => {
    const { userId, userPwd } = req.body;

    // 예시로 사용자 검증 (실제로는 DB에서 사용자 정보 확인)
    if (userId === 'userId' && userPwd === 'userPwd') {
        // JWT 토큰 생성
        const token = jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: '30m' });

        // 토큰을 클라이언트에 전달
        res.json({
            success: true,
            message: '로그인 성공',
            token // 토큰을 응답에 포함
        });
    } else {
        res.json({ success: false, message: '아이디나 비밀번호가 올바르지 않습니다.' });
    }
});

app.listen(3031, () => {
    console.log('Server is running on http://localhost:3031');
});