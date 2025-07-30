import IQBot from "../assets/IQBot.png";
const Metodo = () => {
  return (


    <div className="py-32 mx-auto  bg-gradient-to-b from-white to-blue-50 ">
      <div className="py-32 mx-auto  bg-gradient-to-b from-white to-blue-50 ">
        <div className="flex flex-col-reverse lg:flex-row items-center ml-0 lg:ml-[150px]">
          {/* Div izquierdo */}
          <div className="w-full lg:w-1/3 flex justify-center mb-8 lg:mb-0 order-2 lg:order-1">
            <img src={IQBot} alt="hero" className="max-w-full lg:ml-auto w-[350px] transform transition duration-500 ease-in-out hover:scale-105" />
          </div>
          {/* Div derecho */}
          <div className="w-[400px] lg:w-1/3 flex items-center flex-grow ml-4 order-1 lg:order-2">
            <div className="w-full lg:w-6/6">
              <h1 className="mb-2 text-2xl lg:text-3xl font-bold leading-[1.208] text-dark dark:text-white sm:text-[24px] lg:text-[40px] xl:text-4xl font-montserrat" style={{ letterSpacing: '-0.02em' }}>
                Habla inglés fluido en 7 meses. Rápido y efectivo.
              </h1>
              <p className="mb-2 max-w-[600px] text-xl lg:text-2xl dark:text-dark-6 font-montserrat" style={{ letterSpacing: '-0.01em' }}>
                IQ English es tu opción para aprender inglés rápido e intensivo.
              </p>
              <ul className="flex flex-wrap items-center">
                <li>
                  Método innovador
                  Horarios flexibles
                  Clubes de conversación
                </li>
                <li>
                  Aprendizaje personalizado
                  <a />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>


  )
}

export default Metodo