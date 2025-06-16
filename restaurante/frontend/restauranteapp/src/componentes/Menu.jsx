import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router";
import "../style/Menu.css";

const Menu = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            const cookies = document.cookie.split(';');
            const jwtCookie = cookies.find(cookie => 
                cookie.trim().startsWith('token=')
            );
            setIsAuthenticated(!!jwtCookie);
        };

        checkAuth();
        
        const interval = setInterval(checkAuth, 1000);
        
        return () => clearInterval(interval);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const handleLogout = () => {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setIsAuthenticated(false);
        closeMenu();
    };

    return (
        <nav className="menu">
            <Link to="/" onClick={closeMenu}>
                <img className="menu__logo" src={logo} alt="Logo" />
            </Link>
            
            <button 
                className={`menu__hamburger ${isMenuOpen ? 'menu__hamburger--open' : ''}`}
                onClick={toggleMenu}
                aria-label="Toggle menu"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            <ul className={`menu__lista ${isMenuOpen ? 'menu__lista--open' : ''}`}>
                <Link to="/pedido/entrada" onClick={closeMenu}>
                    <li className="menu__item">Fazer pedido</li>
                </Link>
                
                {isAuthenticated ? (
                    <>
                        <Link to="/pedidos" onClick={closeMenu}>
                            <li className="menu__item">Pedidos</li>
                        </Link>
                        <li className="menu__item menu__item--logout" onClick={handleLogout}>
                            Sair
                        </li>
                    </>
                ) : (
                    <>
                        <Link to="/login" onClick={closeMenu}>
                            <li className="menu__item">Login</li>
                        </Link>
                        <Link to="/cadastro" onClick={closeMenu}>
                            <li className="menu__item">Cadastro</li>
                        </Link>
                    </>
                )}
            </ul>

            {isMenuOpen && (
                <div className="menu__overlay" onClick={closeMenu}></div>
            )}
        </nav>
    );
};

export default Menu;