import React from 'react';

function Header(props) {
    const headerStyle = {
        'width' : '100%',
        'height' : '10vh',
        'backgroundColor' : '#999',
        'fontSize' : '20px',
        'fontWeight' : 'bold'
    }

    return (
        <div style={headerStyle}>
            헤더 영역
        </div>
    );
}

export default Header;