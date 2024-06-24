import { useState, useEffect, Fragment } from "react";
import { useTransition, animated, config } from 'react-spring';
import libro1 from "../assets/libro1.jpeg";
import libro2 from "../assets/libro2.jpeg";
import libro3 from "../assets/libro3.jpeg";
import createProspect from "../views/prospects/createProspect.js";
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

const locations = [
    { name: 'Selecciona tu ubicacion:', value: '' },
    { name: 'Apodaca', value: 'Apodaca' },
    { name: 'Cadereyta Jiménez', value: 'Cadereyta Jiménez' },
    { name: 'García', value: 'García' },
    { name: 'San Pedro Garza García', value: 'San Pedro Garza García' },
    { name: 'General Escobedo', value: 'General Escobedo' },
    { name: 'Guadalupe', value: 'Guadalupe' },
    { name: 'Juárez', value: 'Juárez' },
    { name: 'Monterrey', value: 'Monterrey' },
    { name: 'Salinas Victoria', value: 'Salinas Victoria' },
    { name: 'San Nicolás de los Garza', value: 'San Nicolás de los Garza' },
    { name: 'Santa Catarina', value: 'Santa Catarina' },
    { name: 'Santiago', value: 'Santiago' },
    { name: 'Otro lugar', value: 'Otro lugar' },
];

