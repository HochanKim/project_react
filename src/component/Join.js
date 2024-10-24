import React, { useRef, useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Box, SendIcon } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Join() {
    const joinStyle = {
        margin : '30px auto',
        width : '20%'
    }

    // 회원가입할 이메일과 비밀번호 상태 관리
    const inputEmailRef = useRef();
    const inputPwdRef = useRef();
    const confirmPwdRef = useRef();     // 비밀번호 확인용
    const inputNameRef = useRef();    
    // 내비게이트 기능
    const navigate = useNavigate();

    async function fnJoin(){
        // '회원가입' 버튼 클릭시, 기입한 데이터 보내기
        const useId = inputEmailRef.current.value;
        const usePwd = inputPwdRef.current.value;
        const pwdCheck = confirmPwdRef.current.value;
        const userName = inputNameRef.current.value;

        console.log("콘솔 : ", useId, usePwd, pwdCheck, userName);

        if(usePwd != pwdCheck){
          return alert('비밀번호가 맞지 않습니다.');
        }
    
        try {
          const res = await axios.post("http://localhost:3031/join", {
            useId,
            usePwd,
            userName
            
          });

          if (useId == '') {
                console.log(res, res.data.message);
                return;
            } else if (usePwd == '') {
                console.log(res, res.data.message);
                return;
            } else if (userName == '') {
                console.log(res, res.data.message);
                return;
            }

          // 통신
          if(res.data.success){
            console.log(res.data.success, res.data.message);
            navigate("/main");
          } else {
            console.log(res.data.error.message);
          }
    
        } catch(error){
          console.log("오류 발생");
        }
          
    }

    const [idFlg, setIdFlg] = useState(null);
    const [nameFlg, setNameFlg] = useState(null);
    const [nickNameFlg, setNickNameFlg] = useState(null);
    const [pwdFlg, setPwdFlg] = useState(null);
    const [pwdCheckFlg, setPwdCheckFlg] = useState(null);


  return (
    <div style={joinStyle}>
        <h2>회원가입 페이지</h2>
        <TextField style={{margin : '10px 0'}} fullWidth label="아이디" id="useId" inputRef={inputEmailRef} />
        <TextField style={{margin : '10px 0'}} type="password" fullWidth label="비밀번호" id="usePwd" inputRef={inputPwdRef} />
        <TextField style={{margin : '10px 0'}} type="password" fullWidth label="비밀번호 확인" id="pwdCheck" inputRef={confirmPwdRef} />
        <TextField style={{margin : '10px 0'}} fullWidth label="이름/별명" id="userName" inputRef={inputNameRef}/>
        <Button variant="contained" style={{marginTop : '20px'}} onClick={fnJoin}>가입하기</Button>
    </div>
  );
}

export default Join;