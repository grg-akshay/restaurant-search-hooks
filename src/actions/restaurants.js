import { checkEmptyArray } from '../utils/array';

const API_KEY =`${process.env.REACT_APP_ZOMATO_API_KEY}`,
    BASE_URL = 'https://developers.zomato.com/api/v2.1',
    RESTAURANT_FETCH_COUNT = 5;

export function setRestaurants (restaurants) {
    return {
        type: 'SET_RESTAURANTS',
        restaurants
    };
};

export function setRestaurantError (error) {
    return {
        type: 'SET_RESTAURANT_ERROR',
        error
    };
}

function handleErrors (response) {
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response;
}

/**
 * thunkRestaurants
 * @param {String} city - name of city
 * @param {Number} start - index used for fetching the data for windowing
 */
export function thunkRestaurants (city = '', start = 1) {
    let cityId;

    return (dispatch, getState) => {
        // API call for getting cityId of selected city
        fetch(`${BASE_URL}/cities?q=${city}&apikey=${API_KEY}`)
            .then(handleErrors)
            .then(res => res.json())
            .then(city => {
                if (checkEmptyArray(city.location_suggestions)) {
                    throw new Error('Something went wrong. Please try again later');
                }
                cityId = city.location_suggestions[0].id;

                // API call for searching window-size restaurants in selected city
                return fetch(`${BASE_URL}/search?entity_id=${cityId}&entity_type=city&start=${start}` +
                    `&count=${RESTAURANT_FETCH_COUNT}&sort=rating&order=desc&apikey=${API_KEY}`)
                    .then(handleErrors)
                    .then(res => res.json())
                    .then(data => {
                        if (!(data || data.restaurants || Array.isArray(data.restaurants))) {
                            throw new Error('Something went wrong. Please try again later');
                        }
                        
                        dispatch(setRestaurants(data));
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