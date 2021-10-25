

export default (history, data) => {

    history.push({ pathname: `/error`, state: data })

}