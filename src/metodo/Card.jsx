import React, { useState, useEffect } from 'react';
import { useTransition, animated, config } from 'react-spring';
import image1 from "../assets/groups.png";
import image2 from "../assets/users.png";
import visual from "../assets/visual.png";
import "../css/Tailwind.css";



const Card = () => {
  const [isVisible, setIsVisible] = useState(false);
  // Define tus tarjetas y su estado inicial
  const issues = [
    { id: 1, image: image1, name: "Aprende inglés a distancia", description: "Utilizamos las herramientas tecnológicas posibles para segurar tu aprendizaje a la distancia." },
    { id: 2, image: image2, name: "Grupos pequeños", description: "Manejamos un máximo de 6 alumnos por grupo en el instituto y 4 alumnos por sala en línea." },
    { id: 3, image: visual, name: "Sistema audiovisual", description: "Aprenderás inglés de la misma forma que aprendiste español: observando, razonando y practicando." },
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
const transitions = useTransition(isVisible ? issues : [], {
  from: { opacity: 1, transform: 'translateY(100px)' },
  enter: { opacity: 1, transform: 'translateY(0px)' },
  config: config.molasses,
});


  return (
    <section className="w-full h-full mt-[-1px] pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[120px] flex justify-center items-center bg-[#F0F4F9]">
    <div className="container mx-auto">
      <div className="w-[80vw] mx-auto flex justify-center flex-col items-center -mt-4 mb-12">
        <h1 className="text-2xl font-bold tracking-tight text-primary sm:text-4xl font-popping text-center mb-4">
        Beneficios exclusivos
        </h1>
        <p className="mb-2 max-w-[600px] text-lg lg:text-2xl text-base text-dark dark:text-dark-4  font-normal text-center" style={{ letterSpacing: '-0.01em' }}> Por qué estudiar en IQ English</p>
        <p className="text-lg leading-relaxed text-body-color dark:text-dark-6 font-popping text-center mt-4">
        Somos una empresa que esta a la vanguardia en la enseñanza profesional del idioma inglés, contamos con mas de 30 años de experiencia y tenemos presencia a nivel nacional
</p>

      </div>

      <div id="practica" className="-mx-4 flex flex-wrap justify-center ">
      {transitions((props, item) => (
              <animated.div
                key={item.id}
                style={props}
                className="m-6 flex flex-col relative z-10"
              >
                <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transform transition duration-500 ease-in-out hover:scale-105">
                  <div className="flex flex-col items-center pb-10">
                    <img
                      className="w-24 h-32 mb-3 rounded-full mt-12"
                      src={item.image}
                      alt={`${item.name} image`}
                    />
                    <h5 className="mb-1 text-xl font-medium text-black dark:text-white">{item.name}</h5>
                    <span className="text-lg text-gray-800 text-center dark:text-gray-400">{item.description}</span>
                  </div>
                </div>
              </animated.div>
            ))}
      </div>
    </div>
  </section>
  );
}

export default Card;
