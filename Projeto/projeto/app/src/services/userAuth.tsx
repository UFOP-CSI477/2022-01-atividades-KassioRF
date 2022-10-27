import { browserLocalPersistence, getAuth, setPersistence } from "firebase/auth";
import { firebaseApp } from "./firebase";

// Retorna um usuário caso esteja logado
// caso contrário retorna null
export const getUser = ( ) => {
  const auth = getAuth(firebaseApp());
  const user = auth.currentUser;
  setPersistence(auth, browserLocalPersistence);

  if (user !== null) {
    // The user object has basic properties such as display name, email, etc.
    
    // const displayName = user.displayName;
    // const email = user.email;
    // const photoURL = user.photoURL;
    // const emailVerified = user.emailVerified;
  
    // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
    // you have one. Use User.getToken() instead.
    
    // const uid = user.uid;
    // return user;

    return user;
    //return user;
  }else {
    return null;
  }

}

