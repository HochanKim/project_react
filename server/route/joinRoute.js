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
    const query = 'INSERT INTO tbl_user (id, pwd, name, gender) VALUES(?, ?, ?, null)';
    connection.query(query, [ useId, usePwd, userName ], (err, results) => {
        if(err){
            console.log('쿼리를 불러오지 못함', err);
            return;
        }

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
    });
})



module.exports = router;