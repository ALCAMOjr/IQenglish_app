import { Card, CardBody } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import card2 from "../../src/assets/toefl.png";

const Toefl = () => {
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
    <div className="bg-primary">
      <div className="flex flex-col-reverse lg:flex-row justify-center items-center mt-12 mb-8">
        <div id="card" className="lg:w-1/2 flex justify-center lg:mb-0 relative z-10 lg:z-1">
          <animated.img
            src={card2}
            alt="hero"
            className="lg:mr-20 h-[100px] w-[300px] sm:h-[125px] sm:w-[400px] md:h-[150px] md:w-[450px] lg:h-[160px] lg:w-[550px] xl:h-[200px] xl:w-[600px] rounded-lg lg:ml-48 mt-6"
            style={{ ...card2Animation, ...hoverAnimation }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
        </div>
        <div className="lg:w-1/2 flex justify-center mb-8 lg:mb-0 z-10 lg:z-1 md:mt-8 md:px-16">
          <div className="text-center lg:text-left px-4 lg:px-0">
            <h2 className="text-4xl font-bold tracking-tight text-rose-600 mb-4 sm:text-5xl font-popping text-black">Certifícate en TOEFL</h2>
            <p className="text-4xl font-bold tracking-tight text-rose-600 sm:text-5xl font-popping text-[#b5d3f8] mb-4">Lleva tu inglés al siguiente nivel</p>
            <p className="mb-2 max-w-[600px] text-xl lg:text-2xl dark:text-dark-6 font-popping text-white" style={{ letterSpacing: '-0.01em' }}>
              Nuestros certificados en TOEFL mejoran su vida profesional en solo unos meses.
            </p>

            <div className="mt-8">
              <button
                className="inline-flex items-center mb-12 justify-center rounded-md bg-white px-6 py-3 text-center text-xl lg:text-2xl font-medium text-gray-900 focus:outline-none border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 lg:px-7" onClick={() => document.getElementById('register').scrollIntoView({ behavior: 'smooth' })}
              >
                Aprende más
              </button>
            </div>

          </div>

        </div>

      </div>
      <div className="h-16 lg:h-12"></div>
    </div>
  );
};

export default Toefl;
