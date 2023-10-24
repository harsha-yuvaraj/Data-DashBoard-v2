import { Outlet, Link } from "react-router-dom"

const Layout = () => {
    return (
        <div className="nav-bar">
             <nav>
                <ul>
                    <li className="home-page-link" key="home-button">
                        <Link className="home-link" to="/" >
                            Home 🏠
                        </Link>
                    </li>
                </ul>
             </nav>

             <Outlet />
        </div>
    )
}

export default Layout;