const API_KEY =`${process.env.REACT_APP_ZOMATO_API_KEY}`,
    BASE_URL = 'https://developers.zomato.com/api/v2.1',
    REVIEW_FETCH_COUNT = 5;

export const setReviews = (id, reviews) => ({
    type: 'SET_REVIEWS',
    restaurantId: id,
    reviews
});

export const unsetReviews = () => ({
    type: 'UNSET_REVIEWS'
});

export const setReviewError =(error) =>({
    type: 'SET_REVIEW_ERROR',
    error
});

function handleErrors (response) {
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response;
}

// fetches restaurant reviews
export const thunkReviews = (restaurantId, start = 1) => {
    return (dispatch, getState) => {
        fetch(`${BASE_URL}/reviews?res_id=${restaurantId}&apikey=${API_KEY}&start=${1}` + 
            `&count=${REVIEW_FETCH_COUNT}`)
        .then(handleErrors)
            .then(res => res.json())
        .then(reviews => {
            dispatch(setReviews(restaurantId, reviews))
        })
        .catch(err => {
            dispatch(setReviewError((err && err.message) || 'Something went wrong'));
        });   
    }
}