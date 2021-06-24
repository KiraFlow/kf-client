import {combineReducers} from "redux";
import searchUserStoriesReducer from "./searchUserStoriesReducer";
import loadUserStoriesReducer from "./loadUserStoriesReducer";

const reducers = combineReducers({
    loadUserStories: loadUserStoriesReducer,
    searchUserStories: searchUserStoriesReducer
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;