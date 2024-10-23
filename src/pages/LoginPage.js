import React from 'react';

import Login from '../component/Login';
import Header from '../component/Header';

function LoginPage(props) {
    return (
        <div className='container'>
            <Header></Header>
            <Login></Login>
        </div>
    );
}

export default LoginPage;