import { Link } from "react-router-dom"

const NotFound = () => {
    return (
        <div className="NotFound">
           <h1>Nothing Here 💀!</h1>
           <Link to="/">
              Back to Home!
           </Link>
        </div>
    )
};

export default NotFound;
