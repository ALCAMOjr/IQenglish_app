import { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom'; // Renombrado como RouterLink
import hamburguer from "../assets/hamburger.png";
import logo from "../assets/logo_vec.png";
import { Navbar, NavbarBrand, Dropdown, DropdownTrigger, DropdownMenu, Button, DropdownItem, Link } from "@nextui-org/react";

function NavbarApp() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1570);
  const location = useLocation();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 1300);
    };

    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const getLinkClass = (path) => (
    `flex font-semibold py-2 text-base font-medium ${location.pathname === path ? 'text-bold text-black' : 'text-white'} hover:text-black dark:text-white lg:ml-10 lg:inline-flex`
  );

  return (
    <div className="relative -mx-0 flex items-center justify-between bg-primary ">
      {isSmallScreen ? (
        <Navbar className='bg-primary mt-24'>
          <div className="relative flex items-center justify-between w-full">
            <div className="flex items-center">
              <NavbarBrand>
                <img src={logo} alt="Logo" className='w-[250px] lg:w-[300px] md:w-[300px] h-auto lg:h-[300px]' />
              </NavbarBrand>
            </div>
            <div className="flex items-center ml-auto">
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="solid" size="md" color="secondprimary">
                    <img src={hamburguer} alt="Menu" className='w-12 h-12 lg:w-14 lg:h-14' />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Navigation">
                  <DropdownItem key="home" as={RouterLink} to="/">Inicio</DropdownItem>
                  <DropdownItem key="teachers" as={RouterLink} to="/teachers">Aprende</DropdownItem>
                  <DropdownItem key="method" as={RouterLink} to="/metodo">Método</DropdownItem>
                  <DropdownItem key="about" as={RouterLink} to="/nosotros">Sobre Nosotros</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </Navbar>
      ) : (
        <Navbar className='bg-primary mt-8 mb-24'>
          <NavbarBrand className='relative'>
            <img src={logo} alt="Logo" className='-ml-48 mt-24 w-64 h-64' />
          </NavbarBrand>
          <div className="flex justify-start items-center pl-16 sm:flex lg:pl-0">
            <div>
              <nav
                className={`absolute left-4 mt-16 -mr-32 rounded-lg px-6 py-5 shadow transition-all dark:bg-dark-2 lg:static lg:block lg:w-full lg:max-w-full lg:bg-transparent lg:shadow-none xl:ml-32 'hidden'`}
                id="navbarCollapse"
              >
                <ul className="block lg:flex">
                  <li>
                    <RouterLink to="/" className={getLinkClass("/")}>
                      Inicio
                    </RouterLink>
                  </li>
                  <li>
                    <RouterLink to="/teachers" className={getLinkClass("/teachers")}>
                      Aprende
                    </RouterLink>
                  </li>
                  <li>
                    <RouterLink to="/metodo" className={getLinkClass("/metodo")}>
                      Método
                    </RouterLink>
                  </li>
                  <li>
                    <RouterLink to="/nosotros" className={getLinkClass("/nosotros")}>
                      Sobre Nosotros
                    </RouterLink>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </Navbar>
      )}
    </div>
  );
}

export default NavbarApp;
