/* eslint-disable */

export const searchFilter = stockCategory => ({
  type: 'CHANGE_FILTERS',
  stockCategory,
});

export const FETCH_STOCKS_BEGIN = 'FETCH_STOCKS_BEGIN';
export const FETCH_STOCKS_SUCCESS = 'FETCH_STOCKS_SUCCESS';
export const FETCH_STOCKS_FAILURE = 'FETCH_STOCKS_FAILURE';

export const fetchStocksBegin = () => ({
  type: FETCH_STOCKS_BEGIN,
});

export const fetchStocksSuccess = data => ({
  type: FETCH_STOCKS_SUCCESS,
  payload: data,
});

export const fetchStocksFailure = error => ({
  type: FETCH_STOCKS_FAILURE,
  payload: error,
});

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export function getStocks() {
  return dispatch => {
    dispatch(fetchStocksBegin());
    return fetch('https://api.spacexdata.com/v4/launches/past')
      .then(handleErrors)
      .then(res => res.json()
        .then(json => {
          dispatch(fetchStocksSuccess(json));
          return json.data;
        }))
      .catch(error => dispatch(fetchStocksFailure(error)));
  };
}

/* eslint-enable */
