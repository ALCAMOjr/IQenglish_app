import React from 'react';

const Video = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-center items-center mb-32 mt-32 gap-8 px-4">
      <video className="h-[20rem] md:h-[25rem] lg:h-[30rem] max-w-full lg:w-[600px] xl:w-[800px] border border-gray-200 rounded-lg dark:border-gray-700" autoPlay muted controls>
        <source src="https://gateway.pinata.cloud/ipfs/QmXkpjYf6hfx4jKKoiWnGTVhP1ZgDEpy4XEGUTK5hEaX7X" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="flex flex-col items-center lg:items-start lg:ml-8 mt-8 lg:mt-0">
        <div className="max-w-xl text-center lg:text-left">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-rose-600 font-popping text-primary">
            ¿Todavía tienes dudas de nuestro viaje a New York?
          </h2>
          <p className="mb-2 max-w-[600px] text-lg md:text-xl lg:text-2xl dark:text-dark-6 font-popping text-black" style={{ letterSpacing: '-0.01em' }}>
          Escribe hoy para que un asesor resuelva todas tus dudas.
          </p>
          <ul className="flex flex-wrap items-center mt-8 lg:mt-16 justify-center lg:justify-start">
            <li>
              <button
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-center text-lg md:text-xl lg:text-2xl font-medium text-white hover:bg-blue-700 lg:px-7"
                onClick={() => document.getElementById('register').scrollIntoView({ behavior: 'smooth' })}
              >
                Hazlo ahora
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Video;
