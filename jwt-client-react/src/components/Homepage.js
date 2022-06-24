import { useSelector } from "react-redux";
import { padding, title } from "../reference/styles"
import { selectAuthentication } from "../newStore/authenticationReducer";



const HomePage = () => {
    const user = useSelector(selectAuthentication)?.user

    return (
        <div>
            <div style={{ ...padding, ...title }}>Home Page </div>
            {user?.roles && <div style={{ ...padding }}>Roles: {user.roles.join(' ')}</div>}
        </div>
    );
}

export default HomePage