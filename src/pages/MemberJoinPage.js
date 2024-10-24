import React from 'react';

import Header from '../component/Header';
import Footer from '../component/Footer';
import Join from '../component/Join'

function MemberJoinPage(props) {
    const joinStyle = {
        'width' : '100%',
        'height' : '75vh',
        'fontSize' : '20px',
        'fontWeight' : 'bold'
    }

    return (
        <div className='container'>
            <Header></Header>
            <div style={joinStyle}>
                <Join></Join>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default MemberJoinPage;