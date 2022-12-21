import * as actionTypes from '../constants/StoreConstants';

export const setAuth = user => ({ type: actionTypes.SET_AUTH, payload: user });
