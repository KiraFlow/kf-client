import {combineReducers} from "redux";
import searchUserStoriesReducer from "./searchUserStoriesReducer";
import loadUserStoriesReducer from "./loadUserStoriesReducer";
import createUserStoryReducer from "./createUserStoryReducer";
import deleteUserStoryReducer from './deleteUserStoryReducer';

const reducers = combineReducers({
    loadUserStories: loadUserStoriesReducer,
    searchUserStories: searchUserStoriesReducer,
    createUserStory: createUserStoryReducer,
    deleteUserStory: deleteUserStoryReducer

});

export default reducers;

export type RootState = ReturnType<typeof reducers>;