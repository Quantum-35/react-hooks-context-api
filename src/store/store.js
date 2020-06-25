import React, { useReducer, createContext } from 'react';
import { getUserDetails } from '../firebase';

const initialState = {
    token: null
};
export const store = createContext(initialState);
const { Provider } = store;

export const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer((state, action) => {
        switch(action.type) {
            case 'SAVE_TOKEN':
                return {
                    ...state,
                    token: action.token
                };
            case 'GET_USER_PROFILE':
                return {
                    ...state,
                    profile: action.profile
                };
            default:
                return state
        }
    }, initialState);
    return <Provider value={{ state, dispatch }} >{ children }</Provider>
}