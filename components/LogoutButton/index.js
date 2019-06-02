import React from 'react';

import { withFirebase } from '../Firebase';
import styles from './styles.scss';

const LogoutButton = ({ firebase }) => (
  <button className={styles.logoutButton} type="button" onClick={firebase.doSignOut}>
    Sign Out
  </button>
);

export default withFirebase(LogoutButton);
