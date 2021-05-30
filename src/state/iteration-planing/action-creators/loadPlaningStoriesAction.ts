import axios from 'axios';
import {LoadPlaningStoriesActionType} from '../action-types';
import {LoadAction} from '../actions';
import {Dispatch} from 'redux';

export const loadPlaningStories = () => {
    return async (dispatch: Dispatch<LoadAction>) => {
        dispatch({
            type: LoadPlaningStoriesActionType.LOAD_PLANING_STORIES
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
                type: LoadPlaningStoriesActionType.LOAD_PLANING_STORIES_SUCCESS,
                payload: names
            })
        } catch (err) {
            dispatch({
                type: LoadPlaningStoriesActionType.LOAD_PLANING_STORIES_ERROR,
                payload: err.message
            })
        }
    };
}