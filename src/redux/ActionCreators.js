import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

// Exercises
export const fetchExercises = () => (dispatch) => {
  dispatch(exercisesLoading(true));
  return fetch(baseUrl + 'questions/getlist')
    .then(response => response.json())
    .then(exercises => dispatch(addExercises(exercises)));
}
export const addExercise= (Author_id,Question_id, Title, Topic,Level,Description,CreateDate) => ({
  type: ActionTypes.ADD_EXERCISE,
  payload: { Author_id: Author_id, Question_id: Question_id, Title: Title, Topic: Topic,Level: Level,Description: Description,CreateDate: CreateDate}
});
export const exercisesLoading = () => ({
  type: ActionTypes.EXERCISES_LOADING
});
export const addExercises = (exercises) => ({
  type: ActionTypes.ADD_EXERCISES,
  payload: exercises
});
export const exercisesFailed = (errmess) => ({
  type: ActionTypes.EXERCISES_FAILED,
  payload: errmess
});