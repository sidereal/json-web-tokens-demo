import jwt_decode from "jwt-decode";
import reduxStore from '../store/store';

import checkResponse from './checkResponse';
import { api } from './constants'

const updateAuthToken = async (dispatch, title) => {
    const state = reduxStore.getState();

    let oldToken = state?.token || ''

    let oldTokenData = null
    oldToken && console.log('old token', oldToken);

    if (oldToken != '') {
        try {
            oldTokenData = jwt_decode(oldToken)
            console.log('old token data', oldTokenData);
        } catch (e) {
            console.log('token decode error', e);
        }
    }

    const url = `${api}/refreshtokens`
    const options = {
        mode: 'cors',
        method: 'POST',
        credentials: 'include',
    }

    const now = Date.now()
    const tokenExpiry = (oldTokenData?.exp * 1000)
    console.log(`NOW: ${now} EXPIRY: ${tokenExpiry}`);
    if (oldToken == '' || now > tokenExpiry) {
        let response = await fetch(url, options)
        checkResponse(response, title)
        let data = await response.json()
        console.log('update response', data);
        dispatch({ type: 'UPDATE_TOKEN', payload: { token: data?.authToken } })
        return data?.authToken
    }
    return oldToken
}


export default updateAuthToken