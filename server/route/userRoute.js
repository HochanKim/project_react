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
    const { useId, usePwd } = req.body;
    const query = 'SELECT * FROM TBL_USER WHERE ID = ? AND PWD = ?';
    connection.query(query, [ useId, usePwd ], (err, results) => {
        if(err){
            console.log('쿼리를 불러오지 못함', err);
            return;
        };
        // 로그인 버튼 클릭 시,
        if(results.length > 0){
            // 로그인 성공
            res.json({success : true, message : '성공적인 로그인'});
        } else {
            // 로그인 실패
            if(useId == '' || useId == null){
                alert("존재하지 않는 아이디입니다.");
            } else if(usePwd != usePwd){
                alert("비밀번호가 맞지 않습니다.");
            }
            res.json({success : false, message : '로그인 실패'});
        }
    });
})

router.route("/main")
.post()


module.exports = router;