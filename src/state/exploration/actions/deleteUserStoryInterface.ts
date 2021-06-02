import {DeleteUserStoryTypes} from '../action-types';

interface DeleteUserStoryAction {
    type: DeleteUserStoryTypes.DELETE_USER_STORY;
}

interface DeleteUserStorySuccessAction {
    type: DeleteUserStoryTypes.DELETE_USER_STORY_SUCCESS;
}

interface DeleteUserStoriesError {
    type: DeleteUserStoryTypes.DELETE_USER_STORY_ERROR;
    payload: string;
}

export type DeleteAction = DeleteUserStoryAction | DeleteUserStorySuccessAction | DeleteUserStoriesError;
