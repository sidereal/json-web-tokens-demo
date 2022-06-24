import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
// import { useEffect } from "react";

import { container, marginRight } from "../../reference/styles";
import roles from "../../reference/roles";

import { logOutUser } from "../../logic/authentication-helper";


const handleClick = (e, dispatch, navigate) => {
    logOutUser(dispatch, navigate)
}


const LoggedIn = () => {
    const user = useSelector(state => state?.user || '')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // useEffect((() => { console.log('header rendering'); }))

    return (
        <div style={container}>
            {user.roles.includes(roles.Admin) && <Link style={{ ...marginRight }} to={'/tokendemo'} >token demo</Link>}
            {user.roles.includes(roles.Admin) && <Link style={{ ...marginRight }} to={'/roledemo'}>role demo</Link>}
            {user.roles.includes(roles.Admin) && <Link style={{ ...marginRight }} to={'/errordemo'}>error demo</Link>}
            {user.roles.includes(roles.Admin) && <Link style={{ ...marginRight }} to={'/refreshdemo'}>refresh demo</Link>}
            <button onClick={(e) => handleClick(e, dispatch, navigate)}>log out </button>
        </div>
    )
}

export default LoggedIn