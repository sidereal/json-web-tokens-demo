import { Link } from "react-router-dom"

export const TestHeader = () => {
    return (
        <div>
            <Link to='/' >Home</Link>
            <Link to='/Test1' >Test1</Link>
            <Link to='/Test2' >Test2</Link>
        </div>
    );
}