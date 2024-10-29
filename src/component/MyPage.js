import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';  // jwt 디코딩 라이브러리 추가

function MyPage() {
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
  const fetchUserData = async (userId) => {
    try {
      // API 요청 보내기
      const response = await axios.get(`http://localhost:3031/api/account/${userId}`);
      const data = response.data;

      // 서버에서 가져온 데이터로 상태 업데이트
      setUserData({
        name: data.name,
        userId: data.userId,
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
    // 로컬 스토리지에서 JWT 토큰 가져오기
    const token = localStorage.getItem('token');
    
    if (token) {
      // JWT 토큰을 디코딩해서 사용자 ID 가져오기
      const decodedToken = jwtDecode(token);  // 디코딩
      const userId = decodedToken.id;  // JWT 토큰에서 사용자 ID 추출

      console.log("현재 로그인 아이디:", userId);  // 콘솔로 ID 확인
      fetchUserData(userId);  // 사용자 데이터 가져오기
    } else {
      console.error('로그인된 사용자가 없습니다.');
    }
  }, []);

  return (
    <div>
      {/* 사용자 정보 출력 */}
      <h1>{userData.name}</h1>
      <div>{userData.profileImage}</div>
      <p>아이디 : @{userData.userId}</p>
      <p>소개 : {userData.bio}</p>
    </div>
  );
}

export default MyPage;