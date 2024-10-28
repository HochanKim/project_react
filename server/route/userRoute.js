const express = require('express')
const router = express.Router();
const connection = require('../db');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
app.use(cors()); // 모든 도메인에서 오는 요청 허용


app.use(bodyParser.json());
const SECRET_KEY = 'your_secret_key';


router.route("/")
.get((req, res) => {
    const query = 'SELECT * FROM TBL_USER';
    connection.query(query, (err, results) => {
        if(err){
            console.log('쿼리를 불러오지 못함', err);
            return;
        }
        res.render('user', {userList : results});
    });
})
.post((req, res) => {
    const { useId, usePwd } = req.body;

    const query = 'SELECT * FROM TBL_USER WHERE ID = ? AND PWD = ?';
    connection.query(query, [ useId, usePwd ], (err, results) => {
        console.log(results);
        if(err){
            console.log('쿼리를 불러오지 못함', err);
            return;
        };

        // 빈 값
        if (useId == '' || usePwd == '') {
            res.json({success: false, message: '아이디와 비밀번호를 입력해주세요.'});
            return;
        }

        // 로그인 성공-실패
        if (results.length > 0) {
            // JWT 토큰 생성
            const token = jwt.sign({ id: useId }, SECRET_KEY, { expiresIn: '30m' });
            res.json({success: true, message: '성공적인 로그인', token});
            return;
        } else {
            res.json({success: false, message: '존재하지 않는 아이디이거나 비밀번호가 일치하지 않습니다.'});
            return;
        }
    });
})

router.route("/user/account:id")
.post((req, res) => {
    const id = req.params.id;   // db에 저장된 id 가져와서 넣기
    const query = 'SELECT * FROM TBL_USER WHERE ID = ? AND PWD = ?';
})


module.exports = router;