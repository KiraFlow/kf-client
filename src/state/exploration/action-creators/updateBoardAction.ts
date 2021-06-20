import axios from 'axios';
import {UpdateBoardActionTypes} from '../action-types';
import {BoardUpdateAction} from '../actions';
import {Dispatch} from 'redux';

export const updateBoardAction = (userStory: any) => {
    return async (dispatch: Dispatch<BoardUpdateAction>) => {
        dispatch({
            type: UpdateBoardActionTypes.UPDATE_BOARD
        });
        try {
            await axios.put('http://localhost:8080/exploration/update-board', JSON.stringify({
                userStory
            }), {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            dispatch({
                type: UpdateBoardActionTypes.UPDATE_BOARD_SUCCESS,
            })
        } catch (err) {
            dispatch({
                type: UpdateBoardActionTypes.UPDATE_BOARD_ERROR,
                payload: err.message
            })
        }
    };
}