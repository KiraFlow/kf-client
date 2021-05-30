import {SearchUserStoriesActionType} from '../action-types';
import {UserStoryInterface} from "../../../components/Cards/stories/UserStoryInterface";

interface SearchUserStoriesAction {
    type: SearchUserStoriesActionType.SEARCH_USER_STORIES;
}

interface SearchUserStoriesSuccessAction {
    type: SearchUserStoriesActionType.SEARCH_USER_STORIES_SUCCESS;
    payload: UserStoryInterface[];
}

interface SearchUserStoriesError {
    type: SearchUserStoriesActionType.SEARCH_USER_STORIES_ERROR;
    payload: string;
}

export type SearchAction = SearchUserStoriesAction | SearchUserStoriesSuccessAction | SearchUserStoriesError;
