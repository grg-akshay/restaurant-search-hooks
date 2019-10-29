import React from 'react';

import '../styles/Loader.scss';

const image=require('../styles/loader.gif');

function Loader () {
  return (
    <div className='loader'>
      <img src={image} alt='loading...'/>
    </div>
  );
}

export default Loader;