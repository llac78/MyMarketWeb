import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

const config = {
  apiKey: "AIzaSyD2JkUIqRwp7sudWfILxcMaQpS4RsaQzyo",
  authDomain: "mymarketweb-f9ae9.firebaseapp.com",
  databaseURL: "https://mymarketweb-f9ae9.firebaseio.com",
  projectId: "mymarketweb-f9ae9",
  storageBucket: "mymarketweb-f9ae9.appspot.com",
  messagingSenderId: "6140672681"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;