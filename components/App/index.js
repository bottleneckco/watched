import React from 'react';

import Header from '../Header';
import LoginContainer from '../LoginContainer';
import styles from './styles.scss';

const App = () => (
  <div className={styles.app}>
    <Header />
    <LoginContainer />
  </div>
);

export default App;
