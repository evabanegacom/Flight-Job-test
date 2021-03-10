import filterReducer from '../reducers/filterReducer';

describe('filter reducer', () => {
  it('should return the initial state', () => {
    expect(filterReducer(undefined, {})).toEqual('ALL');
  });

  it('should handle CHANGE_FILTER', () => {
    const stockCategory = 'New York Stock Exchange';
    expect(
      filterReducer(stockCategory, {
        type: 'CHANGE_FILTER',
        stockCategory,
      }),
    ).toEqual('New York Stock Exchange');
  });

  it('should handle CHANGE_FILTER', () => {
    const stockCategory = 'New York Stock Exchange';
    expect(
      filterReducer('Nasdaq', {
        type: 'CHANGE_FILTER',
        stockCategory,
      }),
    ).not.toEqual('New York Stock Exchange');
  });
});
