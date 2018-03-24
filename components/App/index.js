import React from 'react';

import Header from '../Header';
import LoginContainer from '../LoginContainer';
import styles from './styles.scss';

const App = () => {
  return(
      <div className="app">
        <Header className="header"/>
        <LoginContainer />
      </div>
  );
}

export default App;
