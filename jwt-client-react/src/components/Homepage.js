import { useSelector } from "react-redux";
import { padding, title } from "../reference/styles"



const HomePage = () => {
    const user = useSelector(state => state?.user || '')

    return (
        <div>
            <div style={{ ...padding, ...title }}>Home Page </div>
            {user?.roles && <div style={{ ...padding }}>Roles: {user.roles.join(' ')}</div>}
        </div>
    );
}

export default HomePage