export const createProject = (project) => {
    return (dispatch, getState, { getFirebase, getFirestore}) => {
        
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const userID = getState().firebase.auth.uid;

        firestore.collection('projects').add({
            ...project,
            firstName: profile.firstName,
            lastName: profile.lastName,
            userID: userID,
            createdAt: new Date()
        }).then(() => {
            dispatch({type: 'CREATE_PROJECT', project})
        }).catch((err) => {
            dispatch({type: 'CREATE_PROJECT_ERROR', err})
        })
    }
}

export const updateProject = (project, key) => {
    return (dispatch, getState, { getFirebase, getFirestore}) => {

        const profile = getState().firebase.profile;
        const userID = getState().firebase.auth.uid;
        const firestore = getFirestore();
        
        firestore.collection('projects').doc(key).set({
            ...project,
            updatedByFirstName: profile.firstName,
            updatedByLastName: profile.lastName,
            userID: userID,
            updatedAt: new Date()
        }).then(() => {
            dispatch({type: 'UPDATE_PROJECT', project})
        }).catch((err) => {
            dispatch({type: 'UPDATE_PROJECT_ERROR', err})
        })
      }
}

export const deleteProject = (id) => {
    return (dispatch, getState, { getFirebase, getFirestore}) => {

        const firestore = getFirestore()

        firestore.collection('projects').doc(id).delete().then(() => {
            dispatch({type: 'DELETE_PROJECT'})
        }).catch((error) => {
        console.error("delete error: ", error)
        });
    }
}



