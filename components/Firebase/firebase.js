import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.fieldValue = app.firestore.FieldValue;

    this.auth = app.auth();
    this.db = app.firestore();

    this.googleProvider = new app.auth.GoogleAuthProvider();
}

doSignInWithGoogle = () =>
  this.auth.signInWithPopup(this.googleProvider);

doSignOut = () => this.auth.signOut();

onAuthUserListener = (next, fallback) => {
  this.auth.onAuthStateChanged((authUser) => {
    if(authUser) {
      this.user(authUser.uid)
      .get()
      .then((snapshot) => {
        const dbUser = snapshot.data();

        if(!dbUser.roles) {
          dbUser.roles = {};
        }

        authUser = {
          uid: authUser.uid,
          name: authUser.name,
          email: authUser.email,
          photoURL: authUser.photoURL,
          ...dbUser,
        };

        next(authUser);
      });
    } else {
      fallback();
    }
  });
}

user = (uid) => this.db.doc(`users/${uid}`);
}

export default Firebase;
