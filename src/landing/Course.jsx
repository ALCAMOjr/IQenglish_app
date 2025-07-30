import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import card2 from "../../src/assets/tarjeta.png";

const Course = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const componentTop = document.querySelector(".image-container").getBoundingClientRect().top;

      if (scrollTop + windowHeight > componentTop) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const card2Animation = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateX(0)' : 'translateX(-100%)',
    from: { opacity: 0, transform: 'translateX(-100%)' },
    config: { duration: 100 },
  });

  const hoverAnimation = useSpring({
    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
  });

  return (
    <div className="flex flex-col-reverse lg:flex-row justify-center items-center mt-12 mb-28">
      <div id="card" className="lg:w-1/2 flex justify-center lg:mb-0 relative z-10 lg:z-1">
        <animated.img 
          src={card2} 
          alt="hero" 
          className="h-[200px] w-[300px] sm:h-[300px] sm:w-[400px] md:h-[350px] md:w-[550px] lg:h-[400px] lg:w-[550px] xl:h-[400px] xl:w-[600px] rounded-lg lg:ml-32 xl:ml-48 mt-6" 
          style={{...card2Animation, ...hoverAnimation}}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
      </div>
      <div className="lg:w-1/2 flex justify-center mb-8 lg:mb-0 z-10 lg:z-1 md:mt-8 md:px-16">
        <div className="text-center lg:text-left px-4 lg:px-0">
          <h2 className="text-4xl font-bold tracking-tight text-rose-600 mb-4 sm:text-5xl font-popping text-[#000000]">¡Practica inglés de por vida!</h2>
          <p className="text-4xl font-bold tracking-tight text-rose-600 sm:text-5xl font-popping text-primary mb-4">Únete a nuestra gran comunidad</p>
          <p className="mb-2 max-w-[600px] text-xl lg:text-2xl dark:text-dark-6 font-popping text-black" style={{ letterSpacing: '-0.01em' }}>
            Nuestros graduados podrán seguir practicando su inglés de por vida presentando su Gold Card en cualquiera de nuestros institutos.
          </p>
          <div className="mt-8">
            <button
              className="inline-flex items-center mt-1 justify-center rounded-md bg-primary px-6 py-3 text-center text-xl lg:text-2xl font-medium text-white hover:bg-blue-600 lg:px-7"
              onClick={() => document.getElementById('register').scrollIntoView({ behavior: 'smooth' })}
            >
              Aprende más
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
