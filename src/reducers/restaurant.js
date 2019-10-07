const defaultState={
    city:'', 
    restaurants:[],
    error: ''
};

export const restaurantReducer = (state=defaultState, action) => {
    switch (action.type) {
        case 'SET_CITY':
            return {
                ...state,
                city: action.city
            };

        case 'SET_RESTAURANTS':
            return {
                ...state,
                restaurants:  [...state.restaurants , action.restaurant]
            };

        case 'SET_ERROR':
            return {
                ...state,
                error: action.error
            };

        default:
            return state;
    }
}