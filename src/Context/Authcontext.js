import React, { useState, useEffect, Children } from 'react';
import { auth } from '../firebase'

export const AuthContext = React.createContext(); // create context

export function AuthProvider({ children }) {
    const [user, setUser] = useState('');
    const [upload, setupload] = useState('false');
   
    async function signup(email, password) {
        console.log(email,password)
         
        let rvobj=await auth.createUserWithEmailAndPassword(email, password);
        setUser(rvobj.user.uid)
        return rvobj;
        
    }
    async function resetPassword(email)
    {
        return await auth.sendPasswordResetEmail(email).then(()=>{alert("Email has been sent")})
    }

    async function login(email, password) {
        let rvobj=await auth.signInWithEmailAndPassword(email, password);
        setUser(rvobj.user)
        console.log(user)
        return rvobj;
    }
    async function logout() {
        auth.signOut()       
    }
    useEffect(() => {
        const unsub = auth.onAuthStateChanged((user) => {
            setUser(user);
            // setLoading(false);
        })
        return () => {
            unsub();
        }
    }, []) //componenetdid mount

    const store = {
        user, signup, login, logout,resetPassword,upload,setupload
    }
    return (<AuthContext.Provider value={store}> {children}</AuthContext.Provider>)

}