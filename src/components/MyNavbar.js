const MyNavbar = () => {
    return (
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <a className="navbar-brand" href="index.html">INTL INVENT</a>
            <button className="btn btn-link btn-sm order-1 order-lg-0" id="sidebarToggle" href="#"><i className="fas fa-bars"></i></button>
            <ul className="navbar-nav ml-auto ml-md-0">
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" id="userDropdown" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fas fa-user fa-fw"></i></a>
                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                        <a className="dropdown-item" href="#">Settings</a>
                        <a className="dropdown-item" href="#">Activity Log</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="login.html">Logout</a>
                    </div>
                </li>
            </ul>
        </nav>
     );
}

export default MyNavbar;