import {UpdateBoardActionTypes} from '../action-types';

interface UpdateBoardAction {
    type: UpdateBoardActionTypes.UPDATE_BOARD;
}

interface UpdateBoardSuccessAction {
    type: UpdateBoardActionTypes.UPDATE_BOARD_SUCCESS;
}

interface UpdateBoardError {
    type: UpdateBoardActionTypes.UPDATE_BOARD_ERROR;
    payload: string;
}

export type BoardUpdateAction = UpdateBoardAction | UpdateBoardSuccessAction | UpdateBoardError;
