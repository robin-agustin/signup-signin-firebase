import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyB8jdRj02YXGHIISq-eAWo0R9-bG6rNt08",
  authDomain: "dummy-app2-e8a5a.firebaseapp.com",
  databaseURL: "https://dummy-app2-e8a5a.firebaseio.com",
  projectId: "dummy-app2-e8a5a",
  storageBucket: "dummy-app2-e8a5a.appspot.com",
  messagingSenderId: "111485220759"
};

  firebase.initializeApp(config);
  firebase.firestore().settings({timestampsInSnapshots: true});

  export default firebase


