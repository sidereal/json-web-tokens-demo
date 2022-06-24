import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';

import handleError from './handleError';
import checkResponse from './checkResponse';

import updateAuthToken from './updateAuthToken'
import { selectAuthentication } from "../newStore/authenticationReducer";


export const useFetch = (title, params) => {
    const oldToken = useSelector(selectAuthentication)?.token || '';
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)

    const dispatch = useDispatch()

    useEffect(() => {
        console.log('loading', loading);
    }, [loading])

    // useEffect(() => {
    //     data && console.log('data', data);
    // }, [data])

    useEffect(() => {

        const fetchData = async () => {
            setLoading(true)

            try {
                let updatedToken = await updateAuthToken(dispatch, title, oldToken)

                params.options.headers = { 'Authorization': `Bearer ${updatedToken}` }

                let response = await fetch(params.url, params.options)
                checkResponse(response, title)
                let data = await response.json()
                setData(data)
                setLoading(false)
            } catch (e) {
                console.log(e);
                handleError(navigate, e)
            }
        }

        fetchData()
    }, [title, params])

    return { loading, data }
}