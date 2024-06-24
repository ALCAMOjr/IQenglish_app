import foto1 from "../assets/foto1.jpg";
import foto2 from "../assets/foto2.jpg";
import foto3 from "../assets/foto3.jpg";
import { useTransition, animated, config } from 'react-spring';

import React, { useState, useEffect } from 'react';

const CardNosotros = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Define tus tarjetas y su estado inicial
  const cards = [
    { 
        id: 1, 
        image: foto1, 
        title: "Estratégicamente ubicados", 
        description: "Av. Chapultepec 2039, Buenos Aires, 64800 Monterrey, N.L." 
    },
    { 
        id: 2, 
        image: foto2, 
        title: "Sala de estudio", 
        description: "Tendrás la libertad de tener donde preparar tus practicas antes de clase" 
    },
    { 
        id: 3, 
        image: foto3, 
        title: "Instalaciones de vanguardia", 
        description: "Disfruta de nuestras modernas instalaciones completamente equipadas." 
    },
];


  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const componentTop = document.getElementById('practica').offsetTop;

      if (scrollTop + windowHeight > componentTop) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Configura las transiciones
  const transitions = useTransition(isVisible ? cards : [], {
    from: { opacity: 0, transform: 'translateY(100px)' },
    enter: { opacity: 1, transform: 'translateY(0px)' },
    config: config.molasses,
  });

  return (
    <section className="w-full h-full mt-[-1px] pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[120px] flex justify-center items-center bg-[#F0F4F9]">
      <div className="container mx-auto">
        <div className="w-[60vw] mx-auto flex justify-center flex-col items-center -mt-16 mb-12">
          <h1 className="text-2xl font-bold tracking-tight text-black sm:text-4xl font-popping text-center mb-4">
            Nuestra Ubicación e Instalaciones
          </h1>
          <p className="mb-2 max-w-[600px] text-xl lg:text-2xl text-primary text-dark dark:text-dark-4  font-normal text-center" style={{ letterSpacing: '-0.01em' }}>Nuestras experiencias diseñadas para que mejores tu vocabulario, escucha y comunicación</p>
        </div>

        <div id="practica" className="-mx-4 flex flex-wrap justify-center">
          {transitions((props, item) => (
            <animated.div key={item.id} style={props} className="flex flex-col">
              <div className="max-w-sm mx-6 my-8 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transform transition duration-500 ease-in-out hover:scale-105">
                <a href="#">
                  <img className="rounded-t-lg" src={item.image} alt={item.title} style={{ height: "200px", width: "400px" }} />
                </a>
                <div className="p-5">
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-primary dark:text-white">{item.title}</h5>
                  </a>
                  <p className="mb-12 font-normal text-gray-700 dark:text-gray-400">{item.description}</p>
                  <a onClick={() => document.getElementById('register').scrollIntoView({ behavior: 'smooth' })}className="inline-flex font-medium items-center text-primary hover:underline">
                    Saber más!
                    <svg className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
                    </svg>
                  </a>
                </div>
        
              </div>
            </animated.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CardNosotros;
