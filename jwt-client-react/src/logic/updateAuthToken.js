import jwt_decode from "jwt-decode";
// import reduxStore from '../store/store';

import checkResponse from './checkResponse';
import { refreshtokens } from '../reference/endpoints'
import { addToken, selectAuthentication } from "../newStore/authenticationReducer";

const updateAuthToken = async (dispatch, title) => {
    // const state = reduxStore.getState();
    // let oldToken = state?.token || ''

    const oldToken = selectAuthentication()?.token || '';

    let oldTokenData = null
    oldToken && console.log('old token', oldToken);

    if (oldToken !== '') {
        try {
            oldTokenData = jwt_decode(oldToken)
            console.log('old token data', oldTokenData);
        } catch (e) {
            console.log('token decode error', e);
        }
    }

    const url = refreshtokens
    const options = {
        mode: 'cors',
        method: 'POST',
        credentials: 'include',
    }

    const now = Date.now()
    const tokenExpiry = (oldTokenData?.exp * 1000) || 0
    console.log(`NOW: ${now} EXPIRY: ${tokenExpiry}`);
    if (oldToken === '' || now > tokenExpiry) {
        let response = await fetch(url, options)
        checkResponse(response, title)
        let data = await response.json()
        console.log('update response', data);
        dispatch(addToken({ token: data?.authToken }))
        //dispatch({ type: 'ADD_TOKEN', payload: { token: data?.authToken } })
        return data?.authToken
    }
    return oldToken
}


export default updateAuthToken