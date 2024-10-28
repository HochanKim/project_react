const express = require('express')
const router = express.Router();
const connection = require('../db');

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
    const { useId, usePwd, userName } = req.body;

    // 빈 값
    if (useId == '') {
        res.json({success: false, message: '아이디를 입력해주세요.'});
        return;
    } else if (usePwd == '') {
        res.json({success: false, message: '비밀번호를 입력해주세요.'});
        return;
    } else if (userName == '') {
        res.json({success: false, message: '이름을 입력해주세요.'});
        return;
    }

    const query = 'INSERT INTO tbl_user (id, pwd, name, gender) VALUES(?, ?, ?, null)';
    connection.query(query, [ useId, usePwd, userName ], (err, results) => {
        if(err){
            console.log('쿼리를 불러오지 못함', err);
            return;
        }
        res.json({success : true, message : '회원가입이 완료했습니다.'});

    });
})

// 아이디 중복체크
router.post('/check-duplicate', (req, res) => {
    const { useId } = req.body; // 사용자가 입력한 아이디

    // 입력된 아이디를 DB에서 검색
    const query = 'SELECT * FROM tbl_user WHERE id = ?';
    connection.query(query, [useId], (err, results) => {
        if (err) {
            console.log('쿼리를 불러오지 못함', err);
            return res.json({ success: false, message: '서버 오류' });
        }

        if (results.length > 0) {
            // 아이디가 이미 존재하는 경우
            res.json({ success: false, message: '이미 존재하는 아이디입니다.' });
        } else if (useId == '') {
            res.json({ success: false, message: '아이디를 입력해주세요.' });
        } else {
            // 아이디가 존재하지 않는 경우
            res.json({ success: true, message: '사용 가능한 아이디입니다.' });
        }
    });
});


module.exports = router;