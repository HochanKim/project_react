import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import HistoryEduRoundedIcon from '@mui/icons-material/HistoryEduRounded';
import logo from '../swallowLogo.webp';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // jwt 디코딩 라이브러리 추가

export default function MenuAppBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);  // 사용자 ID 상태
  const navigate = useNavigate();

  // 페이지가 로드될 때 로컬 스토리지에서 토큰을 확인
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      const decodedToken = jwtDecode(token);  // 토큰에서 사용자 ID 추출
      setUserId(decodedToken.id);  // 토큰에서 추출한 id를 상태로 저장
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  // 메인 페이지 이동
  const fnMove = () => {
    if(userId == null){
      alert("로그인을 해주세요");
      return;
    } 
      navigate('/main');
  };

  const handleWrite = () => {
    navigate(`/regist/${userId}`)
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    if (userId) {
      // 사용자 ID를 URL 경로에 포함시켜 이동
      navigate(`/api/account/${userId}`);
    }
  };

  // 로그아웃 처리 함수 (토큰 삭제)
  const handleLogout = () => {
      localStorage.removeItem('token');  // 토큰 삭제
      setIsAuthenticated(false);  // 상태를 비로그인 상태로 변경
      alert("로그아웃되었습니다.");
      navigate('/');
  };


  const logoSize = {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    margin: '10px',
    cursor : 'pointer'
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <img src={logo} alt="로고" style={logoSize} onClick={fnMove}/>
          </Typography>
          
          {/* 로그인 여부에 따라 조건부 렌더링 */}
          {isAuthenticated ? (
            <div style={{ display : 'flex'}}>
                <HistoryEduRoundedIcon 
                  sx={{ 
                    fontSize: 40,
                    marginRight : '10px'
                  }}
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleWrite}
                  color="inherit"
                  cursor="pointer"
                />
              <IconButton
                sx={{ 
                  fontSize: 60,
                  marginRight : '8px'
                }}
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Log Out</MenuItem>
              </Menu>
            </div>
          ) : (
            <Button color="inherit">
              환영합니다~!
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}