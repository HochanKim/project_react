import React from 'react';
import Header from '../component/Header';
import MyPage from '../component/MyPage';
import Footer from '../component/MyPage';

function AccountPage(props) {
    return (
        <div>
            <Header></Header>
            <MyPage></MyPage>
            <Footer></Footer>
        </div>
    );
}

export default AccountPage;