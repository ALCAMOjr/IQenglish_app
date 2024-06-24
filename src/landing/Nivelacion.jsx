import student from "../../src/assets/student1.png";
import { Card, CardBody } from "@nextui-org/react";

const Nivelacion = () => {
  return (
    <div className="bg-primary">
      <div className="content-container py-8 mx-auto h-auto lg:h-[500px] ml-8">
        <div className="flex flex-col lg:flex-row items-center lg:ml-[230px] mt-24 ">
          <div className="max-w-xl">
            <h2 className="text-4xl font-bold tracking-tight text-rose-600 sm:text-5xl font-popping text-black -mt-10">
              Acepta el reto
            </h2>
            <h2 className="text-4xl font-bold tracking-tight text-rose-600 sm:text-5xl font-popping mb-4 text-[#b5d3f8]">
              Conoce tu nivel de inglés
            </h2>
            <p
              className="mb-2 max-w-[600px] text-xl lg:text-2xl dark:text-dark-6 font-popping text-white"
              style={{ letterSpacing: "-0.01em" }}
            >
              ¡En IQ English te hacemos un examen de nivelación para saber cuál es la mejor opción para ti!
            </p>
            <div className="mb-6 mt-8 max-w-[600px] transform transition duration-500 ease-in-out hover:scale-105 flex items-center">
              {/* Añade un margen inferior a esta div */}
              <span className="inline-block bg-white rounded-full h-2 w-2 mr-2"></span>
              <Card className="bg-[#b5d3f8]">
                <CardBody>
                  <p
                    className="text-base lg:text-lg dark:text-dark-6 font-popping text-black"
                    style={{ letterSpacing: "-0.01em" }}
                  >
                    Examenes Presenciales
                  </p>
                </CardBody>
              </Card>
            </div>

            <div className="mb-6 mt-4 max-w-[600px] transform transition duration-500 ease-in-out hover:scale-105 flex items-center">
              {/* Añade un margen inferior a esta div */}
              <span className="inline-block bg-white rounded-full h-2 w-2 mr-2"></span>
              <Card className="bg-[#b5d3f8]">
                <CardBody>
                  <p
                    className="text-base lg:text-lg dark:text-dark-6 font-popping text-black"
                    style={{ letterSpacing: "-0.01em" }}
                  >
                    Examenes Online
                  </p>
                </CardBody> 
              </Card>
            </div>

            <ul className="flex flex-wrap items-center mt-16">
              <li>
                <button
                  onClick={() =>
                    document.getElementById("register").scrollIntoView({
                      behavior: "smooth",
                    })
                  }
                  className="lg:ml-4 ml-20 md:ml-56 sm:ml-48 inline-flex items-center mt-1 justify-center rounded-md bg-white px-6 py-3 text-center text-xl lg:text-2xl font-medium text-gray-900 focus:outline-none border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 lg:px-7"
                >
                  Pruebalo
                </button>
              </li>
            </ul>
          </div>
          <div className="w-full flex justify-center order-1 lg:w-2/3 lg:items-center lg:order-2 m-4 lg:ml-32">
            <div className="w-full lg:w-3/3 flex justify-center mb-8 lg:mb-0 mr-8">
              <img
                src="https://wpvip.edutopia.org/wp-content/uploads/2023/10/hero_blog_Student-Wellness_Homework_photo_iStock_878931780_monkeybusinessimages.jpg?w=2880&quality=85"
                alt="hero"
                className="mt-8 lg:-ml-24  w-[450px] sm:w-[500px] sm:h-[350px] md:w-[600px] md:h-[350px] lg:w-[450px] lg:h-300px] transform transition duration-500 ease-in-out hover:scale-105 rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="h-16 lg:h-64"></div>
    </div>
  );
};

export default Nivelacion;
