import axios from 'axios';
import {DeleteUserStoryTypes} from '../action-types';
import {DeleteAction} from '../actions';
import {Dispatch} from 'redux';

export const deleteUserStory = (userStoryId: string) => {
    return async (dispatch: Dispatch<DeleteAction>) => {

        dispatch({
            type: DeleteUserStoryTypes.DELETE_USER_STORY
        });
        try {
            const {data} = await axios.delete('http://localhost:8080/exploration/delete', {
                data: {userStoryId},
                headers: {"Content-Type": "Application/json"}
            });

            dispatch({
                type: DeleteUserStoryTypes.DELETE_USER_STORY_SUCCESS,
                payload: data
            })
        } catch (err) {
            dispatch({
                type: DeleteUserStoryTypes.DELETE_USER_STORY_ERROR,
                payload: err.message
            })
        }
    };
}