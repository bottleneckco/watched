import React from 'react';

import Header from '../Header';
import Login from '../Login';
import styles from './styles.scss';

const App = () => (
    <div className={styles.app}>
      <Header />
      <Login />
    </div>
);

export default App;
