const express = require('express');
const router = express.Router();
const connection = require('../db');  // DB 연결 설정
const cors = require('cors');

const app = express();
app.use(cors()); // 모든 도메인에서 오는 요청 허용

// 사용자 정보를 가져오는 라우트
router.route("/account/:id")
.get((req, res) => {
    const userId = req.params.id;  // URL 파라미터에서 id 가져오기
    const query = 'SELECT * FROM SWALLOW_USER WHERE ID = ?';  // DB에서 사용자 정보 조회

    connection.query(query, [userId], (err, results) => {
        if (err) {
            console.error('DB 조회 중 오류 발생:', err);
            return res.json({ message: '서버 오류' });
        }

        // 결과가 없을 경우 사용자 정보가 없다고 응답
        if (results.length === 0) {
            return res.json({ message: '사용자를 찾을 수 없습니다.' });
        }

        // 사용자 정보가 있을 경우 해당 정보 반환
        const userData = results[0];  // DB에서 가져온 첫 번째 결과 (사용자 정보)
        return res.json({
            name: userData.NAME,
            useId: userData.ID,
            profileImg: userData.profileImg,
            followers: userData.FOLLOWERS,
            following: userData.FOLLOWING,
            posts: userData.POSTS,
            biography: userData.BIOGRAPHY
        });
    });
});

module.exports = router;