import teachertwo from "../assets/teachertwo.jpeg";
import teacherthree from "../assets/teacherthree.jpeg";
import teacherfour from "../assets/teacherfour.jpg";
import "../css/Tailwind.css";
import { useSpring, animated } from '@react-spring/web';
import { useState } from 'react';
import teacherfive from "../assets/teacherfive.jpeg";

const Teachers = () => {
    const [flipped, setFlipped] = useState({});
    const [tooltips, setTooltips] = useState({});

    const teachers = [
        { id: 1, image: teachertwo, name: "Jessica", role: "Maestría en Educación", description: "Tengo una Maestría en Ciencias de la Educación y disfruto pintar con acuarela. Enseñar inglés es un nuevo reto profesional y estoy emocionada de compartir mis conocimientos y crecer con mis estudiantes." },
        { id: 2, image: teacherfour, name: "Diego", role: "Dibujar y leer", description: "Aprendí inglés en el colegio y tengo certificados de Cambridge C1 y TOEFL lo que respalda mi competencia en el idioma.. Disfruto del dibujo y la lectura. Enseño inglés para ayudar a otros a mejorar sus habilidades de comunicación." },
        { id: 3, image: teacherthree, name: "Rocio", role: "Coordinadora", description: "Aprendí inglés en la escuela y disfruto del cine, la lectura y la cocina. Enseñar inglés me permite compartir mis conocimientos y aprender de mis estudiantes, ayudándolos a abrir nuevas puertas." },
        { id: 4, image: teacherfive, name: "Bonnie", role: "Profesora", description: "Nací en Nueva Zelanda y tengo una Maestría en Periodismo de Investigación. Disfruto componer música, esquiar, patinar, nadar y más. Enseño inglés y obtuve mi licencia en Massey University." }
    ];
    
    const handleFlip = (id) => {
        setFlipped((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const handleTooltip = (id, visible) => {
        setTooltips((prev) => ({ ...prev, [id]: visible }));
    };

    return (
        <section id="teachers-section" className="pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[120px] bg-white">
            <div className="container mx-auto">
                <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-4">
                        <div className="mx-auto mb-[60px] max-w-[510px] text-center">
                            <span className="mb-2 block text-lg font-semibold text-primary">
                                Nuestro Equipo
                            </span>
                            <h2 className="mb-3 text-3xl font-bold leading-[1.2] text-black dark:text-black sm:text-4xl md:text-[40px]">
                                ¡Conoce a tus instructores!
                            </h2>
                            <p className="text-base text-body-color dark:text-dark-6">
                                Instructores certificados y expertos en educación que ayudan a que tu proceso sea más fácil.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="-mx-4 flex flex-wrap justify-center">
                    {teachers.map((teacher) => {
                        const isFlipped = flipped[teacher.id] || false;
                        const isTooltipVisible = tooltips[teacher.id] || false;
                        const { transform, opacity } = useSpring({
                            opacity: isFlipped ? 1 : 0,
                            transform: `rotateY(${isFlipped ? 180 : 0}deg)`,
                            config: { mass: 5, tension: 500, friction: 80 }
                        });

                        return (
                            <div key={teacher.id} className="w-full px-4 lg:w-1/4 md:w-1/2 xl:w-1/4">
                                <div className="mx-auto mb-10 w-full max-w-[370px] perspective-1000 transform transition duration-500 ease-in-out hover:scale-105 h-[370px]">
                                    <animated.div
                                        className="relative w-full h-full"
                                        style={{ transform, position: 'absolute', top: 0, left: 0 }}
                                    >
                                        <animated.div style={{ opacity: opacity.to(o => 1 - o), transform }} className="absolute w-full h-full backface-hidden" >
                                            <div className="relative overflow-hidden rounded-lg h-full">
                                                <img src={teacher.image} alt={teacher.name} className="w-full h-full object-cover" />
                                                <div className="absolute bottom-5 left-0 w-full text-center">
                                                    <div className="relative mx-5 overflow-hidden rounded-lg bg-white px-3 py-5 dark:bg-dark-2">
                                                        <h3 className="text-base font-semibold text-black dark:text-black">
                                                            {teacher.name}
                                                        </h3>
                                                        <p className="text-xs text-body-color dark:text-dark-6">
                                                            {teacher.role}
                                                        </p>
                                                        <div>
                                                            <span className="absolute bottom-0 left-0">
                                                                <svg width="61" height="30" viewBox="0 0 61 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <circle cx="16" cy="45" r="45" fill="#1D4ED8" fillOpacity="0.11" />
                                                                </svg>
                                                            </span>
                                                            <span className="absolute right-0 top-0">
                                                                <svg width="20" height="25" viewBox="0 0 20 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <circle cx="0.706257" cy="24.3533" r="0.646687" transform="rotate(-90 0.706257 24.3533)" fill="#1D4ED8" />
                                                                    <circle cx="6.39669" cy="24.3533" r="0.646687" transform="rotate(-90 6.39669 24.3533)" fill="#1D4ED8" />
                                                                    <circle cx="12.0881" cy="24.3533" r="0.646687" transform="rotate(-90 12.0881 24.3533)" fill="#1D4ED8" />
                                                                    <circle cx="17.7785" cy="24.3533" r="0.646687" transform="rotate(-90 17.7785 24.3533)" fill="#1D4ED8" />
                                                                    <circle cx="0.706257" cy="18.6624" r="0.646687" transform="rotate(-90 0.706257 18.6624)" fill="#1D4ED8" />
                                                                    <circle cx="6.39669" cy="18.6624" r="0.646687" transform="rotate(-90 6.39669 18.6624)" fill="#1D4ED8" />
                                                                    <circle cx="12.0881" cy="18.6624" r="0.646687" transform="rotate(-90 12.0881 18.6624)" fill="#1D4ED8" />
                                                                    <circle cx="17.7785" cy="18.6624" r="0.646687" transform="rotate(-90 17.7785 18.6624)" fill="#1D4ED8" />
                                                                    <circle cx="0.706257" cy="12.9717" r="0.646687" transform="rotate(-90 0.706257 12.9717)" fill="#1D4ED8" />
                                                                    <circle cx="6.39669" cy="12.9717" r="0.646687" transform="rotate(-90 6.39669 12.9717)" fill="#1D4ED8" />
                                                                    <circle cx="12.0881" cy="12.9717" r="0.646687" transform="rotate(-90 12.0881 12.9717)" fill="#1D4ED8" />
                                                                    <circle cx="17.7785" cy="12.9717" r="0.646687" transform="rotate(-90 17.7785 12.9717)" fill="#1D4ED8" />
                                                                    <circle cx="0.706257" cy="7.28077" r="0.646687" transform="rotate(-90 0.706257 7.28077)" fill="#1D4ED8" />
                                                                    <circle cx="6.39669" cy="7.28077" r="0.646687" transform="rotate(-90 6.39669 7.28077)" fill="#1D4ED8" />
                                                                    <circle cx="12.0881" cy="7.28077" r="0.646687" transform="rotate(-90 12.0881 7.28077)" fill="#1D4ED8" />
                                                                    <circle cx="17.7785" cy="7.28077" r="0.646687" transform="rotate(-90 17.7785 7.28077)" fill="#1D4ED8" />
                                                                    <circle cx="0.706257" cy="1.58989" r="0.646687" transform="rotate(-90 0.706257 1.58989)" fill="#1D4ED8" />
                                                                    <circle cx="6.39669" cy="1.58989" r="0.646687" transform="rotate(-90 6.39669 1.58989)" fill="#1D4ED8" />
                                                                    <circle cx="12.0881" cy="1.58989" r="0.646687" transform="rotate(-90 12.0881 1.58989)" fill="#1D4ED8" />
                                                                    <circle cx="17.7785" cy="1.58989" r="0.646687" transform="rotate(-90 17.7785 1.58989)" fill="#1D4ED8" />
                                                                </svg>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </animated.div>

                                        <animated.div style={{ opacity, transform: 'rotateY(180deg)' }} className="absolute w-full h-full backface-hidden">
                                            <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-4">
                                                <div className="flex justify-end px-4 pt-4">
                                                    <button onClick={() => handleFlip(teacher.id)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                        </svg>
                                                        <span className="sr-only">Close modal</span>
                                                    </button>
                                                </div>
                                                <div className="flex flex-col items-center pb-10">
                                                    <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={teacher.image} alt="Bonnie image" />
                                                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{teacher.name}</h5>
                                                    <span className="text-sm text-gray-500 dark:text-gray-400 mb-2">{teacher.role}</span>
                                                    <p className="text-sm text-body-color dark:text-dark-6 mt-4">
                                                        {teacher.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </animated.div>
                                    </animated.div>
                                    <div className="absolute -bottom-5 left-0 right-0 flex items-center justify-center z-99">
                                        <button
                                            onClick={() => handleFlip(teacher.id)}
                                            onMouseEnter={() => handleTooltip(teacher.id, true)} // Mostrar tooltip al hacer hover
                                            onMouseLeave={() => handleTooltip(teacher.id, false)} // Ocultar tooltip al dejar de hacer hover
                                            data-tooltip-target="tooltip-new" type="button" className="inline-flex items-center justify-center w-10 h-10 font-medium bg-primary rounded-full hover:bg-blue-700 group focus:ring-4 focus:ring-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                            <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                            </svg>
                                            <span className="sr-only">Ver más</span>
                                        </button>
                                    </div>

                                    {isTooltipVisible && (
                                        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm tooltip dark:bg-gray-700">
                                            Ver más
                                            <div className="tooltip-arrow" data-popper-arrow></div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Teachers;
