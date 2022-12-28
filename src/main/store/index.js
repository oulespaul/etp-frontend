import { createStore } from 'redux';

import rootReducer from './mainReducer';

function getFromStorage(key) {
  try {
    return JSON.parse(window.localStorage.getItem(key)) || {};
  } catch (err) {
    return {};
  }
}

const initialState = getFromStorage('APP_STATE');

const store = createStore(rootReducer, initialState);

store.subscribe(() => {
  window.localStorage.setItem('APP_STATE', JSON.stringify(store.getState()));
});

export default store;
