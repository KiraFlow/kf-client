import {UpdateUserStoryTypes} from '../action-types';

interface UpdateUserStoryAction {
    type: UpdateUserStoryTypes.UPDATE_USER_STORY;
}

interface UpdateUserStorySuccessAction {
    type: UpdateUserStoryTypes.UPDATE_USER_STORY_SUCCESS;
}

interface UpdateUserStoriesError {
    type: UpdateUserStoryTypes.UPDATE_USER_STORY_ERROR;
    payload: string;
}


export type UpdateAction = UpdateUserStoryAction | UpdateUserStorySuccessAction | UpdateUserStoriesError;
