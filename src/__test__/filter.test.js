import { searchFilter } from '../actions/actions';

describe('actions', () => {
  it('an action that filters should be created', () => {
    const stockCategory = 'New York Stock Exchange';
    const expectedAction = {
      type: 'CHANGE_FILTERS',
      stockCategory,
    };
    expect(searchFilter(stockCategory)).toEqual(expectedAction);
  });
});
