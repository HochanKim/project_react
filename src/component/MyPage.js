import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MyPage({ userId }) {
  const [userData, setUserData] = useState({
    name: '',
    profileImg: '',
    followers: 0,
    following: 0,
    posts: 0,
    biography: '',
    postList: []  // 게시글 리스트
  });
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  useEffect(() => {
    const token = localStorage.getItem('token'); // 로컬 스토리지에서 JWT 토큰 가져오기

    // 사용자 정보와 게시글 가져오기
    const fetchUserData = async () => {
      try {
        setLoading(true); // 데이터 로딩 시작
        setError(null); // 에러 초기화

        const response = await axios.get(`http://localhost:3031/account/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`  // 서버에 토큰을 전달
          }
        });

        setUserData(response.data);  // 서버에서 받은 데이터를 상태에 저장
      } catch (error) {
        console.error('사용자 정보를 가져오지 못했습니다:', error);
        setError('사용자 정보를 불러오는 중 문제가 발생했습니다.');
      } finally {
        setLoading(false);  // 로딩 끝
      }
    };

    if (userId) {
      fetchUserData();  // userId가 있을 때만 데이터를 요청
    }
  }, [userId]);  // userId가 바뀔 때마다 호출

  if (loading) {
    return <p>로딩 중...</p>;  // 로딩 상태 UI
  }

  if (error) {
    return <p>{error}</p>;  // 에러 상태 UI
  }

  return (
    <div>
      <h1>{userData.name}</h1>
      <img src={userData.profileImg} alt="프로필 이미지" style={{ width: '100px', borderRadius: '50%' }} />
      <p>Followers: {userData.followers}</p>
      <p>Following: {userData.following}</p>
      <p>Posts: {userData.posts}</p>
      <p>{userData.biography}</p>

      <h2>작성한 게시글</h2>
      <ul>
        {userData.postList.length > 0 ? (
          userData.postList.map(post => (
            <li key={post.postId}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <small>{new Date(post.date).toLocaleString()}</small>
            </li>
          ))
        ) : (
          <p>게시글이 없습니다.</p>
        )}
      </ul>
    </div>
  );
}

export default MyPage;