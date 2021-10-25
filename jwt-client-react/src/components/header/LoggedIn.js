import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory } from "react-router-dom"

import { container, marginRight } from "../../modules/styles";

import { logOutUser } from "../../modules/authentication-helper";
import roles from "../../modules/roles";
import { useEffect } from "react";


const handleClick = (e, dispatch, history) => {
    logOutUser(dispatch, history)

}

// const handleTestClick = (e, history) => {

//     handleError(history, { message: 'from button' })
// }

const LoggedIn = () => {
    const user = useSelector(state => state?.user || '')

    const history = useHistory();
    const dispatch = useDispatch()

    useEffect((() => { console.log('header rendering'); }))

    return (
        <div style={container}>
            {user.roles.includes(roles.Admin) && <Link style={{ ...marginRight }} to={'/securitytest'}>security test</Link>}
            {user.roles.includes(roles.Admin) && <Link style={{ ...marginRight }} to={'/errortest'}>error test</Link>}
            {user.roles.includes(roles.Admin) && <Link style={{ ...marginRight }} to={'/cookietest'}>cookie test</Link>}
            <button onClick={(e) => handleClick(e, dispatch, history)}>log out </button>
        </div>
    )
}

export default LoggedIn