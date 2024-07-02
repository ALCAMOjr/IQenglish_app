import { useState, useEffect } from 'react';
import { useTransition, animated, config } from 'react-spring';

const Cards = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Define tus tarjetas y su estado inicial
  const cards = [
    { 
        id: 1, 
        title: "Expertos en educación de calidad", 
        description: "Nuestros instructores son especialistas dedicados a la enseñanza y comprometidos con la excelencia."
},
    
    { 
        id: 2, 
        title: "Apasionados por la docencia y el idioma inglés", 
        description: "Profesionales del idioma inglés que aman compartir su conocimiento y experiencia.",
    },
    { 
        id: 3, 
        title: "Profesionales capacitados en la enseñanza del inglés", 
        description: "Instructores altamente calificados para guiar tu aprendizaje del inglés a la perfección.",
    },
    { 
        id: 4, 
        title: "Más que un profesor, un amigo", 
        description: "Nuestros instructores te acompañan en tu viaje de aprendizaje, brindándote apoyo y motivación.",
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
        <div className="w-[60vw] mx-auto flex justify-center flex-col items-center -mt-4 mb-12">
          <h1 className="text-2xl font-bold tracking-tight text-primary sm:text-4xl font-popping text-center mb-4">
          Aprende de los mejores
          </h1>
          <p className="mb-2 max-w-[600px] text-xl lg:text-2xl text-base text-dark dark:text-dark-4  font-normal text-center" style={{ letterSpacing: '-0.01em' }}>¡Nos encargamos de elegir los instructores perfectos para ti!</p>
          <p className="text-lg leading-relaxed text-body-color dark:text-dark-6 font-popping text-center mt-4">
  Seleccionamos cuidadosamente a los talentos más destacados, para que tengas la seguridad de que aprenderás con los mejores.
</p>

        </div>

        <div id="practica" className="-mx-4 flex flex-wrap justify-center">
          {transitions((props, item) => (
            <animated.div key={item.id} style={props} className="flex flex-col m-4"> {/* Añade márgenes para aumentar el espacio entre las tarjetas */}
              <div className="max-w-xs p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transform transition duration-500 ease-in-out hover:scale-105"> {/* Reduce el ancho máximo para hacer las tarjetas más pequeñas */}
                <div className="p-4">
                  <a href="#">
                    <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{item.title}</h5> {/* Reduce el tamaño del texto del título */}
                  </a>
                  <p className="mb-3 text-sm font-normal text-gray-500 dark:text-gray-400">{item.description}</p> {/* Reduce el tamaño del texto de la descripción */}
                  <a href="#" className="inline-flex font-medium items-center text-primary hover:underline">
                    Conoce más!
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

export default Cards;
