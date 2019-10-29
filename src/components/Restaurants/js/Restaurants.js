import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from 'react-router-dom';

import { checkNonEmptyArray } from '../../../utils/array';
import { thunkRestaurants } from '../../../actions/restaurants';
import ErrorCard from '../../ErrorCard/js/ErrorCard';
import RestaurantCard from './RestaurantCard';
import '../styles/Restaurants.scss';
import Loader from '../../Loader/js/Loader';

const Restaurants = () => {
    const { restaurants, restaurantError, moreRestaurants } = useSelector(
            ({ restaurants, restaurantError, moreRestaurants }) => ({ restaurants, restaurantError, moreRestaurants })
        ),
        [start, setStart] = useState(1),
        dispatch = useDispatch(),
        { city } = useParams();

    function onScroll () {
        const newStart = start + 5;
        setStart(newStart);
        dispatch(thunkRestaurants(city, newStart));    
    };
    
    if (restaurantError) {
        return <ErrorCard errorMessage={restaurantError} />;
    }

    return (
        <div className='restaurants'>
            {
                checkNonEmptyArray(restaurants) &&
                <p className='restaurants__heading'>Showing restaurants in '{city}'</p>
            }
            <InfiniteScroll
                dataLength={restaurants.length}
                next={onScroll}
                hasMore={moreRestaurants}
                loader={<Loader />}
            >
                {
                    restaurants.map(({ restaurant }) => {
                        return <RestaurantCard key={restaurant.id} {...restaurant} />;
                    })
                }
            </InfiniteScroll>
        </div>
    );
}

export default Restaurants;