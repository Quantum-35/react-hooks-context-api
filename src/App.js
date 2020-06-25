import React from 'react';

import { UserProvider } from './helpers';
import { StateProvider } from './store';
import Route from './components/route';


const  App = () => {

  return (
    <StateProvider>
      <UserProvider>
        <Route />
      </UserProvider>
    </StateProvider>
  );
}

export default App;
