import React, { useState, useEffect, useContext, createContext } from 'react';
import firebase from '@/lib/firebase';
import * as firestore from '@/lib/firestore';

const authContext = createContext();

function AuthProvider({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

const useAuth = () => {
    return useContext(authContext);
}

const userInfoExtraction = (user) => {
    const { uid, email, displayName: name, providerData, photoURL } = user ? user : {};

    return user && { uid, email, name, photoURL, provider: providerData[0].providerId };
}

function useProvideAuth() {
    const [user, setUser] = useState(null);

    const setUserInfo = (user) => {
        if (user) {
            const userInfo = userInfoExtraction(user);
            setUser(userInfo);
            firestore.setUserInfo(userInfo.uid, userInfo);
        } else setUser(null);
    }

    const signInWithGithub = () => {
        return firebase
            .auth()
            .signInWithPopup(new firebase.auth.GithubAuthProvider())
            .then(response => {
                setUserInfo(response.user);
                return response.user;
            })
    }

    const signOut = () => {
        return firebase
            .auth()
            .signOut()
            .then(() => setUserInfo(null));
    }

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => setUserInfo(user))
        return () => unsubscribe();
    }, [])

    return {
        user: user,
        signInWithGithub,
        signOut
    }
}

export { AuthProvider, useAuth };
