import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import IQBot from "../assets/IQBot.png";
import aprendizaje from "../assets/icons/cerebro.png";
import horario from "../assets/icons/reloj.png"
import atencion from "../assets/icons/internet.png";
import certificacion from "../assets/icons/certificado.png";
import poliza from "../assets/icons/garantia.png";
import card from "../assets/icons/card.png";
import fondo from "../assets/fondo.png";

const Mediun = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1500);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1500);
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

  const iqBotAnimation = useSpring({
    opacity: isVisible ? 1 : 0,
    from: { opacity: 0 },
    config: { duration: 100 }, // Ajusta la duración de la animación según sea necesario
  });

  return (
    <div className={`flex justify-between ${isSmallScreen ? 'flex-col items-center' : ''}`}>
      {isSmallScreen ? (
        <div className="w-full bg-cover bg-center flex justify-center items-center mb-8" style={{ backgroundImage: `url(${fondo})`, height: "8cm" }}>
          <animated.img src={IQBot} alt="hero" className="w-auto h-[250px] transform transition duration-500 ease-in-out hover:scale-110" style={iqBotAnimation} />
        </div>
      ) : (
        <div className="w-[40vw] bg-cover bg-center flex justify-center items-center" style={{ backgroundImage: `url(${fondo})`, height: "15cm" }}>
          <animated.img src={IQBot} alt="hero" className="w-auto h-[400px] transform transition duration-500 ease-in-out hover:scale-110" style={iqBotAnimation} />
        </div>
      )}
      <div className={`w-[80vw] flex flex-col items-center justify-center -mt-22  ${isSmallScreen ? 'mb-4' : ''}`}>
        <h1 className={`mb-2 text-2xl font-bold tracking-tight text-rose-600 sm:text-4xl font-popping mt-[2px] ${isSmallScreen ? '-mb-4 text-xl' : ''}`}>
         Beneficios de pertenecer a la 
        </h1>
        <h1 className={`text-2xl font-bold tracking-tight text-rose-600 sm:text-4xl font-popping mt-[2px] ${isSmallScreen ? '-mb-4 text-xl' : ''}`}>
         comunidad IQ English
        </h1>
        <div className="flex flex-col mt-12 space-y-4">
          <p className={`flex items-center text-2xl font-bold tracking-tight text-rose-600 sm:text-2xl font-popping transform transition duration-500 ease-in-out hover:scale-105 ${isSmallScreen ? 'text-sm' : ''}`}>
            <img src={aprendizaje} alt="Icono 1" className="w-8 h-8 mr-2" /> Aprendizaje Integral
          </p>
          <p className={`flex items-center text-2xl font-bold tracking-tight text-rose-600 sm:text-2xl font-popping transform transition duration-500 ease-in-out hover:scale-105 ${isSmallScreen ? 'text-sm' : ''}`}>
            <img src={horario} alt="Icono 2" className="w-8 h-8 mr-2" /> Horarios Personalizados
          </p>
          <p className={`flex items-center text-2xl font-bold tracking-tight text-rose-600 sm:text-2xl font-popping transform transition duration-500 ease-in-out hover:scale-105 ${isSmallScreen ? 'text-sm' : ''}`}>
            <img src={atencion} alt="Icono 3" className="w-8 h-8 mr-2" />Atención Online
          </p>
          <p className={`flex items-center text-2xl font-bold tracking-tight text-rose-600 sm:text-2xl font-popping transform transition duration-500 ease-in-out hover:scale-105 ${isSmallScreen ? 'text-sm' : ''}`}>
            <img src={certificacion} alt="Icono 4" className="w-8 h-8 mr-2" /> certificación Toefl
          </p>
          <p className={`flex items-center text-2xl font-bold tracking-tight text-rose-600 sm:text-2xl font-popping transform transition duration-500 ease-in-out hover:scale-105 ${isSmallScreen ? 'text-sm' : ''}`}>
            <img src={poliza} alt="Icono 5" className="w-8 h-8 mr-2" /> Aprendizaje asegurado
          </p>
          <p className={`flex items-center text-2xl font-bold tracking-tight text-rose-600 sm:text-2xl font-popping transform transition duration-500 ease-in-out hover:scale-105 ${isSmallScreen ? 'text-center text-sm' : ''}`}>
            <img src={card} alt="Icono 4" className="w-8 h-8 mr-2" /> Aprendizaje de por vida
          </p>
        </div>
      </div>
    </div>
  );
};

export default Mediun;
