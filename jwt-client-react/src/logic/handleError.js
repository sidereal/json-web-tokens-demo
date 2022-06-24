

const handleError =  (navigate, data) => {  

    console.log(data);
    navigate(`/error`, {state: data} )
    
    // history.push({ pathname: `/error`, state: data })

}

export default handleError