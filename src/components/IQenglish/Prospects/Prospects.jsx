import React, { Fragment, useState, useContext, useEffect } from 'react';
import useProspects from "../../../hooks/prospects/useProspects.jsx";
import { Spinner } from "@material-tailwind/react";
import Error from "./Error.jsx";
import { IoMdCheckmark } from "react-icons/io";
import createProspectForm from "../../../views/prospects/createProspectForm.js";
import { toast } from 'react-toastify';
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { ModalContextIQ } from './IQContextModal.jsx';
import check from "../../../assets/check.png";
import TableConditional from './TableConditional.jsx';
import { useMediaQuery } from 'react-responsive';
import { RiChatNewLine } from "react-icons/ri";
import getProspectById from "../../../views/prospects/getProspectsId.js"
import Context from '../../../context/advisor.context.jsx';



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


const Prospects = () => {
    const { prospects, loading, error, setProspects, updateProspect, deleteProspect } = useProspects();
    const [isLoading, setIsLoading] = useState(false);
    const [openMenuIndex, setOpenMenuIndex] = useState(null);
    const [isOpen, setIsOpen] = useState([]);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [searchType, setSearchType] = useState('Nombre'); // Por defecto, busca por nombre
    const [isManualSearch, setIsManualSearch] = useState(false);
    const itemsPerPage = 6;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [currentProspects, setCurrentProspects] = useState([]);
    const [menuDirection, setMenuDirection] = useState('down');
    const [ageError, setAgeError] = useState(null);
    const [addressError, setAddressError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { openModalContext, closeModalContext, isOpenModalContext, openModalUpdateContext, closeModalUpdateContext, isOpenModalUpdateContext, openModalDeleteContext, closeModalDeleteContext, isOpenModalDeleteContext, isOpenModalViewAllContext } = useContext(ModalContextIQ);
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);
    const [ismodalOpenUpdate, setisModalOpenUpdate] = useState(false);
    const [isModalOpenDelete, setisModalOpenDelete] = useState(false);
    const [emailActive, setEmailActive] = useState(false);
    const [nameActive, setNameActive] = useState(false);
    const [lastnameActive, setLastnameActive] = useState(false);
    const [phoneNumberActive, setPhoneNumberActive] = useState(false);
    const [ageActive, setAgeActive] = useState(false);
    const [addressActive, setAddressActive] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const isDesktopOrLaptop = useMediaQuery({ minWidth: 1200 });
    const { jwt } = useContext(Context);




    const handleMouseEnter = () => {
        setIsTooltipVisible(true);
    };

    const handleMouseLeave = () => {
        setIsTooltipVisible(false);
    };

    const [formData, setFormData] = useState({
        id: '',
        name: '',
        lastname: '',
        email: '',
        phone_number: '',
        age: '',
        address: '' // Cambiado de 'addresses' a 'address'
    });


    const handleChange = (e) => {
        let value = e.target.value;

        if (e.target.name === 'age') {
            if (value.trim() === '') {
                setAgeError(null); // Si el campo de edad está vacío, borra el mensaje de error
            }
        }

        setFormData({
            ...formData,
            [e.target.name]: value
        });
    };


    const handleLocationChange = (value) => {
        if (value !== '') {
            setAddressError(null); // Si se selecciona una opción, borra el mensaje de error
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

        // Después de que se complete la creación del prospecto con éxito
        try {
            // Guardar el resultado de createProspect en una variable
            const result = await createProspectForm({
                name: formData.name,
                lastname: formData.lastname,
                email: formData.email,
                phone_number: formData.phone_number,
                age: age,
                address: formData.address // Cambiado a 'address'
            });

            if (result) {
                toast.info('Se creó correctamente el prospecto', {
                    icon: () => <img src={check} alt="Success Icon" />, // Usar el icono check importado
                    progressStyle: {
                      background: '#1D4ED8', // Color de la barra de progreso (azul oscuro)
                    }
                  });
                  

                // Actualiza la lista de prospectos en el estado local
                const updatedProspects = [...prospects, result];
                setProspects(updatedProspects);

                setIsModalOpen(false);
                closeModalContext();
            } else {
                toast.warning('Algo mal sucedió al crear el prospecto'); // Muestra una alerta de advertencia
                setIsModalOpen(false);
                closeModalContext()
            }
        } catch (error) {
            console.error(error); // Maneja el error aquí
            toast.error('Algo mal sucedió al crear el prospecto'); // Muestra una alerta de error
            setIsModalOpen(false);
            closeModalContext()
        }

        setIsLoading(false); // Termina la carga
    };

    const handleUpdate = async (e) => {
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

        // Después de que se complete la creación del prospecto con éxito
        try {
            const { success } = await updateProspect({
                id: formData.id,
                name: formData.name,
                lastname: formData.lastname,
                email: formData.email,
                phone_number: formData.phone_number,
                age: age,
                address: formData.address
            });

            if (success) {
                toast.info('Se actualizo correctamente el prospecto', {
                    icon: () => <img src={check} alt="Success Icon" />, // Usar el icono check importado
                    progressStyle: {
                      background: '#1D4ED8', // Color de la barra de progreso (azul oscuro)
                    }
                  });
                // Puedes usar los datos actualizados aquí si es necesario
            } else {
                toast.error('Algo mal sucedió al actualizar el prospecto: ' + error.message);
            }

            setisModalOpenUpdate(false);
            closeModalUpdateContext();
        } catch (error) {
            console.error(error); // Maneja el error aquí
            toast.error('Algo mal sucedió al actualizar el prospecto'); // Muestra una alerta de error

            setisModalOpenUpdate(false);
            closeModalUpdateContext();
        }

        setIsLoading(false); // Termina la carga
    };



    // Función para abrir el modal
    const openModal = () => {
        setFormData({
            id: '',
            name: '',
            lastname: '',
            email: '',
            phone_number: '',
            age: '',
            address: '' // Cambiado de 'addresses' a 'address'
        });
        setIsModalOpen(true);
        openModalContext()
        setIsTooltipVisible(false);
    };

    // Función para cerrar el modal
    const closeModal = () => {
        setIsModalOpen(false);
        closeModalContext()
    };

    useEffect(() => {
        let reversedProspects = prospects ? [...prospects].reverse() : null;

        if (reversedProspects) {
            setTotalPages(Math.ceil(reversedProspects.length / itemsPerPage));
            setCurrentProspects(reversedProspects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
        } else {
            setTotalPages(2);
            setCurrentProspects([]);
        }
    }, [prospects, currentPage]);

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    const toggleDropdown = () => setIsSearchOpen(!isSearchOpen);



    const handleMenuToggle = (index) => {
        setOpenMenuIndex(index === openMenuIndex ? null : index);

        setIsOpen(prevState => {
            const newState = [...prevState];
            newState[index] = !newState[index];
            return newState;
        });

        // Determine menu direction
        if (index >= currentProspects.length - 2) {
            setMenuDirection('up');
        } else {
            setMenuDirection('down');
        }
    };

    const openModalUpdate = (prospect) => {
        setFormData({
            id: prospect.id,
            name: prospect.name,
            lastname: prospect.lastname,
            email: prospect.email,
            phone_number: prospect.phone_number,
            age: prospect.age,
            address: prospect.addresses // Cambiado de 'addresses' a 'address'
        });
        setisModalOpenUpdate(true);
        openModalUpdateContext();
    };


    const closeModalUpdate = () => {
        setisModalOpenUpdate(false)
        closeModalUpdateContext()
    };

    const openModalDelete = (prospect) => {
        setFormData({
            id: prospect.id,
            name: prospect.name,
            lastname: prospect.lastname,
            email: prospect.email,
            phone_number: prospect.phone_number,
            age: prospect.age,
            address: prospect.addresses // Cambiado de 'addresses' a 'address'
        });
        setisModalOpenDelete(true);
        openModalDeleteContext()
    };


    const closeModalDelete = () => {
        setisModalOpenDelete(false)
        closeModalDeleteContext()
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        setIsDeleting(true);

        try {
            const { success, data } = await deleteProspect({
                id: formData.id,
            });

            if (success) {
                toast.info('Se elimino correctamente el prospecto', {
                    icon: () => <img src={check} alt="Success Icon" />, // Usar el icono check importado
                    progressStyle: {
                      background: '#1D4ED8', // Color de la barra de progreso (azul oscuro)
                    }
                  });
            } else {
                toast.error('Algo mal sucedio al eliminar el prospecto: ' + error.message);
            }
        } catch (error) {
            console.error(error);
            toast.error('Algo mal sucedió al eliminar el prospecto');
        } finally {
            setIsDeleting(false);
            setisModalOpenDelete(false);
            closeModalDeleteContext();
        }
    };

    // Función para cambiar el tipo de búsqueda
    const handleSearchTypeChange = (type) => {
        setSearchType(type);
        setIsSearchOpen(false);
        setSearch('');
        // Si el tipo de búsqueda es 'Id', habilita la búsqueda manual
        setIsManualSearch(type === 'Id');

        let reversedProspects = prospects ? [...prospects].reverse() : null;
            if (reversedProspects) {
                setTotalPages(Math.ceil(reversedProspects.length / itemsPerPage));
                setCurrentProspects(reversedProspects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
            } else {
                setTotalPages(2);
                setCurrentProspects([]);
            }
    };


    const searcherProspect = async (searchTerm) => {
        const lowercaseSearchTerm = searchTerm.toLowerCase();
        let filteredProspects = [];
        if (searchType === 'Nombre') {
            filteredProspects = prospects.filter(prospect => prospect.name.toLowerCase().includes(lowercaseSearchTerm));
        } else if (searchType === 'Id') {
            try {
                const prospect = await getProspectById(searchTerm, jwt);
                if (prospect) {
                    filteredProspects.push(prospect);
                } else {
                    filteredProspects = [];
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    filteredProspects = [];
                } else {
                    console.error("Algo mal sucedio")
                }
            }
        }

        setCurrentProspects(filteredProspects);
        setTotalPages(Math.ceil(filteredProspects.length / itemsPerPage));
        setCurrentPage(1);
    };



    // Función para manejar el cambio en el input de búsqueda
    const handleSearchInputChange = (e) => {
        const searchTerm = e.target.value;
        setSearch(searchTerm);

        // Si la búsqueda es por ID y hay un valor ingresado, activa el botón de búsqueda
        if (searchType === 'Id' && searchTerm.trim() !== '') {
            setIsManualSearch(true);
        }

        // Si la búsqueda es por Nombre, realiza la búsqueda automáticamente
        if (searchType === 'Nombre' && searchTerm.trim() !== '') {
            searcherProspect(searchTerm);
        }

        // Si se borra el valor del input, vuelve al comportamiento predeterminado
        if (searchTerm.trim() === '') {
            setIsManualSearch(false);
            let reversedProspects = prospects ? [...prospects].reverse() : null;
            if (reversedProspects) {
                setTotalPages(Math.ceil(reversedProspects.length / itemsPerPage));
                setCurrentProspects(reversedProspects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
            } else {
                setTotalPages(2);
                setCurrentProspects([]);
            }
        }
    }

    // Función para manejar la búsqueda manual (por ID)
    const handleManualSearch = () => {
        if (search.trim() !== '') {
            searcherProspect(search);
        }
    };


    if (loading) return (
        <div className="flex items-start justify-start h-screen" style={{ position: 'relative' }}>
            <Spinner className="h-10 w-10" color="blue" style={{ position: 'absolute', top: '200px', left: '70px' }} />
        </div>
    );

    if (error) return <Error message={error.message} />;

    const buttonCreateProspectStyle = {
        position: isDesktopOrLaptop ? 'relative' : 'fixed',
        zIndex: 1000,
        right: isDesktopOrLaptop ? '-1200px' : '60px',
        bottom: isDesktopOrLaptop ? '60px' : '213px', // Ajusta el valor del top según el tamaño de la pantalla
    };

    const tooltipBaseStyle = {
        position: 'absolute',
        zIndex: 10000,
        padding: '2px',
        fontSize: '0.75rem',
        fontWeight: '500',
        color: '#111827',
        transition: 'opacity 0.3s',
        backgroundColor: '#F9FAFB',
        border: '1px solid #E5E7EB',
        borderRadius: '0.375rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        top: '-120%', // Posiciona el tooltip debajo del botón
        left: '50%', // Centra el tooltip horizontalmente
        transform: 'translateX(-50%)', // Asegura que el tooltip esté centrado
    };

    return (
        <div className="flex flex-col min-h-screen">
            <div className="dark:from-blue-900 absolute top-0 left-0 z-0 w-full h-full"></div>
            {!isOpenModalContext && !isOpenModalUpdateContext && !isOpenModalDeleteContext && !isOpenModalViewAllContext && (
                <div>
                    <button
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={openModal}
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 me-2 mb-2"
                        style={buttonCreateProspectStyle}
                    >
                        <RiChatNewLine />
                        <span className="sr-only">Open modal</span>

                        {isTooltipVisible && (
                            <div
                                id="tooltip-share"
                                role="tooltip"
                                className="absolute z-10 inline-block w-auto px-2 py-1 text-xs font-medium text-gray-900 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm tooltip"
                                style={tooltipBaseStyle}
                            >
                                Nuevo Prospecto
                                <div className="tooltip-arrow" data-popper-arrow></div>
                            </div>
                        )}
                    </button>
                </div>
            )}

            <div id="popup-modal" tabindex="-1" class={`${isModalOpenDelete ? '' : 'hidden'} fixed top-0 right-0 left-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50 z-50`}>
                <div class="bg-white rounded-lg shadow w-full max-w-md">
                    <div class="p-4 md:p-5 text-center">
                        <svg class="mx-auto mb-4 text-gray-400 w-12 h-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <h3 class="mb-5 text-lg font-normal text-gray-500">Esta seguro que quieres eliminar este prospecto??</h3>
                        <button onClick={handleDelete} type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-3">
                            {isDeleting ? <Spinner className="h-5 w-5" color="red" /> : 'Si, estoy seguro'}
                        </button>
                        <button onClick={closeModalDelete} type="button" class="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">No, cancelar</button>
                    </div>
                </div>
            </div>




            {isModalOpen && (
                <div id="crud-modal" tabIndex="-1" aria-hidden="true" className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
                    <div className="relative p-4 mx-auto mt-20 max-w-md bg-white rounded-lg shadow-lg dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Crear Nuevo Prospecto
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
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                    required
                                />
                                <label
                                    htmlFor="floating_email"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Direccion de correo
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
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" "
                                        required
                                    />
                                    <label
                                        htmlFor="floating_first_name"
                                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" "
                                        required
                                    />
                                    <label
                                        htmlFor="floating_last_name"
                                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        Apellido
                                    </label>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 md:gap-6">
                                <div className="relative z-0 w-full mb-5 group">
                                    <input
                                        type="tel"
                                        pattern="([0-9]{2}\s[0-9]{4}\s[0-9]{4})|([0-9]{2}\s[0-9]{4}\s[0-9]{4})|([0-9]{3}\s[0-9]{3}\s[0-9]{4})"
                                        name="phone_number"
                                        id="floating_phone"
                                        value={formData.phone_number}
                                        onChange={handleChange}
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" "
                                        required
                                    />

                                    <label
                                        htmlFor="floating_phone"
                                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        Teléfono <span className="text-xs">(81 1635 9851)</span>
                                    </label>

                                </div>
                                <div className="relative z-0 w-full mb-5 group">
                                    <input
                                        type="text"
                                        name="age"
                                        id="floating_company"
                                        value={formData.age}
                                        onChange={handleChange}
                                        className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${ageError ? 'border-red-500' : 'border-gray-300'} appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                                        placeholder=" "
                                        required
                                    />
                                    {ageError && <p className="text-red-500">{ageError}</p>}
                                    <label
                                        htmlFor="floating_company"
                                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        Edad
                                    </label>
                                </div>
                            </div>
                            <div className="relative z-20 mb-8">
                                <Listbox value={formData.address} onChange={handleLocationChange}>
                                    <Listbox.Button className="relative z-20 w-full appearance-none rounded-lg border border-stroke bg-transparent px-5 py-[10px] text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-black dark:border-dark-3">
                                        <span className={`block truncate ${addressError ? 'text-red-500' : ''}`}>
                                            {addressError || formData.address || 'Selecciona la ubicacion'}
                                        </span>
                                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                            <ChevronUpDownIcon
                                                className="h-5 w-5 text-gray-400"
                                                aria-hidden="true"
                                            />
                                        </span>
                                    </Listbox.Button>

                                    <Transition
                                        as={Fragment}
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                            {locations.map((location, locationIdx) => (
                                                <Listbox.Option
                                                    key={locationIdx}
                                                    className={({ active }) =>
                                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'text-white bg-primary' : 'text-gray-900'
                                                        }`
                                                    }
                                                    value={location.value}
                                                >
                                                    {({ selected }) => (
                                                        <>
                                                            <span
                                                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                                    }`}
                                                            >
                                                                {location.name}
                                                            </span>
                                                            {selected ? (
                                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                                                    <CheckIcon className="h-5 w-5 text-black" aria-hidden="true" />
                                                                </span>
                                                            ) : null}

                                                        </>
                                                    )}
                                                </Listbox.Option>
                                            ))}
                                        </Listbox.Options>
                                    </Transition>
                                </Listbox>
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
                                            <span class="sr-only">Creando...</span>
                                        </div>
                                    ) : (
                                        'Crear'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {ismodalOpenUpdate && (
                <div id="crud-modal" tabIndex="-1" aria-hidden="true" className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
                    <div className="relative p-4 mx-auto mt-20 max-w-md bg-white rounded-lg shadow-lg dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Actualizar Prospecto
                            </h3>
                            <button onClick={closeModalUpdate} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <form onSubmit={handleUpdate} className="p-4 md:p-5">
                            <div className="relative z-0 w-full mb-5 group">
                                <input
                                    type="email"
                                    name="email"
                                    id="floating_email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${emailActive ? '' : 'pointer-events-none'}`}
                                    placeholder=" "
                                    required
                                    readOnly={!emailActive}
                                />
                                <label
                                    htmlFor="floating_email"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Direccion de correo
                                </label>
                                <div className="flex items-center">
                                    <input
                                        checked={emailActive}
                                        onChange={() => setEmailActive(!emailActive)}
                                        id="email-checkbox"
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label
                                        htmlFor="email-checkbox"
                                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    >
                                        Editar
                                    </label>
                                </div>
                            </div>

                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="relative z-0 w-full mb-5 group">
                                    <input
                                        type="text"
                                        name="name"
                                        id="floating_first_name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${nameActive ? '' : 'pointer-events-none'}`}
                                        placeholder=" "
                                        required
                                        readOnly={!nameActive}
                                    />
                                    <label
                                        htmlFor="floating_first_name"
                                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        Nombre
                                    </label>
                                    <div className="flex items-center">
                                        <input
                                            checked={nameActive}
                                            onChange={() => setNameActive(!nameActive)}
                                            id="name-checkbox"
                                            type="checkbox"
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label
                                            htmlFor="name-checkbox"
                                            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            Editar
                                        </label>
                                    </div>
                                </div>
                                <div className="relative z-0 w-full mb-5 group">
                                    <input
                                        type="text"
                                        name="lastname"
                                        id="floating_last_name"
                                        value={formData.lastname}
                                        onChange={handleChange}
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" "
                                        required
                                        readOnly={!lastnameActive}
                                    />
                                    <label
                                        htmlFor="floating_last_name"
                                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        Apellido
                                    </label>
                                    <div className="flex items-center">
                                        <input
                                            checked={lastnameActive}
                                            onChange={() => setLastnameActive(!lastnameActive)}
                                            id="name-checkbox"
                                            type="checkbox"
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label
                                            htmlFor="name-checkbox"
                                            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            Editar
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 md:gap-6">
                                <div className="relative z-0 w-full mb-5 group">
                                    <input
                                        type="tel"
                                        pattern="([0-9]{2}\s[0-9]{4}\s[0-9]{4})|([0-9]{2}\s[0-9]{4}\s[0-9]{4})|([0-9]{3}\s[0-9]{3}\s[0-9]{4})"
                                        name="phone_number"
                                        id="floating_phone"
                                        value={formData.phone_number}
                                        onChange={handleChange}
                                        className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${phoneNumberActive ? '' : 'pointer-events-none'}`}
                                        placeholder=" "
                                        required
                                        readOnly={!phoneNumberActive}
                                    />

                                    <label
                                        htmlFor="floating_phone"
                                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        Teléfono <span className="text-xs">(81 1635 9851)</span>
                                    </label>
                                    <div className="flex items-center">
                                        <input
                                            checked={phoneNumberActive}
                                            onChange={() => setPhoneNumberActive(!phoneNumberActive)}
                                            id="phone-checkbox"
                                            type="checkbox"
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label
                                            htmlFor="phone-checkbox"
                                            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            Editar
                                        </label>
                                    </div>

                                </div>
                                <div className="relative z-0 w-full mb-5 group">
                                    <input
                                        type="text"
                                        name="age"
                                        id="floating_company"
                                        value={formData.age}
                                        onChange={handleChange}
                                        className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${ageError ? 'border-red-500' : 'border-gray-300'} appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                                        placeholder=" "
                                        required
                                        readOnly={!ageActive}
                                    />
                                    {ageError && <p className="text-red-500">{ageError}</p>}
                                    <label
                                        htmlFor="floating_company"
                                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        Edad
                                    </label>
                                    <div className="flex items-center">
                                        <input
                                            checked={ageActive}
                                            onChange={() => setAgeActive(!ageActive)}
                                            id="phone-checkbox"
                                            type="checkbox"
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label
                                            htmlFor="phone-checkbox"
                                            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            Editar
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <Listbox value={formData.address} onChange={handleLocationChange}>
                                    <Listbox.Button
                                        className={`relative z-20 w-full appearance-none rounded-lg border border-stroke bg-transparent px-5 py-[10px] text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-black dark:border-dark-3 ${!addressActive ? 'pointer-events-none opacity-50' : ''}`}
                                    >
                                        <span className={`block truncate ${addressError ? 'text-red-500' : ''}`}>
                                            {addressError || formData.address || 'Selecciona la ubicacion'}
                                        </span>
                                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </span>
                                    </Listbox.Button>

                                    <Transition
                                        as={Fragment}
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        {addressActive && (
                                            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                                {locations.map((location, locationIdx) => (
                                                    <Listbox.Option
                                                        key={locationIdx}
                                                        className={({ active }) =>
                                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'text-white bg-blue-600' : 'text-gray-900'}`
                                                        }
                                                        value={location.value}
                                                    >
                                                        {({ selected }) => (
                                                            <>
                                                                <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                                    {location.name}
                                                                </span>
                                                                {selected && (
                                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                                                        <CheckIcon className="h-5 w-5 text-black" aria-hidden="true" />
                                                                    </span>
                                                                )}
                                                            </>
                                                        )}
                                                    </Listbox.Option>
                                                ))}
                                            </Listbox.Options>
                                        )}
                                    </Transition>
                                </Listbox>
                                <div className="flex items-center mt-2">
                                    <input
                                        checked={addressActive}
                                        onChange={() => setAddressActive(!addressActive)}
                                        id="address-checkbox"
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label
                                        htmlFor="address-checkbox"
                                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    >
                                        Editar
                                    </label>
                                </div>
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
                                            <span class="sr-only">Actualizando...</span>
                                        </div>
                                    ) : (
                                        'Actualizar'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}


            {!isOpenModalContext && !isOpenModalUpdateContext && !isOpenModalDeleteContext && !isOpenModalViewAllContext && (
                <>
                    {isDesktopOrLaptop ? (
                        <form className="max-w-xs mx-auto mb-4" style={{ position: 'fixed', top: '11%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 999 }}>
                            <div className="flex">
                                <button
                                    id="dropdown-button"
                                    onClick={toggleDropdown}
                                    className="flex-shrink-0 z-10 inline-flex items-center py-1 px-2 text-xs font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                                    type="button"
                                >
                                    Filtrar por:
                                    <svg
                                        className={`w-2 h-2 ms-1 transition-transform ${isSearchOpen ? "rotate-180" : ""}`}
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 10 6"
                                    >
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                    </svg>
                                </button>
                                {isSearchOpen && (
                                    <div
                                        id="dropdown"
                                        className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute mt-8"
                                    >
                                        <ul className="py-1 text-xs text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                                            <li>
                                                <button type="button" className="inline-flex w-full px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => handleSearchTypeChange("Nombre")}>
                                                    Nombre
                                                    {searchType === "Nombre" && <IoMdCheckmark className="w-3 h-3 ml-1" />}
                                                </button>
                                            </li>
                                            <li>
                                                <button type="button" className="inline-flex w-full px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => handleSearchTypeChange("Id")}>
                                                    Id
                                                    {searchType === "Id" && <IoMdCheckmark className="w-3 h-3 ml-1" />}
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                                <div className="relative w-full">
                                    <input
                                        value={search}
                                        onChange={handleSearchInputChange}
                                        type="search"
                                        id="search-dropdown"
                                        className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                                        placeholder="Search Prospects:"
                                        required
                                        style={{ width: "300px" }} // Establece un ancho específico para el botón
                                    />
                                    <button
                                        type="button"
                                        disabled={!isManualSearch} // Deshabilitado si no es una búsqueda manual
                                        onClick={handleManualSearch} // Realiza la búsqueda manual
                                        className={`absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white ${!isManualSearch ? "bg-gray-400 border-gray-400 cursor-not-allowed" : "bg-blue-700 border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"}`}
                                    >
                                        <svg
                                            className="w-4 h-4"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                            />
                                        </svg>
                                        <span className="sr-only">Search</span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    ) : (
                        <form className="max-w-xs mx-auto mb-4" style={{ position: 'fixed', top: '11%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 999 }}>
                            <div className="flex">
                                <button
                                    id="dropdown-button"
                                    onClick={toggleDropdown}
                                    className="flex-shrink-0 z-10 inline-flex items-center py-1 px-2 text-xs font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                                    type="button"
                                >
                                    Filtrar por:
                                    <svg
                                        className={`w-2 h-2 ms-1 transition-transform ${isSearchOpen ? "rotate-180" : ""}`}
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 10 6"
                                    >
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                    </svg>
                                </button>
                                {isSearchOpen && (
                                    <div
                                        id="dropdown"
                                        className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-36 dark:bg-gray-700 absolute mt-8"
                                    >
                                        <ul className="py-1 text-xs text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                                            <li>
                                                <button type="button" className="inline-flex w-full px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => handleSearchTypeChange("Nombre")}>
                                                    Nombre
                                                    {searchType === "Nombre" && <IoMdCheckmark className="w-3 h-3 ml-1" />}
                                                </button>
                                            </li>
                                            <li>
                                                <button type="button" className="inline-flex w-full px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => handleSearchTypeChange("Id")}>
                                                    Id
                                                    {searchType === "Id" && <IoMdCheckmark className="w-3 h-3 ml-1" />}
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                                <div className="relative w-full">
                                    <input
                                        value={search}
                                        onChange={handleSearchInputChange}
                                        type="search"
                                        id="search-dropdown"
                                        className="block p-1.5 w-full z-20 text-xs text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                                        placeholder="Search Prospects:"
                                        required
                                        style={{ width: "200px" }}
                                    />
                                    <button
                                        type="button"
                                        disabled={!isManualSearch} // Deshabilitado si no es una búsqueda manual
                                        onClick={handleManualSearch} // Realiza la búsqueda manual
                                        className={`absolute top-0 right-0 p-1.5 text-xs font-medium h-full text-white ${!isManualSearch ? "bg-gray-400 border-gray-400 cursor-not-allowed" : "bg-blue-700 border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"}`}
                                    >
                                        <svg
                                            className="w-3 h-3"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                            />
                                        </svg>
                                        <span className="sr-only">Search</span>
                                    </button>
                                </div>
                            </div>
                        </form>


                    )}
                </>
            )}
            <TableConditional
                currentProspects={currentProspects}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
                handleMenuToggle={handleMenuToggle}
                isOpen={isOpen}
                openMenuIndex={openMenuIndex}
                openModalUpdate={openModalUpdate}
                openModalDelete={openModalDelete}
                menuDirection={menuDirection} // Pasar menuDirection a Cards
                setOpenMenuIndex={setOpenMenuIndex}
                setIsOpen={setIsOpen}
            />
        </div>
    );
};

export default Prospects;
