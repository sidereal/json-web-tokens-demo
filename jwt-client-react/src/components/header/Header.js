
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LoggedIn from './LoggedIn'
import NotLoggedIn from './NotLoggedIn';
import { selectAuthentication } from "../../newStore/authenticationReducer";


import { container, headerContainer, padding } from "../../reference/styles";


const Header = () => {
    const user = useSelector(selectAuthentication)?.user || ''

    const text = user
        ? `Logged in as ${user?.username || 'not found'}`
        : 'Welcome'

    return (
        <div style={{ ...container, ...headerContainer, ...padding }}>
            <Link to='/' >{text}</Link>
            {user ? <LoggedIn /> : <NotLoggedIn />}
        </div>
    );
}

export default Header