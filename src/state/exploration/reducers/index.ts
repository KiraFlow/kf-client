import {combineReducers} from "redux";
import searchUserStoriesReducer from "./searchUserStoriesReducer";
import loadUserStoriesReducer from "./loadUserStoriesReducer";
import createUserStoryReducer from "./createUserStoryReducer";

const reducers = combineReducers({
    loadUserStories: loadUserStoriesReducer,
    searchUserStories: searchUserStoriesReducer,
    createUserStory: createUserStoryReducer
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;