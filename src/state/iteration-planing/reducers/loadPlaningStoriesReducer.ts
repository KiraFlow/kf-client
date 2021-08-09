import {LoadPlaningStoriesActionType} from '../action-types';
import {LoadAction} from '../actions';
import {UserStoryInterface} from "../../../interfaces/UserStoryInterface";

interface PlaningStoriesState {
    loading: boolean;
    error: string | null;
    data: UserStoryInterface[];
}

const initialState = {
    loading: false,
    error: null,
    data: []
}

const reducer = (state: PlaningStoriesState = initialState, action: LoadAction): PlaningStoriesState => {
    switch (action.type) {
        case LoadPlaningStoriesActionType.LOAD_PLANING_STORIES:
            return {loading: true, error: null, data: []}
        case LoadPlaningStoriesActionType.LOAD_PLANING_STORIES_SUCCESS:
            return {loading: false, error: null, data: action.payload}
        case LoadPlaningStoriesActionType.LOAD_PLANING_STORIES_ERROR:
            return {loading: false, error: action.payload, data: []}
        default:
            return state;
    }
};

export default reducer;