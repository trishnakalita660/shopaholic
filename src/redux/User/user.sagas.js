import { takeLatest, call, all, put } from 'redux-saga/effects';
import userTypes from "./user.types";
import { signInSuccess, signOutUserSuccess } from './user.actions';
import { auth, handleUserProfile,getCurrentUser, GoogleProvider } from './../../firebase/utils'

export function * getSnapshotFromUserAuth(user){
    try {
       
        const userRef = yield call(handleUserProfile, { userAuth: user}) 
        const snapshot = yield userRef.get();
            yield put(
                  signInSuccess({
                    id: snapshot.id,
                    ...snapshot.data(),
                  })
              )     
    }
     catch (error) {
        console.log(error);
    }
}

// generator function

export function* emailSignIn ({ payload: {email, password}}){
        try{
              
          const {user} =   yield auth.signInWithEmailAndPassword(email, password);
          yield getSnapshotFromUserAuth(user)  
         
               
            } catch(err){
              console.log(err);
            }
        
}

export function* signOutUser(){
 try{

    yield auth.signOut();
    yield put(
        signOutUserSuccess()
    )
 }catch(err){
     console.log(err);
 }
}

export function* onSignOutUserStart(){
    yield takeLatest(userTypes.SIGN_OUT_USER_START, signOutUser);
}

export function* isUserAuthenticated(){
 
    try {
        const userAuth = yield getCurrentUser();
        if(!userAuth){
            return;
        }
        yield getSnapshotFromUserAuth(userAuth);
    } catch (error) {
        console.log(error);
    }
}


export function* onCheckUserSession (){

    yield takeLatest(userTypes.CHECK_USER_SESSION, isUserAuthenticated);

} 
export function* onEmailSignInStart() {
    yield takeLatest(userTypes.EMAIL_SIGN_IN_START, emailSignIn);
}

export default function* userSagas (){
    yield all([
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOutUserStart) 
    ])
     
}