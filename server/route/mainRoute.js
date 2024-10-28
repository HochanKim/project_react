const express = require('express')
const router = express.Router();
const connection = require('../db');


router.route("/")
.get((req, res) => {
    const query = 'SELECT * FROM TBL_FEED';
    connection.query(query, (err, results) => {
        if(err){
            console.log('쿼리를 불러오지 못함', err);
            return;
        }
        res.json({ success: true, list: results });
    });
})

// 좋아요, 삭제 기능
router.route("/:id")
.delete((req, res)=>{
    const id = req.params.id;   // db에 저장된 id 가져와서 넣기
    const query = `DELETE FROM TBL_FEED WHERE id = ?`;
    connection.query(query, [ id ], (err, results) => {
        if(err){
            alert('실패하였습니다 : ', err);
            return res.json({ success : false, message : '삭제 실패'});
        }
        res.json({success : true, message : '정상적으로 삭제'});
    });
})
.put((req, res)=>{
    const id = req.params.id;
    const query = `UPDATE TBL_FEED SET FAVORAIT = FAVORAIT + 1 WHERE ID = ?`;
    connection.query(query, [ id ], (err, results) => {
        if(err){
            alert('실패하였습니다 : ', err);
            return res.json({ success : false, message : '좋아요 안올라감'});
        }
        res.json({success : true, message : '좋아요 +1'});
    });
})

module.exports = router;