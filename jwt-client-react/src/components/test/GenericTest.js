import { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom"

import { useFetchTest } from "../../modules/useFetchTest";

import checkResponse from "../../modules/checkResponse";

import handleError from "../../modules/handleError";

const GenericTest = ({ title, params }) => {

    const history = useHistory();

    useEffect(() => {
        params && console.log('params', params);
    }, [params])


    let { loading, data } = useFetchTest(title, params)

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