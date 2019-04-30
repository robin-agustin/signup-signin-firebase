export const signIn = (credentials) => {
    return (dispatch, getState, {getFirebase}) => {
        dispatch( { type: 'LOADING'} );
        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch( { type: 'LOGIN_SUCCESS'} );
        }).catch((err) => {
            dispatch( {type: 'LOGIN_ERROR'}, err);
        });
    }
} 

export const signOut = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signOut().then(() => {
            dispatch( {type: 'SIGNOUT_SUCCESS'});
        });
    }
}

export const signUp = (newUser) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        dispatch( { type: 'LOADING'} );
        const firebase = getFirebase();
        const firestore = getFirestore();
    
        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((resp) => {
            return firestore.collection('users').doc(resp.user.uid).set({
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                type: newUser.type
            })
        }).then(() => {
            dispatch({ type: 'SIGNUP_SUCESS' })
        }).catch(err => {
            dispatch({ type: 'SIGNUP_ERROR', err })
        })
    }
}

export const updateUser= (user, key) => {
    return (dispatch, getState, { getFirebase, getFirestore}) => {

        const firestore = getFirestore();
        
        firestore.collection('users').doc(key).set({
            ...user
        }).then(() => {
            dispatch({type: 'UPDATE_USER_SUCCESS', user});
        }).catch((err) => {
            dispatch({type: 'UPDATE_USER_ERROR', err});
        })
      }
}