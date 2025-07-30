
import { useState, useEffect, Fragment } from "react";
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


const VideoMetodo = () => {
  const [ageError, setAgeError] = useState(null);
  const [addressError, setAddressError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [isError, setIsError] = useState(false);

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

      <div className="flex flex-col lg:flex-row justify-center items-center mb-32 mt-32 gap-8 px-4">
      <video className="h-[20rem] md:h-[25rem] lg:h-[30rem] max-w-full lg:w-[600px] xl:w-[800px] border border-gray-200 rounded-lg dark:border-gray-700" autoPlay muted controls>
        <source src="https://gateway.pinata.cloud/ipfs/QmfUNZCRvK5n7fWLq2b142e5FRB1LH7esZjsux92rWPXcg" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="flex flex-col items-center lg:items-start lg:ml-8 mt-8 lg:mt-0">
        <div className="max-w-xl text-center lg:text-left">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-rose-600 font-popping text-primary">
            ¿Todavía tienes dudas de ser parte de nuestra familia?
          </h2>
          <p className="mb-2 max-w-[600px] text-lg md:text-xl lg:text-2xl dark:text-dark-6 font-popping text-black" style={{ letterSpacing: '-0.01em' }}>
            Escribe hoy, te asesoraremos con todas las preguntas que tengas.
          </p>
          <ul className="flex flex-wrap items-center mt-8 lg:mt-16 justify-center lg:justify-start">
            <li>
              <button
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-center text-lg md:text-xl lg:text-2xl font-medium text-white hover:bg-blue-700 lg:px-7"
                onClick={openModal}
              >
                Hazlo ahora
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    </div>
    );
  }
  
  export default VideoMetodo;
  