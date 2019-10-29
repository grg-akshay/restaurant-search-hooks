import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import '../styles/SelectCity.scss';
import { setCity, resetState } from '../../../actions/city';
import { thunkRestaurants } from '../../../actions/restaurants';


const SelectCity = () => {
    const dispatch = useDispatch(),
        history = useHistory();
    
    return (
        <div className='select-city'>
            Select City
            <div 
                className='select-city__buttons'
                onClick={(evt) => {
                    // may need useCallback here??
                    dispatch(resetState());
                    dispatch(setCity(evt.target.innerText));
                    dispatch(thunkRestaurants(evt.target.innerText));
                    history.push(`/restaurant-list/${evt.target.innerText}`);
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
