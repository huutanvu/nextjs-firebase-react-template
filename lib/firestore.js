import firebase from '@/lib/firebase';
import 'firebase/firestore';

const db = firebase.firestore();

/**
 * Set Additional User Info to 'users' collection in Firestore.
 * If this is called the first time for a newly created user, the 
 * document with id 'uid' will be created. Else, it will be merged
 * with the previous document in the db.
 * @param {String} uid          unique user id from Firebase authentication
 * @param {Object} userData     user information, for example, name, email, etc.
 * @return {Promise}            a promise after executing the `set` in Firestore collection
 */
const setUserInfo = (uid, userData) => {
    return db.collection('users').doc(uid).set({ uid, ...userData }, { merge: true });
}

export { setUserInfo };