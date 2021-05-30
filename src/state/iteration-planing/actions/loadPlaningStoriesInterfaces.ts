import {LoadPlaningStoriesActionType} from '../action-types';
import {UserStoryInterface} from "../../../components/Cards/stories/UserStoryInterface";

interface LoadPlaningStoriesAction {
    type: LoadPlaningStoriesActionType.LOAD_PLANING_STORIES;
}

interface LoadPlaningStoriesSuccessAction {
    type: LoadPlaningStoriesActionType.LOAD_PLANING_STORIES_SUCCESS;
    payload: UserStoryInterface[];
}

interface LoadPlaningStoriesError {
    type: LoadPlaningStoriesActionType.LOAD_PLANING_STORIES_ERROR;
    payload: string;
}


export type LoadAction = LoadPlaningStoriesAction | LoadPlaningStoriesSuccessAction | LoadPlaningStoriesError;
