import {CreateUserStoryTypes} from '../action-types';
import {UserStoryInterface} from "../../../components/Cards/stories/UserStoryInterface";

interface CreateUserStoryAction {
    type: CreateUserStoryTypes.CREATE_USER_STORY;
}

interface CreateUserStorySuccessAction {
    type: CreateUserStoryTypes.CREATE_USER_STORY_SUCCESS;
}

interface CreateUserStoriesError {
    type: CreateUserStoryTypes.CREATE_USER_STORY_ERROR;
    payload: string;
}


export type CreateAction = CreateUserStoriesError | CreateUserStorySuccessAction | CreateUserStoryAction;
