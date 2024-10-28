import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Avatar, Grid, Paper } from '@mui/material';

function MyPage() {
  // 사용자 정보 저장을 위한 상태 변수들
  const [userData, setUserData] = useState({
    name: '',
    userId: '',
    profileImage: '',
    followers: 0,
    following: 0,
    posts: 0,
    bio: ''
  });

  // 서버에서 사용자 데이터를 불러오는 함수
  const fetchUserData = async () => {
    try {
      // 예시 API 요청 (실제로는 서버에서 데이터를 불러오는 API 엔드포인트)
      const response = await axios.get('http://localhost:3031/api/user'); // API URL 수정
      const data = response.data;

      // 서버에서 가져온 데이터로 상태 업데이트
      setUserData({
        name: data.name,
        userId: data.id,
        profileImage: data.profileImg,
        followers: data.followers,
        following: data.following,
        posts: data.posts,
        bio: data.biography
      });
    } catch (error) {
      console.error('사용자 데이터를 가져오지 못했습니다:', error);
    }
  };

  // 컴포넌트가 처음 렌더링될 때 API 호출
  useEffect(() => {
    fetchUserData();  // 사용자 데이터 가져오기
  }, []);


  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start"
        minHeight="100vh"
        sx={{ padding: '20px' }}
      >
        <Paper elevation={3} sx={{ padding: '20px', borderRadius: '15px', width: '100%' }}>
          {/* 프로필 정보 상단 배치 */}
          <Box display="flex" flexDirection="column" alignItems="center" sx={{ marginBottom: 3 }}>
            <Avatar
              alt="프로필 이미지"
              src={userData.profileImage}  // 서버에서 가져온 프로필 이미지
              sx={{ width: 100, height: 100, marginBottom: 2 }}
            />
            <Typography variant="h5">{userData.name}</Typography>  {/* 서버에서 가져온 이름 */}
            <Typography variant="body2" color="text.secondary">
              @{userData.username}  {/* 서버에서 가져온 사용자 이름 */}
            </Typography>
          </Box>
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            <Grid item xs={4} textAlign="center">
              <Typography variant="h6">팔로워</Typography>
              <Typography variant="body1">{userData.followers}</Typography>  {/* 팔로워 수 */}
            </Grid>
            <Grid item xs={4} textAlign="center">
              <Typography variant="h6">팔로잉</Typography>
              <Typography variant="body1">{userData.following}</Typography>  {/* 팔로잉 수 */}
            </Grid>
            <Grid item xs={4} textAlign="center">
              <Typography variant="h6">게시물</Typography>
              <Typography variant="body1">{userData.posts}</Typography>  {/* 게시물 수 */}
            </Grid>
          </Grid>
          <Box sx={{ marginTop: 3 }}>
            <Typography variant="h6">내 소개</Typography>
            <Typography variant="body1">
              {userData.bio}  {/* 서버에서 가져온 소개 정보 */}
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default MyPage;