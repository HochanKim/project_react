// 내장 함수(기능) 가져오기
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 프론트엔드(페이지, 컴포넌트) 가져오기
import Login from './pages/LoginPage';
import Join from './pages/MemberJoinPage';
import Main from './pages/MainPage';
import './App.css';

function App() {
  const commonStyle = {
    'height' : '100dvh',
    'margin' : '0 auto',
    'textAlign' : 'center'
  }
  return (
    <div className='App' style={commonStyle}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/join' element={<Join />}></Route>
          {/* <Route path='/home' element={<Main />}></Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
