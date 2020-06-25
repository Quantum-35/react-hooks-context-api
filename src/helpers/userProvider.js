import React, { useState, useMemo, createContext } from 'react';

import {auth} from '../firebase';

const initialState = {
    user: null
}

export const UserContext = createContext({ user: {} });

export const UserProvider = props => {
    const [state, setState] = useState(initialState);

    useMemo(() => {
        auth.onAuthStateChanged(authUser => {
            setState(st => ({
                ...st,
                user: authUser
            }))
        })
    }, [])

    return (
        <UserContext.Provider value={state.user}>
            {props.children}
        </UserContext.Provider>
    );
}