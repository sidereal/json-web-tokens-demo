
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LoggedIn from './LoggedIn'
import NotLoggedIn from './Login';

import { container, headerContainer, blogPadding } from "../../modules/styles";


const Header = () => {



    const user = useSelector(state => state?.user || '')
    const text = user
        ? `Logged in as ${user?.username || 'not found'}`
        : 'Welcome'

    return (
        <div style={{ ...container, ...headerContainer, ...blogPadding }}>
            <Link to='/' >{text}</Link>
            {user ? <LoggedIn /> : <NotLoggedIn />}
        </div>
    );
}

export default Header