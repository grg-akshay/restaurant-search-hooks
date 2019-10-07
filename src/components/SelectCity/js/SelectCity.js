import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import '../styles/SelectCity.scss';
import { setCity } from '../../../actions/city';


 const SelectCity = (props) => {
    const dispatch = useDispatch(),
        history = useHistory();
    
    return (
        <div className='select-city'>
            Select City
            <div 
                className='select-city__buttons'
                onClick={(evt) => {
                    // may need useCallback here??
                    dispatch(setCity(evt.target.innerText));
                    console.log('city click');
                    history.push('/list');
                }}
            >
                <button>Pune</button>
                <button>Bangalore</button>
                <button>Delhi</button>
                <button>Chennai</button>
            </div>
        </div>
    )
 };

 export default SelectCity;
