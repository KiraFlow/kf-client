import {SearchPlaningStoriesActionType} from '../action-types';
import {UserStoryInterface} from "../../../components/Cards/stories/UserStoryInterface";

interface SearchPlaningStoriesAction {
    type: SearchPlaningStoriesActionType.SEARCH_PLANING_STORIES;
}

interface SearchPlaningStoriesSuccessAction {
    type: SearchPlaningStoriesActionType.SEARCH_PLANING_STORIES_SUCCESS;
    payload: UserStoryInterface[];
}

interface SearchPlaningStoriesError {
    type: SearchPlaningStoriesActionType.SEARCH_PLANING_STORIES_ERROR;
    payload: string;
}

export type SearchAction = SearchPlaningStoriesAction | SearchPlaningStoriesSuccessAction | SearchPlaningStoriesError;
