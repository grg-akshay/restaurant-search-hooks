const defaultState={
    city:'', 
    restaurants:[],
    totalRestaurantsInCity: null, 
    reviews: {},
    restaurantError: '',
    reviewError: ''
};

/**
 * restaurant reducer function
 */
export function reducer (state = defaultState, action) {
    switch (action.type) {
        case 'SET_CITY':
            return {
                ...state,
                city: action.city
            };

        case 'SET_RESTAURANTS':
            return {
                ...state,
                restaurants:  [...state.restaurants, ...action.restaurants.restaurants],
                totalRestaurantsInCity: action.restaurants.results_found
            };

        case 'SET_RESTAURANT_ERROR':
            return {
                ...state,
                restaurantError: action.error
            };
        
        case 'SET_REVIEW_ERROR':
            return {
                ...state,
                reviewError: action.error
            };

        case 'SET_REVIEWS': 
            return {
                ...state,
                reviews: { ...state.reviews, [action.restaurantId]: action.reviews }
            };
        
        case 'RESET_STATE': 
            return defaultState;

        default:
            return state;
    }
}