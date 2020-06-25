import React, { useState } from 'react';
import {auth} from '../firebase'

import './App.css';

const newContext = React.createContext({ color: 'black' });

const initialValues = {
  email: '',
  password: ''
}


const  Login = ({ handleSubmit, error }) => {
  const [state, setState] = useState(initialValues);
  const [touched, setTouched] = useState(false);

  const handleChange = event => {
    const { name, value } = event.target;
    setState(st => ({
      ...st,
      [name]: value
    }))
  }

  const onSubmit = async event => {
    const {email, password} = state;
    handleSubmit(event, { email, password })
  }

  return (
    <div className="App">
      <div className="form">
        <span className="form-title">Log into Glide</span>
        <span className="form-sub_title">Enter your credentials below</span>
        <form onSubmit={onSubmit} className="form-container">
          <div className="input-container">
            <label className="form-label">Name:</label>
            <input
              placeholder="email"
              type="text"
              name="email"
              value={state.email}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="input-container">
            <label className="form-label">Password:</label>
            <input
              placeholder="Password"
              type="password"
              name="password"
              value={state.password}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
      {error &&
        <div className="display-error">
          {error}
        </div>
      }
    </div>
  );
}

export default Login;
