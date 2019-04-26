import { GET_ALL_NEWS, GET_FAIL, GET_SUCCES } from '../action/actionType';
const defaultState = [];

const allNewsReducer = (state = defaultState, action) => {

    switch (action.type) {
        case GET_FAIL:
            return [];
        case GET_SUCCES:
            return action.receivedNews;
        default:
            return state;
    }
}

export default allNewsReducer;