import {UpdateUserStoryTypes} from '../action-types';
import {UpdateAction} from '../actions';

interface UserStoriesState {
    loading: boolean;
    error: string | null;
    data: boolean | null;
}

const initialState = {
    loading: false,
    error: null,
    data: null
}

const reducer = (state: UserStoriesState = initialState, action: UpdateAction): UserStoriesState => {
    switch (action.type) {
        case UpdateUserStoryTypes.UPDATE_USER_STORY:
            return {loading: true, error: null, data: null}
        case UpdateUserStoryTypes.UPDATE_USER_STORY_SUCCESS:
            return {loading: false, error: null, data: true}
        case UpdateUserStoryTypes.UPDATE_USER_STORY_ERROR:
            return {loading: false, error: action.payload, data: false}
        default:
            return state;
    }
};

export default reducer;