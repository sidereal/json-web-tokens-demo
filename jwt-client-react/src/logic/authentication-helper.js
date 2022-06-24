// import { deleteFromLocalStorage } from "./localStorage-helper"
import checkResponse from './checkResponse';
import jwt_decode from "jwt-decode";
import { login, logout } from '../reference/endpoints'
import { addAuth, removeAuth } from '../newStore/authenticationReducer';


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

    dispatch(addAuth(payload))
    // dispatch({ type: 'ADD_AUTH', payload })
    return data
}

export const logOutUser = (dispatch, navigate) => {
    // dispatch({ type: 'REMOVE_AUTH' })
    dispatch(removeAuth())

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
            dispatch(removeAuth())
            // dispatch({ type: 'REMOVE_AUTH' })
        })
    navigate('/')
    // navigate.push('/')
}