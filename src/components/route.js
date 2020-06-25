import React, { useState, useContext } from 'react';
import {auth} from '../firebase'

import Login from './login';
import Home from './home';

import { UserContext } from '../helpers';

const  Route = () => {
  const user = useContext(UserContext);

  const [error, setError] = useState(null);

  const handleSubmit = async (event, { email, password }) => {
    event.preventDefault()

    const response = await auth.signInWithEmailAndPassword(email, password).catch(err => err);

    if(response.user) {
      console.log('SUCCESS', response.user);
      setError(null);
    } else {
      console.log('@@', response.message)
      setError('Invalid email or password!')
    }
  }

  return (
      user && user.email ?
        <Home /> :
        <Login
          handleSubmit={handleSubmit}
          error={error}
        />
  );
}

export default Route;
