import logo1 from "../assets/logo_vec3.png";
import { FaTiktok } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-white">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
            <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0 -mt-12"> {/* Añade 'mt-4' para mover el logo un poco más arriba */}
    <a className="flex items-center">
        <img src={logo1} className="h-64 me-3" alt="FlowBite Logo" /> {/* Cambia 'h-28' a 'h-32' para hacer el logo un poco más grande */}
    </a>
</div>

                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div>
                            <h2 className="mb-6 xstext-sm font-semibold text-black uppercase dark:text-white">Producto</h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <a href="https://flowbite.com/" className="hover:underline font-montserrat">Equipo</a>
                                </li>
                                <li>
                                    <a href="https://tailwindcss.com/" className="hover:underline font-montserrat">Método</a>
                                </li>

                                <li className="mb-4 mt-5">
                                    <a href="https://tailwindcss.com/" className="hover:underline font-montserrat">Sobre Nosotros</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                        <h2 className="mb-6 text-sm font-semibold text-black uppercase dark:text-white">Síguenos</h2>

                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <a href="https://www.facebook.com/IQEnglish.MonterreySur?mibextid=ZbWKwL" className="hover:underline font-montserrat ">Facebook</a>
                                </li>
                                <li className="mb-4">
                                    <a href="https://www.instagram.com/iqenglish_monterrey?igsh=MTRxdjUyNG82d3JiYw==" className="hover:underline font-montserrat">Instagram</a>
                                </li>

                                <li className="mb-6 mt-5">
                                    <a href="https://www.tiktok.com/@iqenglish_mty?_t=8lqvwMrpCn0&_r=1" className="hover:underline font-montserrat">TikTok</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                        <h2 className="mb-6 text-sm font-semibold text-black uppercase dark:text-white">Síguenos</h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <a href="#" className="hover:underline font-montserrat">Política de privacidad</a>
                                </li>
                                <li className="mb-4">
                                    <a href="#" className="hover:underline font-montserrat">Términos & Condiciones</a>
                                </li>
                                <li className="mb-4 mt-5">
                                    <a href="#" className="hover:underline font-montserrat">Contacto</a>
                                </li>
                            </ul>
                        </div>



                    </div>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400 font-montserrat">Copyright © 2024 <a href="https://flowbite.com/" className="hover:underline font-montserrat">IQenglish™</a>  Todos los derechos reservados.
                    </span>
                    <div className="flex mt-4 sm:justify-center sm:mt-0">
                        <a href="https://www.tiktok.com/@iqenglish_mty?_t=8lqvwMrpCn0&_r=1"  className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                            <FaTiktok className="w-4 h-4" aria-hidden="true" fill="currentColor" />
                            <span className="sr-only font-montserrat">TikTok page</span>
                        </a>
                        <a href="https://www.instagram.com/iqenglish_monterrey?igsh=MTRxdjUyNG82d3JiYw==" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                            <FaInstagram className="w-4 h-4" aria-hidden="true" fill="currentColor" />
                            <span className="sr-only font-montserrat">Instagram page</span>
                        </a>
                        <a href="https://www.facebook.com/IQEnglish.MonterreySur?mibextid=ZbWKwL" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                            <FaFacebook className="w-4 h-4" aria-hidden="true" fill="currentColor" />
                            <span className="sr-only font-montserrat">Facebook page</span>
                        </a>
                    </div>

                </div>
            </div>
        </footer>

    )
}

export default Footer; 