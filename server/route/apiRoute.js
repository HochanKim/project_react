const express = require('express');
const router = express.Router();
const connection = require('../db');  // DB 연결 설정
const jwt = require('jsonwebtoken');  // JWT 라이브러리
const cors = require('cors');

const app = express();
app.use(cors()); // 모든 도메인에서 오는 요청 허용

// JWT 시크릿 키 설정 (로그인 시 발급한 것과 동일해야 함)
const SECRET_KEY = 'your_secret_key';

// 사용자 정보를 가져오는 라우트 (토큰 검증 추가)
router.route("/account/:id")
.get((req, res) => {
    const token = req.headers.authorization?.split(' ')[1];  // Bearer token 추출

    // 토큰이 없으면 인증되지 않은 사용자로 처리
    if (!token) {
        return res.status(401).json({ message: '인증되지 않은 사용자입니다.' });
    }

    // JWT 토큰 검증
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: '유효하지 않은 토큰입니다.' });
        }

        const userId = req.params.id;  // URL 파라미터에서 사용자 ID 가져오기

        // 사용자 정보 조회 쿼리
        const userQuery = 'SELECT * FROM SWALLOW_USER WHERE ID = ?';

        // 게시글 정보 조회 쿼리
        const postQuery = 'SELECT * FROM TBL_FEED WHERE USERID = ? ORDER BY ID DESC';

        // 사용자 정보 조회
        connection.query(userQuery, [userId], (err, userResults) => {
            if (err) {
                console.error('DB 조회 중 오류 발생:', err);
                return res.json({ message: '서버 오류' });
            }

            // 결과가 없을 경우 사용자 정보가 없다고 응답
            if (userResults.length === 0) {
                return res.json({ message: '사용자를 찾을 수 없습니다.' });
            }

            // 사용자 정보 추출
            const userData = {
                name: userResults[0].NAME,
                userId: userResults[0].ID,
                profileImg: userResults[0].profileImg,
                followers: userResults[0].FOLLOWERS,
                following: userResults[0].FOLLOWING,
                posts: userResults[0].POSTS,
                biography: userResults[0].BIOGRAPHY,
                postList: []
            };

            // 게시글 정보 조회
            connection.query(postQuery, [userId], (err, postResults) => {
                if (err) {
                    console.error('게시글 조회 중 오류 발생:', err);
                    return res.json({ message: '게시글 조회 오류' });
                }

                // 게시글 정보 추가
                userData.postList = postResults.map(post => ({
                    postId: post.ID,
                    title: post.TITLE,
                    content: post.CONTENT,
                    date: post.cdatetime
                }));

                // 사용자 정보와 게시글 정보 반환
                return res.json(userData);
            });
        });
    });
});

module.exports = router;