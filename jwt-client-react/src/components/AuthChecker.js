import React, { useEffect, useState } from 'react';

import AppRoutes from './AppRoutes';

import jwt_decode from "jwt-decode";

import { useDispatch, useSelector } from 'react-redux';

import { selectAuthentication } from "../newStore/authenticationReducer";
import { addAuth, removeAuth } from '../newStore/authenticationReducer';

import checkResponse from '../logic/checkResponse';
import { refreshtokens } from '../reference/endpoints'

const AuthChecker = () => {
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()

    // useEffect(() => {
    //     console.log('use effect test in AuthCheck');
    // }, [])


    useEffect(() => {
        const url = refreshtokens
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
                    dispatch(removeAuth());
                    // dispatch({ type: 'REMOVE_AUTH' })
                }
                const token = jwt_decode(data.authToken)
                const payload = {
                    user: (({ id, roles, username }) => ({ id, roles, username }))(token),
                    token: data.authToken
                }
                dispatch(addAuth(payload))
                // dispatch({ type: 'ADD_AUTH', payload })
                console.log(token);
                setLoading(false)

            }).catch(e => {
                // console.log('AUTH CHECK',e);
                dispatch(removeAuth());
                // dispatch({ type: 'REMOVE_AUTH' })
            }).finally(() => {
                console.log('hello')
                setLoading(false)

            }
            )
        
        // eslint-disable-next-line
    }, [])

    // const xxx = useSelector(selectAuthentication)
    // console.log("STATE:",xxx)

    if (loading) {
        return <div>loading...</div>
    }


    return (<AppRoutes />)
}

export default AuthChecker 