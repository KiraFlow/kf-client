import {DeleteUserStoryTypes} from '../action-types';
import {DeleteAction} from '../actions';
import {UserStoryInterface} from "../../../components/Cards/stories/UserStoryInterface";

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

const reducer = (state: UserStoriesState = initialState, action: DeleteAction): UserStoriesState => {
    switch (action.type) {
        case DeleteUserStoryTypes.DELETE_USER_STORY:
            return {loading: true, error: null, data: null}
        case DeleteUserStoryTypes.DELETE_USER_STORY_SUCCESS:
            return {loading: false, error: null, data: true}
        case DeleteUserStoryTypes.DELETE_USER_STORY_ERROR:
            return {loading: false, error: action.payload, data: false}
        default:
            return state;
    }
};

export default reducer;