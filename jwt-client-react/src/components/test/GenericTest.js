import { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom"

import { useFetchTest } from "../../modules/useFetchTest";

import checkResponse from "../../modules/checkResponse";

import handleError from "../../modules/handleError";

const GenericTest = ({ title, params }) => {

    const history = useHistory();
    // const [loading, setLoading] = useState(true)
    // const [data, setData] = useState()

    // useEffect(() => {
    //     token && console.log('token', token);
    //     params.options.headers = { 'Authorization': `Bearer ${token}` }
    // }, [token])

    // useEffect(() => {
    //     console.log('loading', loading);
    // }, [loading])

    // useEffect(() => {
    //     data && console.log('data', data);
    // }, [data])

    useEffect(() => {
        params && console.log('params', params);
    }, [params])


    let { loading, data } = useFetchTest(title, params)

    // console.log('RV',rv);
    // useEffect(() => {
    //     setLoading(true)
    //     fetch(params.url, params.options)
    //         .then(async response => {
    //             checkResponse(response, title)
    //             try {
    //                 const data = await response.json()
    //                 setData(data)
    //                 setLoading(false)
    //             } catch (e) {
    //                 console.log(e);
    //             }
    //         }).catch(e => {
    //             handleError(history, e)
    //         }).finally(
    //             console.log('finally')
    //         )


    // }, [history])

    if (loading) {
        return <div>loading...</div>
    }

    return (
        <div>
            <div>{title}</div>
            {data ? <div>{data.message || data.authToken}</div> : <div>no data!</div>}
        </div>
    );

}

export default GenericTest