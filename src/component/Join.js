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

    // 중복 체크
    const [isDuplicateCheck, setDuplicateCheck] = useState(false);

    async function duplicateCheck() {
      const useId = inputEmailRef.current.value;

      if (!useId) {
          alert('아이디를 입력해주세요.');
          return;
      }

      try {
          const res = await axios.post("http://localhost:3031/join/check-duplicate", { 
            useId 
          });
          alert(res.data.message);

          // 중복 확인 결과에 따라 상태 업데이트
          if (res.data.success) {
              setDuplicateCheck(true); // 사용 가능한 아이디일 경우 중복 체크 완료 상태로 설정
          } else {
              setDuplicateCheck(false); // 중복된 아이디일 경우 중복 체크 상태 유지
          }
      } catch (error) {
          console.error("중복 체크 요청 오류:", error);
          alert("서버와의 통신에 실패했습니다.");
      }
  }

    async function fnJoin(){
        // '회원가입' 버튼 클릭시, 기입한 데이터 보내기
        const useId = inputEmailRef.current.value;
        const usePwd = inputPwdRef.current.value;
        const pwdCheck = confirmPwdRef.current.value;
        const userName = inputNameRef.current.value;

        console.log("콘솔 : ", useId, usePwd, pwdCheck, userName);

        // 아이디 중복체크
        if(!isDuplicateCheck){
          return alert('아이디 중복체크를 완료해주세요.');
        }

        // 비밀번호 체크
        if(usePwd != pwdCheck){
          return alert('비밀번호가 맞지 않습니다.');
        }

        try {
          const res = await axios.post("http://localhost:3031/join", {
            useId,
            usePwd,
            userName  
          });

          // 빈값
          if (useId == '') {
                console.log(res, res.data.message);
                alert(res.data.message);
                return;
            } else if (usePwd == '') {
                console.log(res, res.data.message);
                alert(res.data.message);
                return;
            } else if (userName == '') {
                console.log(res, res.data.message);
                alert(res.data.message);
                return;
            }

          // 통신
          if(res.data.success){
            alert(res.data.message);
            console.log(res.data.success, res.data.message);
            navigate("/");
          } else {
            console.log(res.data.error.message);
          }
    
        } catch(error){
          console.log("오류 발생");
        }
          
    }



  return (
    <div style={joinStyle}>
        <h2>회원가입 페이지</h2>
        <TextField style={{margin : '10px 0'}} fullWidth label="아이디" id="useId" inputRef={inputEmailRef} onChange={() => setDuplicateCheck(false)}/>
        <button onClick={duplicateCheck}>중복확인</button>
        <TextField style={{margin : '10px 0'}} type="password" fullWidth label="비밀번호" id="usePwd" inputRef={inputPwdRef} />
        <TextField style={{margin : '10px 0'}} type="password" fullWidth label="비밀번호 확인" id="pwdCheck" inputRef={confirmPwdRef} />
        <TextField style={{margin : '10px 0'}} fullWidth label="이름/별명" id="userName" inputRef={inputNameRef}/>
        <Button variant="contained" style={{marginTop : '20px'}} onClick={fnJoin}>가입하기</Button>
    </div>
  );
}

export default Join;