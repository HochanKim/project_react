import React from 'react';

import Header from '../component/Header';
import Footer from '../component/Footer';
import Feed from '../component/Feed';

function MainPage(props) {
    const feedPageStyle = {
    }

    return (
        <div className='container'>
            <Header></Header>
            <div style={feedPageStyle}>
                <Feed></Feed>
            </div>
        </div>
    );
}

export default MainPage;