import {combineReducers} from "redux";
import loadPlaningStoriesReducer from "./loadPlaningStoriesReducer";

const reducers = combineReducers({
    loadPlaningStories: loadPlaningStoriesReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;