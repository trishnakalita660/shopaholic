import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { firebaseConfig } from './config';

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const firestore = firebase.firestore();
 
// Google authentication

export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
GoogleProvider.setCustomParameters({prompt: 'select_account'});
// export const signInwithGoogle = ()=> auth.signInWithPopup(GoogleProvider);

// handling users profile

export const handleUserProfile = async ({ userAuth, additionalData }) =>{

    if(!userAuth) return;
    const {uid} = userAuth
    const userRef = firestore.doc(`users/${uid}`);

    const snapshot = await userRef.get();

    if(!snapshot.exists){
        const { displayName, email} = userAuth;
        const timestamp = new Date();

        const userRoles =['user'];

        try{
            await userRef.set({
                displayName,
                email,
                createdDate: timestamp,
                userRoles,
                ...additionalData

            });
        }
        catch(err){
            console.log(err);
        }
    } 
    return userRef;

};

export const getCurrentUser = () =>{

    return new Promise((resolve,reject)=>{
        const unsubscribed = auth.onAuthStateChanged(userAuth=>{
            unsubscribed();
            resolve(userAuth);
        }, reject);
    })
}
