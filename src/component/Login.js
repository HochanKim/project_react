import React, { useRef } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    // 회원 아이디, 비밀번호 메모리 설정
    const userIdRef = useRef('');     
    const passwordRef = useRef('');  
    // 해당 페이지로 이동
    const navigate = useNavigate();

    const clickLogin = async () => {
        console.log(userIdRef.current.value);
        console.log(passwordRef.current.value);

        const userId = userIdRef.current.value;
        const userPwd = passwordRef.current.value;

        try {
            const res = await axios.post("http://localhost:3031/user", 
              {
                userId : userIdRef.current.value, 
                userPwd : passwordRef.current.value
              });   // 'res' 객체로 리턴
              console.log(res.data);

              if(res.data.success == true){
                // 로그인 성공
                localStorage.setItem('token', res.data.token);
                navigate("/main");
                console.log(res, res.data.message);
              } else if(res.data.message == '아이디와 비밀번호를 입력해주세요.') {
                // 빈값 
                navigate("/join")
                alert(res.data.message);
                return;
              } else {
                // 맞지 않은 비밀번호
                alert(res.data.message);
                return;
              }
        } catch(err){
          // 예외처리
          console.log("실패");
        }
    }

  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="75vh"
      >
        <Typography variant="h4" gutterBottom>
          로그인
        </Typography>
        <TextField label="Email" variant="outlined" margin="normal" fullWidth inputRef={userIdRef}/>
        <TextField
          label="Password"
          variant="outlined"
          margin="normal"
          fullWidth
          type="password"
          inputRef={passwordRef}
        />
        <Button variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }} onClick={clickLogin}>
          로그인
        </Button>
        <Typography variant="body2" style={{ marginTop: '10px' }}>
          신규 가입을 원하면 여기로 ☞ <Link to="/join">회원가입</Link>
        </Typography>
      </Box>
    </Container>
  );
}

export default Login;