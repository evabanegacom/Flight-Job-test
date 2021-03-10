/* eslint-disable */

export const FETCH_FLIGHT_BEGIN = 'FETCH_FLIGHT_BEGIN';
export const FETCH_FLIGHT_SUCCESS = 'FETCH_FLIGHT_SUCCESS';
export const FETCH_FLIGHT_FAILURE = 'FETCH_FLIGHT_FAILURE';

export const fetchFlightBegin = () => ({
  type: FETCH_FLIGHT_BEGIN,
});

export const fetchFlightSuccess = data => ({
  type: FETCH_FLIGHT_SUCCESS,
  payload: data,
});

export const fetchFlightFailure = error => ({
  type: FETCH_FLIGHT_FAILURE,
  payload: error,
});

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export function getFlights() {
  return dispatch => {
    dispatch(fetchFlightBegin());
    return fetch('https://api.spacexdata.com/v4/launches/past')
      .then(handleErrors)
      .then(res => res.json()
        .then(json => {
          dispatch(fetchFlightSuccess(json));
          return json.data;
        }))
      .catch(error => dispatch(fetchFlightFailure(error)));
  };
}

/* eslint-enable */
