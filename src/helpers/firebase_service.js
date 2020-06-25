import axios from 'axios';

import { auth } from '../firebase';

const BASE_URL = 'BASE_URL';

export const getUserDetails = async token => {
    // call api
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const profile = await axios.get(`${BASE_URL}/user/profile`);
    return profile;
}

export const getToken = async () => {
    const currentUser = await auth.currentUser;
    if (currentUser != null) {
      const idToken = await currentUser.getIdToken(true);
      // console.log(idToken, 'idToken');
      return idToken;
    }
    return null;
  };
  