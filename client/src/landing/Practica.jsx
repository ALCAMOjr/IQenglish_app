import bookclub from "../assets/workshops/bookclub.jpg"
import canto from "../assets/workshops/canto.jpeg"
import conversation from "../assets/workshops/conversation.jpg"
import fieldtrip from "../assets/workshops/fieldtrip.png"
import movie from "../assets/workshops/movie.jpg"
import tedtalk from "../assets/workshops/tedtalk.jpeg"
import { useTransition, animated, config } from 'react-spring';

import React, { useState, useEffect } from 'react';

const Practica = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Define tus tarjetas y su estado inicial
  const cards = [
    { 
        id: 1, 
        image: conversation, 
        title: "Conversation Club", 
        description: "Mejora tus habilidades lingüísticas y desarrolla confianza mientras te sumerges en conversaciones estimulantes en nuestro Conversation Club. Alcanza la fluidez que siempre has deseado." 
    },
    { 
        id: 2, 
        image: bookclub, 
        title: "Book Club", 
        description: "Descubre nuevos mundos y enriquece tu mente con nuestro Book Club. Comparte tus pensamientos con otros apasionados de la lectura mientras exploras una amplia variedad de libros y géneros literarios." 
    },
    { 
        id: 3, 
        image: canto, 
        title: "Soundbooth", 
        description: "Sumérgete en el emocionante mundo del audio con nuestro taller Soundbooth. Aprende a crear y producir contenido cautivador, desde podcasts inspiradores hasta música original." 
    },
    { 
        id: 4, 
        image: fieldtrip, 
        title: "Field Trip", 
        description: "Descubre nuevos lugares y enriquece tu aprendizaje con experiencias prácticas fuera del aula en nuestro Field Trip. Conoce personas interesantes y expande tus horizontes." 
    },
    { 
        id: 5, 
        image: movie, 
        title: "Movie Club", 
        description: "Disfruta de películas exclusivas y participa en debates apasionantes en nuestro Movie Club. Profundiza tu comprensión de la narrativa visual mientras ves tus peliculas favoritas." 
    },
    { 
        id: 6, 
        image: tedtalk, 
        title: "TED Talk", 
        description: "Explora ideas innovadoras y aprende de líderes en sus campos con nuestro taller TED Talk. Participa en discusiones significativas que desafiarán tu pensamiento y te motivarán a actuar." 
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
        <div className="w-[60vw] mx-auto flex justify-center flex-col items-center -mt-12 mb-12">
          <h1 className="text-2xl font-bold tracking-tight text-black sm:text-4xl font-popping text-center">
            Actividades Especiales de IQ English
          </h1>
          <p className="mb-2 max-w-[600px] text-xl lg:text-2xl text-base text-dark dark:text-dark-4  font-normal text-center" style={{ letterSpacing: '-0.01em' }}>Nuestras experiencias diseñadas para que mejores tu vocabulario, escucha y comunicación</p>
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
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.description}</p>
                </div>
              </div>
            </animated.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Practica;
