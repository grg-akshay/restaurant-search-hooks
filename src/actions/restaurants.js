import { checkEmptyArray } from '../utils/array';

const API_KEY =`${process.env.REACT_APP_ZOMATO_API_KEY}`,
    BASE_URL = 'https://developers.zomato.com/api/v2.1',
    RESTAURANT_FETCH_COUNT = 5;

export const setRestaurants = (restaurants) => ({
    type: 'SET_RESTAURANTS',
    restaurants
});

export const unsetMoreRestaurant = () => ({
    type: 'UNSET_MORE_RESTAURANT'
});

export const setRestaurantError =(error) =>({
    type: 'SET_RESTAURANT_ERROR',
    error
});

function handleErrors (response) {
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response;
}

// fetches restaurants in a city
export const thunkRestaurants = (city = '', start = 1) => {
    return (dispatch, getState) => {
        fetch(`${BASE_URL}/cities?q=${city}&apikey=${API_KEY}`)
        .then(handleErrors)
        .then(res => res.json())
        .then(city => {
            let cityId;
            if (checkEmptyArray(city.location_suggestions)) {
                throw new Error('Something went wrong. Please try again later');
            }
            cityId = city.location_suggestions[0].id;

            return fetch(`${BASE_URL}/search?entity_id=${cityId}&entity_type=city&start=${start}` +
                `&count=${RESTAURANT_FETCH_COUNT}&sort=rating&order=desc&apikey=${API_KEY}`)
            .then(handleErrors)
            .then(res => res.json())
            .then(data => {
                if (!(data || data.restaurants || Array.isArray(data.restaurants))) {
                    throw new Error('Something went wrong. Please try again later');
                }
                
                // stops fetching more restaurants
                if (data.restaurants.length < RESTAURANT_FETCH_COUNT) {
                    dispatch(unsetMoreRestaurant());
                }
                dispatch(setRestaurants(data.restaurants));
            })
            .catch(err => {
                dispatch(setRestaurantError((err && err.message) || 'Something went wrong'));
            });
        })
        .catch(err => {
            // check your API key and limit of Basic API hits
            dispatch(setRestaurantError((err && err.message) || 'Something went wrong'));
        });   
    }
}