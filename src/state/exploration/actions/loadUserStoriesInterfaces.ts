import {LoadUserStoriesActionType} from '../action-types';
import {UserStoryInterface} from "../../../interfaces/UserStoryInterface";

interface LoadUserStoriesAction {
    type: LoadUserStoriesActionType.LOAD_USER_STORIES;
}

interface LoadUserStoriesSuccessAction {
    type: LoadUserStoriesActionType.LOAD_USER_STORIES_SUCCESS;
    payload: UserStoryInterface[];
}

interface LoadUserStoriesError {
    type: LoadUserStoriesActionType.LOAD_USER_STORIES_ERROR;
    payload: string;
}


export type LoadAction = LoadUserStoriesAction | LoadUserStoriesSuccessAction | LoadUserStoriesError;
