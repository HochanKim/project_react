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
            Welcome to Swallow!
        </div>
    );
}

export default Footer;