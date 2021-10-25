import React, { useEffect, useState } from 'react';
import Routes from './Routes';

import jwt_decode from "jwt-decode";

import { useDispatch } from 'react-redux';

import checkResponse from '../modules/checkResponse';
import { api } from '../modules/constants'

export const AuthChecker = () => {
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()



    useEffect(() => {
        console.log('use effect test in AuthCheck');
    }, [])

    useEffect(() => {
        const url = `${api}/refreshtokens`
        const options = {
            mode: 'cors',
            method: 'POST',
            credentials: 'include',
        }
        setLoading(true)
        fetch(url, options)
            .then(async response => {
                checkResponse(response, 'AuthChecker')

                const data = await response.json()
                console.log('AUTH', data);
                if (!data?.ok) {
                    dispatch({ type: 'REMOVE_AUTH' })
                }
                const token = jwt_decode(data.authToken)
                const payload = {
                    user: (({ id, roles, username }) => ({ id, roles, username }))(token),
                    token: data.authToken
                }
                dispatch({ type: 'ADD_AUTH', payload })
                console.log(token);
                setLoading(false)

            }).catch(e => {
                // console.log('AUTH CHECK',e);
                dispatch({ type: 'REMOVE_AUTH' })
            }).finally(
                setLoading(false)
            )

    }, [])

    if (loading) {
        return <div>loading...</div>
    }


    return <Routes />
}