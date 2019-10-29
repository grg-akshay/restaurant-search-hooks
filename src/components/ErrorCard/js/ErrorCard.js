import React from 'react';

import '../styles/ErrorCard.scss';

const errorImage = require('../styles/ErrorImage.png');

const ErrorCard = ({ errorMessage }) => {
    return (
        <div className='error-card'>
            <img src={errorImage} alt='Oops!' height='300' width='300' />
            <div className='error-card__message'>{errorMessage}</div>
        </div>
    );
}

export default ErrorCard;