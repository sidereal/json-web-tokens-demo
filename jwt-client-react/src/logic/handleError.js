

const handleError =  (navigate, data) => {

    navigate({ pathname: `/error`, state: data })
    
    // history.push({ pathname: `/error`, state: data })

}

export default handleError