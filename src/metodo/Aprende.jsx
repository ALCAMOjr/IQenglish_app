import React, { useState, useEffect } from 'react';
import { useTransition, animated, config } from 'react-spring';
import Computer2 from "../assets/computer2.png";

const Aprende = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const windowHeight = window.innerHeight;
            const componentTop = document.getElementById('aprende').offsetTop;

            if (scrollTop + windowHeight > componentTop) {
                setIsVisible(true);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const transitions = useTransition(isVisible, {
        from: { opacity: 0, transform: 'translateY(100px)' },
        enter: { opacity: 1, transform: 'translateY(0px)' },
        config: config.molasses,
    });

    return (
        <div id="aprende" className="bg-gray-100 py-12">
            <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                {transitions((props, item) => 
                    item && (
                        <>
                            <animated.div style={props} className="flex flex-col justify-center">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">Adaptado a ti</h2>
                                <p className="text-gray-600 mb-6">Contamos con un método que se adapta a tu ritmo y necesidades actuales.</p>

                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <svg className="w-6 h-6 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 4.707a1 1 0 00-1.414-1.414l-7 7a1 1 0 01-1.414 0l-3-3a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8z" clipRule="evenodd"></path>
                                        </svg>
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Aprendizaje integral:</h3>
                                            <p className="text-gray-600">Mediante sesiones de comunicación activa, aprende el inglés de forma divertida</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <svg className="w-6 h-6 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 4.707a1 1 0 00-1.414-1.414l-7 7a1 1 0 01-1.414 0l-3-3a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8z" clipRule="evenodd"></path>
                                        </svg>
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Horarios personalizados:</h3>
                                            <p className="text-gray-600">Tienes la libertad de elegir el día y la hora de tus sesiones.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <svg className="w-6 h-6 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 4.707a1 1 0 00-1.414-1.414l-7 7a1 1 0 01-1.414 0l-3-3a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8z" clipRule="evenodd"></path>
                                        </svg>
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Grupos pequeños:</h3>
                                            <p className="text-gray-600">Máximo 6 alumnos por grupo.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <svg className="w-6 h-6 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 4.707a1 1 0 00-1.414-1.414l-7 7a1 1 0 01-1.414 0l-3-3a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8z" clipRule="evenodd"></path>
                                        </svg>
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Presencial o virtual:</h3>
                                            <p className="text-gray-600">Toma tus clases a través de sesiones virtuales en tiempo real.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <svg className="w-6 h-6 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 4.707a1 1 0 00-1.414-1.414l-7 7a1 1 0 01-1.414 0l-3-3a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8z" clipRule="evenodd"></path>
                                        </svg>
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Mentoría:</h3>
                                            <p className="text-gray-600">Contarás con el apoyo personal de un mentor de manera directa.</p>
                                        </div>
                                    </div>
                                </div>
                            </animated.div>
                            <animated.div style={props} className="flex items-center justify-center ">
                                <img src={Computer2} alt="Descripción de la imagen" className="max-w-full transform transition duration-500 ease-in-out hover:scale-105"></img>
                            </animated.div>
                        </>
                    )
                )}
            </div>
        </div>
    );
}

export default Aprende;
