import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import '../styles/Restaurants.scss';
import { checkNonEmptyArray } from '../../../utils/array';
import { thunkReviews } from '../../../actions/reviews';
import { RestaurantMeta } from './RestaurantCard';

function RestaurantDetail () {
    const dispatch = useDispatch(),
        { id } = useParams(),
        { reviews, restaurants } = useSelector(state => {
            return { reviews: state.reviews, restaurants: state.restaurants };
        }),
        restaurantReview = reviews && reviews[id] && reviews[id].user_reviews,
        [ restaurant, setRestaurant ] = useState(null);

    useEffect(() => {
        const findRestaurant = () => {
            return restaurants && restaurants.find(({ restaurant }) => {
                return restaurant.id === id;
            });
        }

        setRestaurant(findRestaurant());
    }, [setRestaurant, id, restaurants]);

    useEffect (() => {
        dispatch(thunkReviews(id));
    }, [dispatch, id]);
    
    return (
        <div>
            {
                restaurant && 
                    <section className='restaurant-detail'>
                        <img 
                            alt='thumb'
                            className='restaurant-detail__image'
                            src={restaurant.restaurant.thumb}
                            onError={(e) => {
                                // the handler is removed to prevent infinite callbacks 
                                // when the fallback image, notAvailable.png fails
                                e.target.onerror = null; 
                                e.target.src = 'notAvailable.png';
                            }}
                        />
                        <aside>
                            <RestaurantMeta
                                name={restaurant.restaurant.name}
                                rating={restaurant.restaurant.user_rating.aggregate_rating}
                                votes={restaurant.restaurant.user_rating.votes} 
                            />
                        </aside> 
                    </section>
            }
            Reviews
            {
                checkNonEmptyArray(restaurantReview) &&
                    <>
                        <p>{restaurantReview[0].review.user.name}</p>
                        <p>{restaurantReview[0].review.rating}</p>
                    </>
            }
        </div>
    )
}

export default RestaurantDetail;