const Metodo = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [ageError, setAgeError] = useState(null);
    const [addressError, setAddressError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const [isError, setIsError] = useState(false);


    const cards = [
        {
            id: 1,
            image: libro1,
            title: "Primer nivel",
            description: "Al termino de nuestro primer nivel estaras dentro de un nivel A2 de acuerdo al MCERL.",
            details: [
                "Objetivo: Seras capaz de comprender frases y expresiones de uso frecuente relacionadas con áreas de experiencia (Información basica sobre ti mismo y tu familia).",
                "Clubes de práctica:Participaras en al menos 22 clubes para que estes preparado para el siguiente nivel."
            ],
            color: "#3056D3"  // Azul oscuro
        },
        {
            id: 2,
            image: libro2,
            title: "Segundo Nivel",
            description: "Al termino de nuestro segundo nivel estaras dentro de un nivel B1 de acuerdo al MCERL.",
            details: [
                "Objetivo: Seras capaz de hablar en la mayor parte de situaciones que pueden surgir durante un viaje donde se utiliza la lengua inglesa.",
                "Clubes de práctica:Participaras en al menos 32 clubes en los cuales podras describir experiencias, acontecimientos deseos y aspiraciones personales."
            ],
            color: "#6B9DFE"  // Azul claro
        },
        {
            id: 3,
            image: libro3,
            title: "Tercer Nivel",
            description: "Al termino de nuestro tercer nivel estaras dentro de un nivel B2 de acuerdo al MCERL.",
            details: [
                "Objetivo: Seras capaz de interactuar con fluidez y confianza con hablantes nativos sin que haya tensión en la conversación.",
                "Clubes de práctica: Participaras en al menos 32 clubes donde podras expresar ideas complejas y detalladas sobre temas abstractos y concretos, argumentar y defender tu punto de vista."
            ],
            color: "#D4AF37"  // Dorado
        }
    ];

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const windowHeight = window.innerHeight;
            const componentTop = document.getElementById('metodo').offsetTop;

            if (scrollTop + windowHeight > componentTop) {
                setIsVisible(true);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


const transitions = useTransition(isVisible ? cards : [], {
    from: { opacity: isModalOpen ? 1 : 0, transform: isModalOpen ? 'none' : 'translateY(100px)' },
    enter: { opacity: 1, transform: 'translateY(0px)' },
    config: config.molasses,
  });
  

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    lastname: '',
    email: '',
    phone_number: '',
    age: '',
    address: ''
  });

  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === 'age' && value.trim() === '') {
      setAgeError(null);
    }
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleLocationChange = (value) => {
    if (value !== '') {
      setAddressError(null);
    }
    setFormData({
      ...formData,
      address: value
    });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Inicia la carga

    // Validación de la edad
    if (!/^\d+$/.test(formData.age)) {
      setAgeError('La edad debe ser un número');
      setIsLoading(false); // Termina la carga
      return;
    } else {
      setAgeError(null);
    }

    // Validación de la dirección
    if (formData.address === '') {
      setAddressError('Este campo es obligatorio');
      setIsLoading(false); // Termina la carga
      return;
    } else {
      setAddressError(null);
    }

    const age = parseInt(formData.age);

    try {
      // Guardar el resultado de createProspect en una variable
      const result = await createProspect({
        name: formData.name,
        lastname: formData.lastname,
        email: formData.email,
        phone_number: formData.phone_number,
        age: age,
        address: formData.address // Cambiado a 'address'
      });
      // Comprobar si result tiene un valor
      if (result) {
        closeModal()
        onOpen(); // Abre el modal de éxito;
      } else {
        console.error('Algo mal sucedio');
        setIsError(true); // Indicar que hubo un error
        closeModal()
        onOpen();
      }
    } catch (error) {
      console.error(error); // Maneja el error aquí
      setIsError(true); // Indicar que hubo un error
      closeModal()
      onOpen();
    }
    setIsLoading(false); // Termina la carga
  };

  const openModal = () => {
    setFormData({
      id: '',
      name: '',
      lastname: '',
      email: '',
      phone_number: '',
      age: '',
      address: ''
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


    return (
        <div>
             <div className="dark:from-blue-900 absolute top-0 left-0 z-0"></div>
<div className="container mx-auto">
  <Modal
    isOpen={isOpen}
    placement="top-center"
    onOpenChange={onOpenChange}
    backdrop='blur'
  >
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader className="flex flex-col gap-1 font-popping">
            {isError ? "¡Lo sentimos!" : "¡Qué gran noticia! 🥳"}
          </ModalHeader>
          <ModalBody>
            <p>
              {isError
                ? "Lo sentimos, algo mal ha sucedido al enviar tus datos. Por favor, intenta de nuevo."
                : "Acabas de dar el primer paso para convertirte en una persona bilingüe. IQenglish agradece tu preferencia para aprender inglés con nosotros."}
            </p>
            {!isError && (
              <p>
                En breve uno de nuestros asesores se pondrá en contacto contigo para darte más información.
              </p>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onPress={onClose}>
              Aceptar
            </Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
  </Modal>
  {isModalOpen && (
    <div id="crud-modal" tabIndex="-1" aria-hidden="true" className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
      <div className="relative p-4 mx-auto mt-20 max-w-md bg-white rounded-lg shadow-lg dark:bg-gray-700">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Estás a un click de iniciar 🥳

          </h3>
          <button onClick={closeModal} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <form onSubmit={handleCreate} className="p-4 md:p-5">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="email"
              id="floating_email"
              value={formData.email}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Dirección de correo
            </label>
          </div>
          <div className="grid gap-4 mb-4 grid-cols-2">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="name"
                id="floating_first_name"
                value={formData.name}
                onChange={handleChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_first_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Nombre
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="lastname"
                id="floating_last_name"
                value={formData.lastname}
                onChange={handleChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_last_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Apellido
              </label>
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="tel"

                name="phone_number"
                id="floating_phone"
                value={formData.phone_number}
                onChange={handleChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_phone"
                className="peer-focus:font-medium absolute -mt-4 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Número de Teléfono: (+52) <span className="text-xs">81 2674 6000</span>


              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="age"
                id="floating_age"
                value={formData.age}
                onChange={handleChange}
                className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${ageError ? 'border-red-500' : 'border-gray-300'
                  } appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_age"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Edad
              </label>
              {ageError && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{ageError}</p>}
            </div>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <Listbox value={formData.address} onChange={handleLocationChange}>
              {({ open }) => (
                <>
                  <Listbox.Label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Selecciona la ubicación
                  </Listbox.Label>
                  <div className="relative mt-1">
                    <Listbox.Button className={`relative w-full cursor-default rounded-md border ${addressError ? 'border-red-500' : 'border-gray-300'
                      } bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm`}>
                      <span className="block truncate">{formData.address || 'Selecciona la ubicacion'}</span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </span>
                    </Listbox.Button>
                    <Transition
                      show={open}
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {locations.map((location) => (
                          <Listbox.Option
                            key={location.value}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-3 pr-9 ${active ? 'bg-primary text-white' : 'text-gray-900'
                              }`
                            }
                            value={location.value}
                          >
                            {({ selected, active }) => (
                              <>
                                <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                  }`}>
                                  {location.name}
                                </span>
                                {selected ? (
                                  <span
                                    className={`absolute inset-y-0 right-0 flex items-center pr-4 ${active ? 'text-white' : 'text-primary'
                                      }`}
                                  >
                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                  {addressError && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{addressError}</p>}
                </>
              )}
            </Listbox>
          </div>
          <div className="flex items-start mb-5">
            <div className="flex items-center h-5">
              <input id="terms" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
            </div>
            <label htmlFor="terms" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 font-montserrat">De acuerdo con los <a  className="text-blue-600 hover:underline dark:text-blue-500">términos y condiciones</a></label>
          </div>
          <div className="flex items-start mb-5">
            <div className="flex items-center h-5">
              <input id="terms" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
            </div>
            <label htmlFor="terms" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 font-montserrat">Acepto recibir mensajes o llamadas</label>
          </div>
          <div>
            <button
              type="submit"
              className="w-full mt-4 rounded border border-primary bg-primary p-3 text-white transition hover:bg-opacity-90"
            >
              {isLoading ? (
                <div role="status">
                  <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="white" />
                  </svg>
                  <span class="sr-only">Enviando...</span>
                </div>
              ) : (
                'Enviar'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )}

</div>
        <section id="metodo" className="relative z-10 overflow-hidden bg-white pb-12 pt-20 dark:bg-dark lg:pb-[90px] lg:pt-[120px]">
            <div className="container mx-auto">
                <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-4">
                        <div className="mx-auto mb-[60px] max-w-[510px] text-center">
                            <span className="mb-2 block text-lg font-semibold text-primary">
                                Nuestro Metodo
                            </span>
                            <h2 className="mb-3 text-3xl font-bold leading-[1.208] text-black dark:text-black sm:text-4xl md:text-[40px]">
                                3 Niveles de 14 lecciones
                            </h2>
                            <p className="text-base text-body-color dark:text-dark-6">
                                El mejor sistema de enseñanza: observando, escuchando y repitiendo. Lo que nos permitirá tener conversaciones más fluidas en menos tiempo y con menos esfuerzo.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="-mx-4 flex flex-wrap justify-center">
                    {transitions((props, item) => (
                        <animated.div key={item.id} style={props} className="w-full px-4 md:w-1/2 lg:w-1/3">
                            <div className="relative z-10 mb-10 overflow-hidden rounded-[10px] border-2 border-stroke bg-white px-8 py-10 shadow-pricing dark:border-dark-3 dark:bg-dark-2 sm:p-12 lg:px-6 lg:py-10 xl:p-[50px]">
                                <div className="flex items-center mb-2">
                                    <span className="block text-lg font-semibold text-primary" style={{ color: item.color }}>
                                        {item.title}
                                    </span>
                                </div>

                                <h2 className="mb-0 text-[42px] font-bold text-dark dark:text-white">
                                    <span style={{ color: item.color }}>Nivel {item.id}</span>
                                </h2>
                                <p className="mb-8 border-b border-stroke pb-8 text-base text-body-color dark:border-dark-3 dark:text-dark-6">
                                    {item.description}
                                </p>
                                <div className="mb-9 flex flex-col gap-[14px]">
                                    {item.details.map((detail, index) => (
                                        <p key={index} className="text-base text-body-color dark:text-dark-6">
                                            <strong>{detail.split(":")[0]}:</strong> {detail.split(":")[1]}
                                        </p>
                                    ))}

                                    <a  onClick={openModal}  className="inline-flex font-medium items-center text-primary hover:underline" style={{ color: item.color }}>
                                        Conoce más!
                                        <svg className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778" />
                                        </svg>
                                    </a>
                                </div>
                                <div>
                                    <span className="absolute right-0 top-7">
                                        <img
                                            src={item.image}
                                            alt={`Image for ${item.title}`}
                                            className="absolute inset-0 w-full h-full object-cover  clip-image  -ml-8"
                                            style={{ width: '87px', height: '87px', left: '50%', transform: 'translateX(-50%)', zIndex: 99 }}
                                        />
                                        <svg
                                            width="77"
                                            height="172"
                                            viewBox="0 0 77 172"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <circle cx="86" cy="86" r="86" fill="url(#paint0_linear)" />
                                            <defs>
                                                <linearGradient
                                                    id="paint0_linear"
                                                    x1="86"
                                                    y1="0"
                                                    x2="86"
                                                    y2="172"
                                                    gradientUnits="userSpaceOnUse"
                                                >
                                                    <stop stopColor={item.color} stopOpacity="0.09" />
                                                    <stop
                                                        offset="1"
                                                        stopColor="#C4C4C4"
                                                        stopOpacity="0"
                                                    />
                                                </linearGradient>
                                            </defs>

                                        </svg>

                                    </span>
                                    <span className="absolute right-4 top-4 z-[-1]">
                                        <svg
                                            width="41"
                                            height="89"
                                            viewBox="0 0 41 89"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <circle
                                                cx="38.9138"
                                                cy="87.4849"
                                                r="1.42021"
                                                transform="rotate(180 38.9138 87.4849)"
                                                fill={item.color}
                                            />
                                            <circle
                                                cx="38.9138"
                                                cy="74.9871"
                                                r="1.42021"
                                                transform="rotate(180 38.9138 74.9871)"
                                                fill={item.color}
                                            />
                                            <circle
                                                cx="38.9138"
                                                cy="62.4892"
                                                r="1.42021"
                                                transform="rotate(180 38.9138 62.4892)"
                                                fill={item.color}
                                            />
                                            <circle
                                                cx="38.9138"
                                                cy="38.4477"
                                                r="1.42021"
                                                transform="rotate(180 38.9138 38.4477)"
                                                fill={item.color}
                                            />
                                            <circle
                                                cx="38.9138"
                                                cy="13.4062"
                                                r="1.42021"
                                                transform="rotate(180 38.9138 13.4062)"
                                                fill={item.color}
                                            />
                                            <circle
                                                cx="38.9138"
                                                cy="50.9918"
                                                r="1.42021"
                                                transform="rotate(180 38.9138 50.9918)"
                                                fill={item.color}
                                            />
                                            <circle
                                                cx="38.9138"
                                                cy="26.9503"
                                                r="1.42021"
                                                transform="rotate(180 38.9138 26.9503)"
                                                fill={item.color}
                                            />
                                            <circle
                                                cx="38.9138"
                                                cy="1.90871"
                                                r="1.42021"
                                                transform="rotate(180 38.9138 1.90871)"
                                                fill={item.color}
                                            />
                                            <circle
                                                cx="26.4157"
                                                cy="87.4849"
                                                r="1.42021"
                                                transform="rotate(180 26.4157 87.4849)"
                                                fill={item.color}
                                            />
                                            <circle
                                                cx="26.4157"
                                                cy="74.9871"
                                                r="1.42021"
                                                transform="rotate(180 26.4157 74.9871)"
                                                fill={item.color}
                                            />
                                            <circle
                                                cx="26.4157"
                                                cy="62.4892"
                                                r="1.42021"
                                                transform="rotate(180 26.4157 62.4892)"
                                                fill={item.color}
                                            />
                                            <circle
                                                cx="26.4157"
                                                cy="38.4477"
                                                r="1.42021"
                                                transform="rotate(180 26.4157 38.4477)"
                                                fill={item.color}
                                            />
                                            <circle
                                                cx="26.4157"
                                                cy="13.4062"
                                                r="1.42021"
                                                transform="rotate(180 26.4157 13.4062)"
                                                fill={item.color}
                                            />
                                            <circle
                                                cx="26.4157"
                                                cy="50.9918"
                                                r="1.42021"
                                                transform="rotate(180 26.4157 50.9918)"
                                                fill={item.color}
                                            />
                                            <circle
                                                cx="26.4157"
                                                cy="26.9503"
                                                r="1.42021"
                                                transform="rotate(180 26.4157 26.9503)"
                                                fill={item.color}
                                            />
                                            <circle
                                                cx="26.4157"
                                                cy="1.90871"
                                                r="1.42021"
                                                transform="rotate(180 26.4157 1.90871)"
                                                fill={item.color}
                                            />
                                            <circle
                                                cx="13.9177"
                                                cy="87.4849"
                                                r="1.42021"
                                                transform="rotate(180 13.9177 87.4849)"
                                                fill={item.color}
                                            />
                                            <circle
                                                cx="13.9177"
                                                cy="74.9871"
                                                r="1.42021"
                                                transform="rotate(180 13.9177 74.9871)"
                                                fill={item.color}
                                            />
                                            <circle
                                                cx="13.9177"
                                                cy="62.4892"
                                                r="1.42021"
                                                transform="rotate(180 13.9177 62.4892)"
                                                fill={item.color}
                                            />
                                            <circle
                                                cx="13.9177"
                                                cy="38.4477"
                                                r="1.42021"
                                                transform="rotate(180 13.9177 38.4477)"
                                                fill={item.color}
                                            />
                                            <circle
                                                cx="13.9177"
                                                cy="13.4062"
                                                r="1.42021"
                                                transform="rotate(180 13.9177 13.4062)"
                                                fill={item.color}
                                            />
                                            <circle
                                                cx="13.9177"
                                                cy="50.9918"
                                                r="1.42021"
                                                transform="rotate(180 13.9177 50.9918)"
                                                fill={item.color}
                                            />
                                            <circle
                                                cx="13.9177"
                                                cy="26.9503"
                                                r="1.42021"
                                                transform="rotate(180 13.9177 26.9503)"
                                                fill={item.color}
                                            />
                                            <circle
                                                cx="13.9177"
                                                cy="1.90871"
                                                r="1.42021"
                                                transform="rotate(180 13.9177 1.90871)"
                                                fill={item.color}
                                            />
                                            <circle
                                                cx="1.41963"
                                                cy="87.4849"
                                                r="1.42021"
                                                transform="rotate(180 1.41963 87.4849)"
                                                fill={item.color}
                                            />
                                            <circle
                                                cx="1.41963"
                                                cy="74.9871"
                                                r="1.42021"
                                                transform="rotate(180 1.41963 74.9871)"
                                                fill={item.color}
                                            />
                                            <circle
                                                cx="1.41963"
                                                cy="62.4892"
                                                r="1.42021"
                                                transform="rotate(180 1.41963 62.4892)"
                                                fill={item.color}
                                            />
                                            <circle
                                                cx="1.41963"
                                                cy="38.4477"
                                                r="1.42021"
                                                transform="rotate(180 1.41963 38.4477)"
                                                fill={item.color}
                                            />
                                            <circle
                                                cx="1.41963"
                                                cy="13.4062"
                                                r="1.42021"
                                                transform="rotate(180 1.41963 13.4062)"
                                                fill={item.color}
                                            />
                                            <circle
                                                cx="1.41963"
                                                cy="50.9918"
                                                r="1.42021"
                                                transform="rotate(180 1.41963 50.9918)"
                                                fill={item.color}
                                            />
                                            <circle
                                                cx="1.41963"
                                                cy="26.9503"
                                                r="1.42021"
                                                transform="rotate(180 1.41963 26.9503)"
                                                fill={item.color}
                                            />
                                            <circle
                                                cx="1.41963"
                                                cy="1.90871"
                                                r="1.42021"
                                                transform="rotate(180 1.41963 1.90871)"
                                                fill={item.color}
                                            />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </animated.div>
                    ))}
                </div>
            </div>
        </section>
        </div>
    );
};

export default Metodo;
