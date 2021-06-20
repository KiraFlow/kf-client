import {UpdateBoardActionTypes} from '../action-types';
import {BoardUpdateAction} from '../actions';

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

const reducer = (state: UserStoriesState = initialState, action: BoardUpdateAction): UserStoriesState => {
    switch (action.type) {
        case UpdateBoardActionTypes.UPDATE_BOARD:
            return {loading: true, error: null, data: null}
        case UpdateBoardActionTypes.UPDATE_BOARD_SUCCESS:
            return {loading: false, error: null, data: true}
        case UpdateBoardActionTypes.UPDATE_BOARD_ERROR:
            return {loading: false, error: action.payload, data: false}
        default:
            return state;
    }
};

export default reducer;