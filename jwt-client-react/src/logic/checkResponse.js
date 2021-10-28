const checkResponse = (response, identifier) => {
    if (!response.ok) {
        // eslint-disable-next-line
        throw {
            function: identifier,
            message: "Not 2xx response",
            data: { status: response.status, text: response.statusText }
        }
    }
}

export default checkResponse