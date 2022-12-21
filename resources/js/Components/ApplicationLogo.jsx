import React from 'react';

export default function ApplicationLogo({className, white}) {
    return (
        white ? (
            <img src="/img/logo_white.png" alt="ORTA Indonesia" className={className}/>
        ) : (
            <img src="/img/logo_red.png" alt="ORTA Indonesia" className={className}/>
        )
    );
}
