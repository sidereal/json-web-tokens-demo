const initialState = { loggedIn: false }

export const reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'ADD_USER':
            return { ...state, username: action.payload }
        case 'ADD_AUTH':
            return { ...state, user: action.payload.user, token: action.payload.token, loggedIn: true }
        case 'ADD_TOKEN':
            return { ...state, token: action.payload.token }
        case 'REMOVE_AUTH':
            let ns = { ...state, loggedIn: false, inc: 0 }
            delete ns['user']
            delete ns['token']
            return ns
        default:
            return state
    }
}

export const logAction = store => {
    return next => {
        return action => {
            const result = next(action)
            console.log(JSON.stringify(result))
            console.log(JSON.stringify(store.getState()))
            return result
        }
    }
}