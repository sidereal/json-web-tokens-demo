import { useSelector } from "react-redux";
import { blogPadding, title } from "../reference/styles"



const HomePage = () => {
    const user = useSelector(state => state?.user || '')

    return (
        <div>
            <div style={{ ...blogPadding, ...title }}>Home Page </div>
            {user?.roles && <div style={{ ...blogPadding }}>Roles: {user.roles.join(' ')}</div>}
        </div>
    );
}

export default HomePage