import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';
import SearchFilters from '../components/filter';

it('renders without crashing', () => {
  const store = createStore(rootReducer, applyMiddleware(thunk));
  const Div = document.createElement('div');
  ReactDOM.render(<Provider store={store}><SearchFilters /></Provider>, Div);
});
