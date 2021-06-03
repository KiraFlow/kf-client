import axios from 'axios';
import {SearchUserStoriesActionType} from '../action-types';
import {SearchAction} from '../actions';
import {Dispatch} from 'redux';

export const searchUserStories = (term: string) => {
    return async (dispatch: Dispatch<SearchAction>) => {
        dispatch({
            type: SearchUserStoriesActionType.SEARCH_USER_STORIES
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
                type: SearchUserStoriesActionType.SEARCH_USER_STORIES_SUCCESS,
                payload: names
            })
        } catch (err) {
            dispatch({
                type: SearchUserStoriesActionType.SEARCH_USER_STORIES_ERROR,
                payload: err.message
            })
        }
    };
};
