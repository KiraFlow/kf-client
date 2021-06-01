import axios from 'axios';
import {CreateUserStoryTypes} from '../action-types';
import {CreateAction} from '../actions';
import {Dispatch} from 'redux';
import {UserStoryInterface} from "../../../components/Cards/stories/UserStoryInterface";

export const createUserStory = (userStory: UserStoryInterface) => {
    return async (dispatch: Dispatch<CreateAction>) => {
        dispatch({
            type: CreateUserStoryTypes.CREATE_USER_STORY
        });
        try {
            const {title, description, estimation, creationDate, listIndex, position} = userStory
            await axios.post('http://localhost:8080/exploration/create',  JSON.stringify({title, description, estimation, creationDate, listIndex, position}), {
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            dispatch({
                type: CreateUserStoryTypes.CREATE_USER_STORY_SUCCESS,
            })
        } catch (err) {
            dispatch({
                type: CreateUserStoryTypes.CREATE_USER_STORY_ERROR,
                payload: err.message
            })
        }
    };
}