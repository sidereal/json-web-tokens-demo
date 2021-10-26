// import { deleteFromLocalStorage } from "./localStorage-helper"
import checkResponse from './checkResponse';
import jwt_decode from "jwt-decode";
import { api, login, logout } from './endpoints'

export const logInUser = async (loginData, dispatch) => {
    // console.log(api);
    const url = login
    const options = {
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(loginData),
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
    }

    const response = await fetch(url, options)
    if (response.status === 400) {
        let data = await response.json()
        if (data.message) throw new Error(data.message);

    }
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
    const data = await response.json()
    console.log('LOGIN DATA', data);
    const token = jwt_decode(data.authToken)

    const payload = {
        user: (({ id, roles, username }) => ({ id, roles, username }))(token),
        token: data.authToken
    }

    dispatch({ type: 'ADD_AUTH', payload })
    return data
}

export const logOutUser = (dispatch, history) => {
    dispatch({ type: 'REMOVE_AUTH' })

    const url = logout
    const options = {
        mode: 'cors',
        method: 'POST',
        credentials: 'include',
    }

    fetch(url, options)
        .then(async response => {
            checkResponse(response, 'AuthChecker')
            const data = await response.json()
            console.log(data);
        }).catch(e => {
            dispatch({ type: 'REMOVE_AUTH' })
        })
    history.push('/')
}