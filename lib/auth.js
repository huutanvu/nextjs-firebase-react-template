import React, { useState, useEffect, useContext, createContext } from 'react';
import firebase from './firebase';


const authContext = createContext();

function AuthProvider({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

const useAuth = () => {
    return useContext(authContext);
}

const userInfoExtraction = (user) => {
    const { uid, email, displayName: name, providerData } = user ? user : {};
    return user && { uid, email, name, provider: providerData[0] };
}

function useProvideAuth() {
    const [user, setUser] = useState(null);

    const setUserInfo = (user) => user ? setUser(userInfoExtraction(user)) : setUser(null);

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
