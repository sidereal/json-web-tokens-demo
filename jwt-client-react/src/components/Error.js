import { useLocation } from "react-router";

export const ErrorHandler = (props) => {
    const location = useLocation()

    console.log('ERROR location', location?.state);
    const data = location?.state


    return (
        <div>
            <div>Error</div>
            {data?.function && <div>Function: {data?.function}</div>}
            {data?.id && <div>Object ID: {data?.id}</div>}
            {data?.message && <div>Message: {data?.message}</div>}
            {data?.data?.status && <div>Status: {data?.data?.status}</div>}
            {data?.data?.text && <div>Text: {data?.data?.text}</div>}
        </div>
    );
}