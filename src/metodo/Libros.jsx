import React, { useState, useEffect } from 'react';
import { useTransition, animated, config } from 'react-spring';
import libros from "../assets/libros.png";

const Libros = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
      const handleScroll = () => {
          const scrollTop = window.scrollY || document.documentElement.scrollTop;
          const windowHeight = window.innerHeight;
          const componentTop = document.getElementById('libros').offsetTop;

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
      <div id="libros" className="bg-gray-100 py-12">
          <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-32">
              {transitions((props, item) => 
                  item && (
                      <>
                          <animated.div style={props} className="flex flex-col items-center md:items-start">
                              <img 
                                  src={libros} 
                                  alt="Descripción de la imagen" 
                                  className="w-5/6 md:w-auto max-w-xl mb-2 md:mr-8 " // Agregamos margen derecho en pantallas grandes
                              />
                              <h2 className="text-4xl font-bold text-primary mb-4 text-center md:text-start -mt-8 md:-mt-32 md:ml-12">Nuestro Material Didactico</h2>
                          </animated.div>
                          <animated.div style={props} className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-11/12 md:w-auto">
                              <div className="flex flex-col items-center">
                                  <h2 className="text-2xl md:text-4xl font-bold text-primary mb-4 text-center">¿Por qué elegirnos?</h2>
                                  <h3 className="text-xl md:text-3xl font-semibold text-gray-800 mb-4 text-center">IQ English®</h3>
                                  <h4 className="text-lg md:text-2lg font-semibold text-gray-800 mb-4 text-center">Principales Ventajas</h4>
                                  <ul className="space-y-2">
                                      <li className="flex items-center text-gray-600">
                                          <svg className="w-6 h-6 md:w-8 md:h-8 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                              <path fillRule="evenodd" d="M16.707 4.707a1 1 0 00-1.414-1.414l-7 7a1 1 0 01-1.414 0l-3-3a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8z" clipRule="evenodd"></path>
                                          </svg>
                                          Sistema audiovisual
                                      </li>
                                      <li className="flex items-center text-gray-600">
                                          <svg className="w-6 h-6 md:w-8 md:h-8 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                              <path fillRule="evenodd" d="M16.707 4.707a1 1 0 00-1.414-1.414l-7 7a1 1 0 01-1.414 0l-3-3a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8z" clipRule="evenodd"></path>
                                          </svg>
                                          Grupos reducidos
                                      </li>
                                      <li className="flex items-center text-gray-600">
                                          <svg className="w-6 h-6 md:w-8 md:h-8 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                              <path fillRule="evenodd" d="M16.707 4.707a1 1 0 00-1.414-1.414l-7 7a1 1 0 01-1.414 0l-3-3a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8z" clipRule="evenodd"></path>
                                          </svg>
                                          100% funcional
                                      </li>
                                      <li className="flex items-center text-gray-600">
                                          <svg className="w-6 h-6 md:w-8 md:h-8 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                              <path fillRule="evenodd" d="M16.707 4.707a1 1 0 00-1.414-1.414l-7 7a1 1 0 01-1.414 0l-3-3a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8z" clipRule="evenodd"></path>
                                          </svg>
                                          Horarios flexibles
                                      </li>
                                      <li className="flex items-center text-gray-600">
                                          <svg className="w-6 h-6 md:w-8 md:h-8 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                              <path fillRule="evenodd" d="M16.707 4.707a1 1 0 00-1.414-1.414l-7 7a1 1 0 01-1.414 0l-3-3a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8z" clipRule="evenodd"></path>
                                          </svg>
                                          Certificador TOEFL
                                      </li>
                                      <li className="flex items-center text-gray-600">
                                          <svg className="w-6 h-6 md:w-8 md:h-8 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                              <path fillRule="evenodd" d="M16.707 4.707a1 1 0 00-1.414-1.414l-7 7a1 1 0 01-1.414 0l-3-3a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8z" clipRule="evenodd"></path>
                                          </svg>
                                          Garantía al 100%
                                          
                                      </li>
                                      <li className="flex items-center text-gray-600">
                                          <svg className="w-6 h-6 md:w-8 md:h-8 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                              <path fillRule="evenodd" d="M16.707 4.707a1 1 0 00-1.414-1.414l-7 7a1 1 0 01-1.414 0l-3-3a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8z" clipRule="evenodd"></path>
                                          </svg>
                                          Tarjeta Dorada
                                      </li>
                                  </ul>
                              </div>
                          </animated.div>
                      </>
                  )
              )}
          </div>
      </div>
  );
}

export default Libros;
