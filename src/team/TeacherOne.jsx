import { Card, CardBody } from "@nextui-org/react";
import teacherone from "../assets/foto.jpeg";

const TeacherOne = () => {
    return (
        <div className="content-container py-8 mx-auto h-auto lg:h-[500px] mb-16 lg:mb-64 bg-white">
            <div className="flex flex-col lg:flex-row items-center lg:mx-auto lg:max-w-[1200px] mt-10">

                <div className="max-w-full lg:w-1/2 lg:mr-8 lg:mb-0">
                    <p className="mb-8 max-w-[600px] text-xl lg:text-2xl dark:text-dark-6 font-popping text-primary ml-4" style={{ letterSpacing: '-0.01em' }}>Estudiar con nuestros instructores te va a permitir desarrollar al máximo cada una de las áreas del inglés.</p>

                    <div className="mb-6 mt-4 ml-4 max-w-[600px] transform transition duration-500 ease-in-out hover:scale-105 flex items-center">
                        <span className="inline-block bg-primary rounded-full h-2 w-3 mr-2"></span>
                        <Card>
                            <CardBody>
                                <p className="text-base lg:text-lg dark:text-dark-6 font-popping text-black" style={{ letterSpacing: '-0.01em' }}>Nuestros instructores ofrecen un apoyo personalizado para que alcances tus metas en el aprendizaje del inglés.</p>
                            </CardBody>
                        </Card>
                    </div>

                    <div className="mb-6 mt-4 ml-4 max-w-[600px] transform transition duration-500 ease-in-out hover:scale-105 flex items-center">
                        <span className="inline-block bg-primary rounded-full h-2 w-3 mr-2"></span>
                        <Card>
                            <CardBody>
                                <p className="text-base lg:text-lg dark:text-dark-6 font-popping text-black" style={{ letterSpacing: '-0.01em' }}>Con la ayuda de nuestros instructores serás capaz de hablar de forma fluida el idioma inglés con cualquier persona.</p>
                            </CardBody>
                        </Card>
                    </div>

                    <div className="mb-6 mt-4 ml-4 max-w-[600px] transform transition duration-500 ease-in-out hover:scale-105 flex items-center">
                        <span className="inline-block bg-primary rounded-full h-2 w-3 mr-2"></span>
                        <Card>
                            <CardBody>
                                <p className="text-base lg:text-lg dark:text-dark-6 font-popping text-black" style={{ letterSpacing: '-0.01em' }}>Nuestros instructores te ayudarán con cualquier problema o duda que tengas en el camino.</p>
                            </CardBody>
                        </Card>
                    </div>

                    <div className="mb-6 mt-4 ml-4 max-w-[600px] transform transition duration-500 ease-in-out hover:scale-105 flex items-center">
                        <span className="inline-block bg-primary rounded-full h-2 w-3 mr-2"></span>
                        <Card>
                            <CardBody>
                                <p className="text-base lg:text-lg dark:text-dark-6 font-popping text-black" style={{ letterSpacing: '-0.01em' }}>Con años de experiencia, nuestros instructores están capacitados para que tengas los mejores resultados posibles.</p>
                            </CardBody>
                        </Card>
                    </div>
                </div>

                <div className="w-full lg:w-1/2 flex justify-center items-center ml-4 lg:justify-end mb-8 lg:mb-0 order-1 lg:order-2">
    <img src={teacherone} alt="teacher" className=" mt-16 w-[300px] h-[200px] sm:w-[400px] lg:h-[300px]  lg:w-[450px] lg:h-[450px] h-auto transform transition duration-500 ease-in-out hover:scale-105 rounded-lg" />
</div>

            </div>
        </div>
    );
}

export default TeacherOne;
