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
            const {data} = await axios.get('https://registry.npmjs.org/-/v1/search', {
                params: {
                    text: 'react'
                }
            });
            const names = data.objects.map((result: any) => {
                return result.package.name;
            });
            dispatch({
                type: LoadUserStoriesActionType.LOAD_USER_STORIES_SUCCESS,
                payload: names
            })
        } catch (err) {
            dispatch({
                type: LoadUserStoriesActionType.LOAD_USER_STORIES_ERROR,
                payload: err.message
            })
        }
    };
}