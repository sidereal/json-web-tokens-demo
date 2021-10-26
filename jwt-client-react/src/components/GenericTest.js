import { useEffect } from "react";

import { useFetchTest } from "../logic/useFetchTest";


const GenericTest = ({ title, params }) => {

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