import NuevaYork3 from "../assets/NuevaYork3.jpg";

const NuevaYork = () => {
  return (
    <section
      className="w-full h-full mb-32 pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[120px] flex justify-center items-center"
      style={{
        backgroundImage: `url(${NuevaYork3})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        imageRendering: 'auto',
      }}
    >
      <div className="container mx-auto">
        <div className="w-[60vw] mx-auto flex flex-col items-center -mt-4 mb-12">
          <h1 className="text-2xl font-bold tracking-tight text-primary sm:text-4xl font-popping text-center mb-4">
            ¡Viaja a Nueva York!
          </h1>
          <p
            className="mb-2 max-w-[600px] text-xl lg:text-2xl text-dark dark:text-dark-4 font-normal text-center"
            style={{ letterSpacing: '-0.01em' }}
          >
            Al concluir tu preparación bilingüe en IQ English en 12 meses o menos, podrás vivir esta experiencia que cambiará tu vida y relación con el idioma.
          </p>
          <p className="text-lg leading-relaxed text-white dark:text-dark-6 font-popping text-center mt-4">
            Durante una semana perfecciona tu inglés en el College of Mount Saint Vincent y explora de cerca los lugares más emocionantes de la ciudad de Nueva York. ¡Inscríbete ahora!
          </p>
          <ul className="flex flex-wrap justify-center items-center mt-8 lg:mt-16">
            <li>
              <button
                className="inline-flex items-center mt-1 justify-center rounded-md bg-white px-6 py-3 text-center text-xl lg:text-2xl font-medium text-gray-900  focus:outline-none border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 lg:px-7"
                onClick={() => document.getElementById('register').scrollIntoView({ behavior: 'smooth' })}
              >
                Empieza ahora
              </button>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default NuevaYork;
