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

function Restaurants () {
    const { restaurants, restaurantError, totalRestaurantsInCity } = useSelector(
            ({ restaurants, restaurantError, totalRestaurantsInCity }) => ({ restaurants, restaurantError, totalRestaurantsInCity })
        ),
        [start, setStart] = useState(1),
        dispatch = useDispatch(),
        { city } = useParams();

    function onScroll () {
        const newStart = start + 5;
        setStart(newStart);
        dispatch(thunkRestaurants(city, newStart));    
    }

    function hasMoreRestaurants () {
        if (!totalRestaurantsInCity || restaurants.length === 0) {
            return false;
        }

        return totalRestaurantsInCity !== restaurants.length;
    }
    
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
                hasMore={hasMoreRestaurants()}
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