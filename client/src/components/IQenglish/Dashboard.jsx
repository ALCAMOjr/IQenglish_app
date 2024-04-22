import React, { useState, useContext, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { CgLogOut } from "react-icons/cg";
import { GrUserAdmin } from "react-icons/gr";
import { LiaSellsy } from "react-icons/lia";
import FooterPage from './Footer.jsx';
import Context from '../../context/advisor.context.jsx';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import useUser from "../../hooks/auth.jsx";
import { GrHome } from "react-icons/gr";
import Home from './Home.jsx';
import Prospects from './Prospects/Prospects.jsx';
import user from "../../assets/user.jpg"


function Dashboard() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { jwt } = useContext(Context);
    const { logout } = useUser()
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [userType, setUserType] = useState("");
    const [isHomeActive, setIsHomeActive] = useState(true); // Establecer inicialmente como activo
    const [isProspectsActive, setIsProspectsActive] = useState(false); // Establecer inicialmente como inactivo
    const [isAdvisorsActive, setIsAdvisorsActive] = useState(false); // Establecer inicialmente como inactivo

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        if (jwt) {
            const decodedToken = jwtDecode(jwt);
            setUsername(decodedToken.userForToken.username);
            setUserType(decodedToken.userForToken.userType);
        }
    }, [jwt]);

    // Crea una función para manejar el cierre de sesión
    const handleLogout = () => {
        logout();
        navigate('/ma9ypwq1420s/sa9v5r3cd64q/prospects/secure/login'); // Navega a la página de inicio de sesión
    };

    // Función para manejar el clic en el botón "Prospects"
    const handleProspectsClick = () => {
        setIsHomeActive(false); // Establecer isHomeActive como false al hacer clic en "Prospects"
        setIsProspectsActive(true); // Establecer isProspectsActive como true al hacer clic en "Prospects"
        setIsAdvisorsActive(false); // Establecer isAdvisorsActive como false al hacer clic en "Prospects"
    };

    // Función para manejar el clic en el botón "Home"
    const handleHomeClick = () => {
        setIsHomeActive(true); // Establecer isHomeActive como true al hacer clic en "Home"
        setIsProspectsActive(false); // Establecer isProspectsActive como false al hacer clic en "Home"
        setIsAdvisorsActive(false); // Establecer isAdvisorsActive como false al hacer clic en "Home"
    };

    // Función para manejar el clic en el botón "Advisors"
    const handleAdvisorsClick = () => {
        setIsHomeActive(false); // Establecer isHomeActive como false al hacer clic en "Advisors"
        setIsProspectsActive(false); // Establecer isProspectsActive como false al hacer clic en "Advisors"
        setIsAdvisorsActive(true); // Establecer isAdvisorsActive como true al hacer clic en "Advisors"
    };

    useEffect(() => {
        // Añade un event listener al documento para escuchar los clics en cualquier parte de la página
        const handleDocumentClick = (event) => {
            // Si el menú está abierto y el clic no fue dentro del menú, ciérralo
            if (isMenuOpen && !event.target.closest("#logo-sidebar")) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener("click", handleDocumentClick);

        // Limpia el event listener cuando el componente se desmonta para evitar fugas de memoria
        return () => {
            document.removeEventListener("click", handleDocumentClick);
        };
    }, [isMenuOpen]);


    return (
        <div>
            <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start rtl:justify-end">
                            <button
                                onClick={toggleMenu}
                                aria-controls="logo-sidebar"
                                type="button"
                                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            >
                                <span className="sr-only">Open sidebar</span>
                                <FaBars className="w-6 h-6" />
                            </button>
                            <a href="https://gateway.pinata.cloud/ipfs/QmfDd1ht7GD3jcmtzNuNvc8xgLWcmy4jtendDAtf58vVMK" className="flex ms-2 md:me-24">
                                <img src="https://gateway.pinata.cloud/ipfs/QmfDd1ht7GD3jcmtzNuNvc8xgLWcmy4jtendDAtf58vVMK" className="h-8 me-3 rounded-full" alt="FlowBite Logo" />
                                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">IQenglish</span>
                            </a>
                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center ms-3 relative">
                                {isMenuOpen && (
                                    <div className="absolute bg-white mt-40 ml-[-500%] py-2 w-48 border rounded-lg shadow-lg">
                                        <div className="px-4 py-3" role="none">
                                            <p className="text-sm text-gray-900 dark:text-white" role="none">
                                                {username}
                                            </p>
                                            <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                                                {userType}
                                            </p>
                                        </div>
                                        <ul>
                                            <li>
                                                <a onClick={handleLogout} href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Cerrar sesión</a>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                                <div>
                                    <button
                                        onClick={(e) => {
                                            toggleMenu();
                                            e.stopPropagation(); // Detiene la propagación del evento de clic para que no se propague al documento
                                        }}
                                        type="button"
                                        className="flex text-sm rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 hover:scale-110 transition-transform duration-200"
                                        aria-expanded={isMenuOpen}
                                        data-dropdown-toggle="dropdown-user"
                                    >
                                        <span className="sr-only">Open user menu</span>
                                        <div className="p-1 bg-white rounded-full">
                                            <img src={user} className="w-12 h-12 rounded-full" alt="User Icon" />
                                        </div>
                                    </button>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
                <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <a href="#" className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${isHomeActive ? 'bg-gray-100 dark:bg-gray-700' : ''}`} onClick={handleHomeClick}>
                                <GrHome className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                <span className="ms-3">Hogar</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${isProspectsActive ? 'bg-gray-100 dark:bg-gray-700' : ''}`} onClick={handleProspectsClick}>
                                <LiaSellsy className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                <span className="ms-3">Prospectos</span>
                            </a>
                        </li>
                        <li>
                            {userType === 'admin' && (
                                <a href="#" className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${isAdvisorsActive ? 'bg-gray-100 dark:bg-gray-700' : ''}`} onClick={handleAdvisorsClick}>
                                    <GrUserAdmin className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                    <span className="flex-1 ms-3 whitespace-nowrap">Asesores</span>
                                </a>
                            )}
                        </li>

                        <li>
                            <a onClick={handleLogout} href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <CgLogOut className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                <span className="flex-1 ms-3 whitespace-nowrap">Cerrar sesión</span>
                            </a>
                        </li>

                    </ul>
                </div>
            </aside>
            {/* Contenedor para mostrar el componente activo */}
            <div className="flex justify-center items-center h-full">
                <div className="mt-40"> {/* Agrega márgenes al contenedor */}
                    {isHomeActive && <Home />}
                    {isProspectsActive && <Prospects />}
                </div>
            </div>

            <footer className="absolute bottom-0 w-full">
                <FooterPage />
            </footer>
        </div>
    );
}

export default Dashboard;
