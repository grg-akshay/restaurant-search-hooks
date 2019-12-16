import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/Restaurants.scss';

export function RestaurantMeta (restaurant) {

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

function RestaurantCard (restaurant) {
    return (
        <Link
            to={`/restaurant/${restaurant.id}`}
        >
            <section className='restaurant'>
                <img 
                    alt='thumb'
                    className='media-left__image'
                    src={restaurant.thumb} 
                    width='200'
                    height='200'
                    onError={(e) => {
                        // the handler is removed to prevent infinite callbacks 
                        // when the fallback image, notAvailable.png fails
                        e.target.onerror = null; 
                        e.target.src = 'notAvailable.png';
                    }}
                />
                <aside>
                    <RestaurantMeta
                        name={restaurant.name}
                        rating={restaurant.user_rating.aggregate_rating}
                        votes={restaurant.user_rating.votes} 
                    />
                </aside> 
            </section>
        </Link>
    );
}

export default RestaurantCard; 