import {SearchUserStoriesActionType} from '../action-types';
import {SearchAction} from '../actions';
import {UserStoryInterface} from "../../../interfaces/UserStoryInterface";

interface UserStoriesState {
    loading: boolean;
    error: string | null;
    data: UserStoryInterface[];
}

const initialState = {
    loading: false,
    error: null,
    data: []
}

const reducer = (state: UserStoriesState = initialState, action: SearchAction): UserStoriesState => {
    switch (action.type) {
        case SearchUserStoriesActionType.SEARCH_USER_STORIES:
            return {loading: true, error: null, data: []}
        case SearchUserStoriesActionType.SEARCH_USER_STORIES_SUCCESS:
            return {loading: false, error: null, data: action.payload}
        case SearchUserStoriesActionType.SEARCH_USER_STORIES_ERROR:
            return {loading: false, error: action.payload, data: []}
        default:
            return state;
    }
};

export default reducer;