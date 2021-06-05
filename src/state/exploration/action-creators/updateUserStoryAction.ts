import axios from 'axios';
import {UpdateUserStoryTypes} from '../action-types';
import {UpdateAction} from '../actions';
import {Dispatch} from 'redux';
import {UserStoryInterface} from "../../../components/Cards/stories/UserStoryInterface";

export const updateUserStory = (userStory: UserStoryInterface) => {
    return async (dispatch: Dispatch<UpdateAction>) => {
        dispatch({
            type: UpdateUserStoryTypes.UPDATE_USER_STORY
        });
        try {
            const {_id, title, description, estimation, creationDate, listIndex, position} = userStory
            await axios.put('http://localhost:8080/exploration/put', JSON.stringify({
                _id,
                title,
                description,
                estimation,
                creationDate,
                listIndex,
                position
            }), {
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            dispatch({
                type: UpdateUserStoryTypes.UPDATE_USER_STORY_SUCCESS,
            })
        } catch (err) {
            dispatch({
                type: UpdateUserStoryTypes.UPDATE_USER_STORY_ERROR,
                payload: err.message
            })
        }
    };
}