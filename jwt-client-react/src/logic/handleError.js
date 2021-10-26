

const handleError =  (history, data) => {

    history.push({ pathname: `/error`, state: data })

}

export default handleError