import * as ActionTypes from "./ActionTypes";

export const Exercises = (state = { errMess: null, exercises: [] }, action) => {
  switch (action.type) {
    case ActionTypes.ADD_EXERCISE:
      var exercises = action.payload;
      exercises.id = state.length;
      return { ...state, exercises: state.exercises.concat(exercises) };
    case ActionTypes.ADD_EXERCISES:
      return { ...state, errMess: null, exercises: action.payload };
    case ActionTypes.EXERCISES_FAILED:
      return { ...state, errMess: action.payload };
    default:
      return state;
  }
};