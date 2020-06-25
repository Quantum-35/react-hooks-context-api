import React, { useContext, useEffect, useState, useMemo } from 'react';

import { UserContext, getToken, getUserDetails } from '../helpers';
import { store } from '../store';
import { auth } from '../firebase';

const initialState = {
    email: null,
    displayName: '',
    emailVerified: false,
    phoneNumber: ''
}

const Home = () => {
    const user = useContext(UserContext);
    const globalState = useContext(store);

    const { dispatch } = globalState;

    const [state, setState] = useState(initialState);

    useEffect(() => {
        if(user) {
            const { displayName, email, emailVerified, phoneNumber } = user;
            setState(st => ({
                ...st,
                email,
                displayName,
                emailVerified,
                phoneNumber
            }))
        }
    }, [user]);

    useEffect(() => {
        auth.onAuthStateChanged(async authUser=> {
            const token = await getToken();
            if(token) dispatch({ type: 'SAVE_TOKEN', token });
        })
    }, [store])

    useEffect(() => {
        if(globalState.state.token) {
            async function getProfile() {
                const {token} = globalState.state;
                const results = await getUserDetails(token);
                dispatch({ type: 'GET_USER_PROFILE', profile: results })
            }
            getProfile()
        }
    }, [globalState.state.token]);

    const { displayName, email, emailVerified, phoneNumber } = state;
    const { state: { profile } } = globalState;
    console.log('--->', profile)
    return(
        <React.Fragment>
            <div className="home-container">
                <h2>Welcome to Glide {displayName} </h2>
                <div className="profile-main_container">
                    <div className="profile-container">
                        <h3>From Context</h3>
                        <span>Email: {email}</span>
                        <span>Email verified: {emailVerified.toString()}</span>
                        <span>Phone Number: {phoneNumber}</span>
                    </div>
                    {profile && profile.data ?
                        <div className="profile-container">
                            <h3>From useReducer state</h3>
                            <span>Name: {profile.data.firstName} {profile.data.lastName}</span>
                            <span>Email: {profile.data.email}</span>
                            <span>Phone Number: {profile.data.phoneNumber}</span>
                            <span>DOB: {profile.data.dateOfBirth}</span>
                            <span>Total Balance: {profile.data.totalBalance}</span>
                        </div> :
                        <span>loading...</span>
                    }
                </div>
            </div>
        </React.Fragment>
    );
}

export default Home;