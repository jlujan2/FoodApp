import { takeLatest, all, call, put } from "redux-saga/effects";

import { USER_ACTION_TYPES } from "./user.types";
 
import { signInSuccess, 
    signInFailed, signOutSucess, signOutFailed } from "./user.action";

import { getCurrentUser, 
    createUserDocumentFromAuth, 
    signInWithGooglePopup, signOutUser } from "../../utils/firebase/firebase.utils";

export function* getSnapshotFromUserAuth(userAuth, addionalDetails = {}) {
    try{
        const userSnapshot = yield call(createUserDocumentFromAuth, userAuth, addionalDetails);
        yield put(signInSuccess({id: userSnapshot.id}))
    }catch(error) {
        yield put(signInFailed(error));
    }
}

export function * signInWithGoogle() {
    try{
        const {user} = yield call(signInWithGooglePopup);
        console.log(user);
        yield call(getSnapshotFromUserAuth, user);
    }catch(error) {
        yield put(signInFailed(error));
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield call(getCurrentUser);
        if(!userAuth) return;
        yield call(getSnapshotFromUserAuth, userAuth);

    }catch(error) {
        yield put(signInFailed(error));
    }
}

export function* signOut() {
    try{
        yield call(signOutUser);
        yield put(signOutSucess());
    } catch(error) {
        yield put(signOutFailed(error))
    }
}

export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onGoogleSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onSignOutStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut)
}

export function* userSagas() {
    yield all([
        call(onCheckUserSession),
        call(onGoogleSignInStart),
        call(onSignOutStart)
    ])
}