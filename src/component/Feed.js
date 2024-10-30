import React, { useEffect, useState } from 'react';
import axios from 'axios';    // axios 통신기능 가져오기
import { Box, Typography, Paper, IconButton, Dialog } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DeleteIcon from '@mui/icons-material/Delete';
import { jwtDecode } from 'jwt-decode';  // jwt 토큰 디코딩

function Feed() {
    const [feeds, setFeeds] = useState([]);
    const [open, setOpen] = useState(false);  // 모달 열림 상태 관리
    const [selectedImage, setSelectedImage] = useState(null);  // 선택된 이미지

    // 모달 열기 함수
    const handleClickOpen = (image) => {
        setSelectedImage(image);  // 선택된 이미지를 설정
        setOpen(true);  // 모달 열기
    };

    // 모달 닫기 함수
    const handleClose = () => {
        setOpen(false);  // 모달 닫기
        setSelectedImage(null);  // 선택된 이미지 초기화
    };

    // 로컬 스토리지에서 JWT 토큰 가져오기
    const token = localStorage.getItem('token');

    // 토큰에서 현재 로그인한 사용자 아이디 추출
    const currentUserId = token ? jwtDecode(token).id : null;  


    async function fnGetFeed(){
        // 피드 가져오기
        try {
            const res = await axios.get("http://localhost:3031/main", {
                headers: { Authorization: `Bearer ${token}` }
            });
            if(res.data.success){
                setFeeds(res.data.list);
                console.log(res.data.list);
            } else {
                console.log("에러");
            }
        } catch(err) {
            console.log("db 어떻게 가져와?");
        }
    }

    async function fnRemoveFeed(id){
        // 특정 피드 삭제하기
        if(!window.confirm("삭제하시겠습니까?")) {
            return;
        };

        const res = await axios.delete(`http://localhost:3031/main/${id}`);
        if(res.data.success){
            alert("삭제되었습니다.");
            fnGetFeed(); // 삭제후 다시 데이터를 불러오기 위해 관련 함수를 호출
        } else {
            alert("오류 발생");
        }
    }


    async function fnLikeFeed(id){
        // 좋아요 버튼
        try {
            const res = await axios.put(`http://localhost:3031/main/${id}`);
            if(res.data.success){
                console.log(res.data.success);
                fnGetFeed();
            } else {
                console.log("에러");
            }
        } catch(err) {
            console.log("db 어떻게 가져와?");
        }

    };


    // 피드 데이터 로드(렌더링)
    useEffect(() => {
        fnGetFeed();
    }, []);

    return (
    <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        padding={3}
    >
        {feeds.map((feed) => (
          <Paper key={feed.id} sx={{ width: '100%', maxWidth: '800px', mb: 2, p: 2 }}>
              <Typography variant="h6" gutterBottom>
                {feed.userId}
              </Typography>
              <Typography variant="h6" gutterBottom>
                {feed.title}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {feed.content}
              </Typography>
                {/* 이미지가 있을 경우 이미지 표시 및 클릭시 확대 */}
                {feed.imgPath && (
                    <img
                    src={`http://localhost:3031/${feed.imgPath}`}
                    alt={feed.title}
                    style={{ width: '100%', cursor: 'pointer' }}  // 클릭 가능한 스타일
                    onClick={() => handleClickOpen(`http://localhost:3031/${feed.imgPath}`)}  // 클릭시 모달 열기
                    />
                )}
              <Typography variant="caption" color="textSecondary" gutterBottom>
                {new Date(feed.cdatetime).toLocaleString()}
              </Typography>
              <Box display="flex" justifyContent="space-between" mt={1}>
                  <Box>
                  <IconButton color="primary" onClick={()=>{
                    // 좋아요 버튼
                      fnLikeFeed(feed.id);
                  }}>
                      <ThumbUpIcon style={{marginRight : '20px'}} /> {feed.favorait}
                  </IconButton>
                {currentUserId === feed.userId && (
                    <IconButton color="secondary" onClick={() => 
                        fnRemoveFeed(feed.id)
                    }>
                        <DeleteIcon />
                    </IconButton>
                )}
                  </Box>
              </Box>
          </Paper>
        ))}

        {/* Dialog 모달을 사용하여 이미지 확대 */}
        <Dialog open={open} onClose={handleClose} maxWidth="md">
            {/* 이미지가 모달 바깥을 클릭하면 onClose 이벤트로 닫힘 */}
            <img
            src={selectedImage}
            alt="확대된 이미지"
            style={{ width: '100%', height: 'auto' }}
            onClick={handleClose}  // 이미지를 클릭해도 모달을 닫을 수 있게 설정 가능
            />
        </Dialog>
    </Box>
    );
}

export default Feed;