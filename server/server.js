const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express()

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cors({origin : 'http://localhost:3030'}));
app.use(bodyParser.json());


app.use("/user", require("./route/userRoute"));
app.use("/join", require("./route/joinRoute"));

// 사용자 정보 API 엔드포인트
app.get('/api/user', (req, res) => {
    res.json(userData);
});

app.use("/main", require("./route/mainRoute"));
// JWT 검증 미들웨어
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // "Bearer <token>"

    if (token == null) return res.sendStatus(401); // 토큰이 없으면 요청 거부

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403); // 토큰이 유효하지 않으면 거부
        req.user = user; // 토큰이 유효하면 사용자 정보를 요청 객체에 저장
        next(); // 다음 미들웨어 또는 라우터로 이동
    });
}

// 피드 관련 라우터 예시
app.get('/main', authenticateToken, (req, res) => {
    // 인증된 사용자의 피드 반환
    const feeds = [{ id: 1, userId: req.user.id, content: "Hello World", favorait: 10 }];
    res.json({ success: true, list: feeds });
});

// 피드 삭제
app.delete('/main/:id', authenticateToken, (req, res) => {
    const feedId = req.params.id;
    // 삭제 로직 수행 후 성공 메시지 반환
    res.json({ success: true, message: '삭제되었습니다.' });
});

// 좋아요 처리
app.put('/main/:id', authenticateToken, (req, res) => {
    const feedId = req.params.id;
    // 좋아요 증가 처리 후 성공 메시지 반환
    res.json({ success: true, message: '좋아요가 추가되었습니다.' });
});

app.listen(3031, ()=>{
    console.log("server start!");
})