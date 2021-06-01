import axios from 'axios';
import {LoadUserStoriesActionType} from '../action-types';
import {LoadAction} from '../actions';
import {Dispatch} from 'redux';

export const loadUserStories = () => {
    return async (dispatch: Dispatch<LoadAction>) => {
        dispatch({
            type: LoadUserStoriesActionType.LOAD_USER_STORIES
        });
        try {
            const {data} = await axios.get('http://localhost:8080/exploration/get')

            dispatch({
                type: LoadUserStoriesActionType.LOAD_USER_STORIES_SUCCESS,
                payload: data
            })
        } catch (err) {
            dispatch({
                type: LoadUserStoriesActionType.LOAD_USER_STORIES_ERROR,
                payload: err.message
            })
        }
    };
}