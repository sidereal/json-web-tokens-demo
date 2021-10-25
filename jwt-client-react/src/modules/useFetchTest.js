import { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';

import handleError from './handleError';
import checkResponse from './checkResponse';

import updateAuthToken from './updateAuthToken'


export const useFetchTest = (title, params) => {
    const history = useHistory();
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState()

    const dispatch = useDispatch()

    useEffect(() => {
        console.log('loading', loading);
    }, [loading])

    useEffect(() => {
        data && console.log('data', data);
    }, [data])

    useEffect(() => {

        const fetchData = async () => {
            setLoading(true)

            try {
                let updatedToken = await updateAuthToken(dispatch, title)
                
                params.options.headers = { 'Authorization': `Bearer ${updatedToken}` }

                let response = await fetch(params.url, params.options)
                checkResponse(response, title)
                let data = await response.json()
                setData(data)
                setLoading(false)
            } catch (e) {
                console.log(e);
                handleError(history, e)
            }
        }

        fetchData()
    }, [])

    return { loading, data }
}