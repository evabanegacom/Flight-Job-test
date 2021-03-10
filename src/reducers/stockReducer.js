import {
  FETCH_FLIGHT_BEGIN,
  FETCH_FLIGHT_SUCCESS,
  FETCH_FLIGHT_FAILURE,
} from '../actions/actions';

const initialState = {
  flights: [],
  error: null,
  waiting: 'wait for it',
};

const flightReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FLIGHT_BEGIN:
      return {
        ...state,
        waiting: 'wait for it',
      };

    case FETCH_FLIGHT_SUCCESS:
      return {
        ...state,
        waiting: 'here we are',
        flights: action.payload,
      };

    case FETCH_FLIGHT_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        waiting: 'error',
      };

    default:
      return state;
  }
};

export default flightReducer;
