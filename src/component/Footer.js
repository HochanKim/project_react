import React from 'react';

function Footer(props) {
    const footerStyle = {
        'width' : '100%',
        'height' : '15vh',
        'backgroundColor' : '#999',
        'fontSize' : '20px',
        'fontWeight' : 'bold'
    }

    return (
        <div style={footerStyle}>
            푸터 영역
        </div>
    );
}

export default Footer;