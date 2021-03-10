import stockReducer from '../reducers/stockReducer';

describe('stocks reducer', () => {
  it('should return the initial state', () => {
    expect(stockReducer(undefined, {})).toEqual({
      stocks: [],
      waiting: 'wait for it',
      error: null,
    });
  });

  it('should handle FETCH_STOCKS_BEGIN', () => {
    expect(
      stockReducer([], {
        type: 'FETCH_STOCKS_BEGIN',
      }),
    ).toEqual(
      {
        waiting: 'wait for it',
      },
    );
  });

  it('should handle FETCH_STOCKS_SUCCESS', () => {
    expect(
      stockReducer([], {
        type: 'FETCH_STOCKS_SUCCESS',
      }),
    ).toEqual(
      {
        waiting: 'here we are',
      },
    );
  });
});
