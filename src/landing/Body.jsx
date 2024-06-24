import { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import blogs from "../assets/blogs.png";
import blogsSmall from "../assets/blogsSmall.png";
import Contacto from "./Contacto.jsx";
import fondo_image from "../assets/fondo_image.png";

const Body = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1570);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1570);
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const componentTop = document.querySelector(".image-container").getBoundingClientRect().top;

      if (scrollTop + windowHeight > componentTop) {
        setIsVisible(true);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    handleResize();
    handleScroll();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const imageAnimation = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'scale(1)' : 'scale(0.9)',
    config: { duration: 1000 },
  });

  return (
    <div className={`area ${isSmallScreen ? 'small-screen' : ''}`}>
      <ul className="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      {isSmallScreen ? (
        <div className="content-container py-8 mx-auto flex flex-col items-center">
          <animated.div style={imageAnimation} className="w-full flex justify-center mb-2 -mt-2 image-container">
            <div style={{ backgroundImage: `url(${fondo_image})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}>
              <img src={blogsSmall} alt="hero" className="max-w-full lg:w-[400px] sm:w-[300px] md:w-[350px] w-[250px] transform transition duration-500 ease-in-out hover:scale-105" />
            </div>
          </animated.div>
          <div className="text-center max-w-xl -mt-24">
            <h2 className="text-2xl font-bold tracking-tight text-rose-600 sm:text-3xl font-popping text-[#b5d3f8]">
              Domina el Inglés y Transforma tu Futuro
            </h2>
            <p className="mb-1 text-md lg:text-sm dark:text-dark-6 font-popping text-[#F0F4F9]" style={{ letterSpacing: '-0.01em' }}>
            Aprende inglés fácilmente con nuestro enfoque práctico y accesible. Mejora tus oportunidades laborales y avanza en tu vida diaria.
            </p>
            <p className="mb-1 max-w-[600px] text-xl lg:text-2xl dark:text-dark-6 font-signature text-dark" style={{ letterSpacing: '-0.01em', lineHeight: '1.4' }}>
                We are the speaking specialist.
              </p>
            <ul className="flex flex-col items-center">
              <li>
                <button
                  className=" transform transition duration-500 ease-in-out hover:scale-105 inline-flex items-center mt-1 justify-center rounded-md bg-[#b5d3f8] px-4 py-2 text-center text-lg lg:text-xl font-medium text-black hover:bg-blue-200"
                  onClick={() => document.getElementById('register').scrollIntoView({ behavior: 'smooth' })}
                >
                  Empezar
                </button>
              </li>
              <li>
              <div className="-mt-4 flex justify-center mr-44">
                  <Contacto /> {/* Renderizar el componente Contacto aquí */}
                </div>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="content-container py-8 mx-auto relative">
          <div className="flex flex-col-reverse lg:flex-row items-center ml-0 lg:ml-[250px]">
            <div className="max-w-xl -mt-24">
              <h2 className="text-4xl font-bold tracking-tight text-rose-600 sm:text-5xl font-popping text-[#b5d3f8]">
                Domina el Inglés y transforma tu futuro
              </h2>
              <p className="mb-2 max-w-[600px] text-lg dark:text-dark-6 font-popping text-[#F0F4F9]" style={{ letterSpacing: '-0.01em' }}>
              Aprende inglés fácilmente con nuestro enfoque práctico y divertido. Mejora tus oportunidades laborales y avanza en tu vida diaria.
              </p>
              <p className="mb-2 max-w-[600px] text-xl lg:text-2xl dark:text-dark-6 font-signature text-dark" style={{ letterSpacing: '-0.01em', lineHeight: '1.4' }}>
                We are the speaking specialist.
              </p>
              <ul className="flex flex-wrap items-center">
                <li>
                  <button
                    className=" transform transition duration-500 ease-in-out hover:scale-105 inline-flex items-center mt-1 justify-center rounded-md bg-[#b5d3f8] px-6 py-3 text-center text-xl lg:text-2xl font-medium text-black hover:bg-blue-200 lg:px-7"
                    onClick={() => document.getElementById('register').scrollIntoView({ behavior: 'smooth' })}
                  >
                    Empezar
                  </button>
                </li>
                <li>
                  <Contacto /> {/* Renderizar el componente Contacto aquí */}
                </li>
              </ul>
            </div>
            <div className="w-[400px] lg:w-1/3 flex items-center flex-grow ml-0 order-1 lg:order-2 lg:ml-48">
              <div className="w-full lg:w-2/3 flex justify-center mb-8 lg:mb-0 order-2 lg:order-1 image-container">
                <animated.div style={imageAnimation}>
                  <div style={{ backgroundImage: `url(${fondo_image})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}>
                    <img src={blogs} alt="hero" className="max-w-full lg:ml-auto w-[350px] transform transition duration-500 ease-in-out hover:scale-105" />
                  </div>
                </animated.div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Body;
