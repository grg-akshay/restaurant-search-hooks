import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { checkNonEmptyArray } from '../../../utils/array';
import { thunkReviews } from '../../../actions/reviews';

function RestaurantMeta (restaurant) {

    /**
     * provides className which helps in deciding color based on rating
     * @param {*} rating 
     */
    function getColorClassName (rating) {
        let result = 'restaurant-meta__rating ';

        if (rating > 4.5) {
        result += 'level-8';
        }
        else if (rating > 4.0) {
        result += 'level-6';
        }
        else if (rating > 3.5) {
        result += 'level-4';
        }
        else if (rating >= 3.0) {
        result += 'level-2';
        }

        else {
        result += 'level-0';
        }
        
        return result;
    }

    if (!restaurant) {
        return <></>;
    }

    return (
        <div className='restaurant-meta'>
            <h3 className='restaurant-meta__name'>{restaurant.name}</h3>
            <span className={getColorClassName(restaurant.rating)}>{restaurant.rating}</span>
            {
                restaurant.votes && 
                    <span className='restaurant-meta__votes'>({restaurant.votes} votes)</span>
            }
            {/* <span className='res_review' >| &nbsp;&nbsp;   {props.reviews_count} reviews</span>   */}
        </div>
    );
}

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
                    <RestaurantMeta
                        name={restaurant.restaurant.name}
                        rating={restaurant.restaurant.user_rating.aggregate_rating}
                        votes={restaurant.restaurant.user_rating.votes} 
                    />
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