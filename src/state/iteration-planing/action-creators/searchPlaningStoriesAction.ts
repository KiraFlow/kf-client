import axios from 'axios';
import {SearchPlaningStoriesActionType} from '../action-types';
import {SearchAction} from '../actions';
import {Dispatch} from 'redux';

export const searchPlaningStories = (term: string) => {
    return async (dispatch: Dispatch<SearchAction>) => {
        dispatch({
            type: SearchPlaningStoriesActionType.SEARCH_PLANING_STORIES
        });
        try {
            const {data} = await axios.get('https://registry.npmjs.org/-/v1/search', {
                params: {
                    text: term
                }
            });

            const names = data.objects.map((result: any) => {
                return result.package.name;
            });

            dispatch({
                type: SearchPlaningStoriesActionType.SEARCH_PLANING_STORIES_SUCCESS,
                payload: names
            })
        } catch (err) {
            dispatch({
                type: SearchPlaningStoriesActionType.SEARCH_PLANING_STORIES_ERROR,
                payload: err.message
            })
        }
    };
};