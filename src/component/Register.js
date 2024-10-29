import React from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Avatar,
  IconButton,
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import axios from 'axios';

function Register() {
  const [file, setFile] = React.useState(null);
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [category, setCategory] = React.useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const sendFeedData = async () => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('category', category);
      if (file) {
        formData.append('file', file);  // 파일 첨부
      }

      // 서버에 POST 요청
      const response = await axios.post('http://localhost:3031/feed', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',  // 멀티파트 전송을 위한 헤더 설정
        },
      });

      // 요청 성공 시 처리
      if (response.data.success) {
        alert('등록되었습니다!');
        // 추가로 성공 시 동작할 코드 (페이지 이동 등)
      }
    } catch (error) {
      console.error('데이터 전송 중 오류 발생:', error);
      alert('오류가 발생했습니다.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start" // 상단 정렬
        minHeight="100vh"
        sx={{ padding: '20px' }} // 배경색 없음
      >
        <Typography variant="h4" gutterBottom>
          등록
        </Typography>

        <FormControl fullWidth margin="normal">
          <InputLabel>카테고리</InputLabel>
          <Select 
            defaultValue="" 
            label="카테고리" 
            value={category} 
            onChange={(e) => 
            setCategory(e.target.value)
          }>
            <MenuItem value={1}>일상</MenuItem>
            <MenuItem value={2}>여행</MenuItem>
            <MenuItem value={3}>음식</MenuItem>
          </Select>
        </FormControl>

        <TextField label="제목" variant="outlined" margin="normal" value={title} fullWidth
          onChange={(e) => 
            {
              setTitle(e.target.value);
            }}
        />
        <TextField
          label="내용"
          variant="outlined"
          margin="normal"
          multiline
          rows={4}
          value={content}
          fullWidth
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />

        <Box display="flex" alignItems="center" margin="normal" >
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="file-upload"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="file-upload">
            <IconButton color="primary" component="span">
              <PhotoCamera />
            </IconButton>
          </label>
          {file && (
            <Avatar
              alt="첨부된 이미지"
              src={URL.createObjectURL(file)}
              sx={{ width: 56, height: 56, marginLeft: 2 }}
            />
          )}
          <Typography variant="body1" sx={{ marginLeft: 2 }}>
            {file ? file.name : '첨부할 파일 선택'}
          </Typography>
        </Box>

        <Button variant="contained" color="primary" style={{ marginTop: '20px' }} onClick={sendFeedData}>
          등록하기
        </Button>
      </Box>
    </Container>
  );
}

export default Register;