import { useEffect, useState } from "react";

import { useFetch } from "../logic/useFetch";


const GenericTest = ({ title, params }) => {
    const { loading, data } = useFetch(title, params)

    useEffect(() => {
        params && console.log('params', params);
    }, [params])

    useEffect(() => { data && console.log(data) }, [data])

    return (
        <>
            <div>{title}</div>
            {loading
                ? <div>loading...</div>
                : data ? <div>{data.message || data.authToken}</div> : <div>no data!</div>
            }
        </>
    )
}

export default GenericTest
