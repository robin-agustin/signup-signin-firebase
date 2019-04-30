const initState = {}

const projectReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_PROJECT':
        alert('New project added.')
            return state;
        case 'CREATE_PROJECT_ERROR':
            return state;
        case 'DELETE_PROJECT':
            return state;
        case 'UPDATE_PROJECT':
        alert('Project Updated.')
            return state;
        case 'UPDATE_PROJECT_ERROR':
            return state;
        default:
            return state;
    }
}

export default  projectReducer

