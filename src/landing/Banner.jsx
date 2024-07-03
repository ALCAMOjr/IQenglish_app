import React from 'react';
import cohete from "../assets/cohete2.png";
import { Button } from "@nextui-org/react";
import "../index.css"; // Archivo CSS para estilos adicionales

const Banner = () => {
  return (
    <div id="sticky-banner" tabIndex="-1" className="fixed top-0 start-0 z-50 flex justify-between w-full p-4 border-b border-gray-200 bg-[#F0F4F9] dark:bg-gray-700 dark:border-gray-600 mb-8">
      <div className="flex items-center mx-auto">
        <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400 banner-text">
          <img src={cohete} alt="Rocket icon" className="w-6 h-6 mr-3" />
          <span className="animated-text">
            <span>Aprovecha el</span> <span className="sale">40% OFF </span> de JULIO y aprende inglés hoy
          </span>
          <Button  onClick={() => document.getElementById('register').scrollIntoView({ behavior: 'smooth' })} color="primary" size="sm" variant='shadow' className="ml-4 flex flex-col -gap-2">
  <p className="mb-0">Empieza</p>
  <p className="mt-0">Hoy</p>
</Button> 

        </p>
      </div>
      <div className="flex items-center"></div>
    </div>
  );
}

export default Banner;
