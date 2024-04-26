import React, { Fragment, useState, useContext, useEffect } from 'react';
import useProspects from "../../../hooks/prospects/useProspects.jsx";
import { Checkbox, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { Spinner } from "@material-tailwind/react";
import Error from "./Error.jsx";
import { IoTrash } from "react-icons/io5";
import { GrUpdate } from "react-icons/gr";
import { Pagination } from "flowbite-react";
import { IoMdCheckmark } from "react-icons/io";
import createProspect from "../../../views/prospects/createProspect.js";
import { toast } from 'react-toastify';
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { ModalContextIQ } from './IQContextModal.jsx';
import check from "../../../assets/comprobar.png"




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
];



const Prospects = () => {
    const { prospects, loading, error } = useProspects();
    const [isLoading, setIsLoading] = useState(false);
    const [openMenuIndex, setOpenMenuIndex] = useState(null);
    const [isOpen, setIsOpen] = useState([]);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [search, setSearch] = useState("")
    const [searchType, setSearchType] = useState("Nombre");
    const itemsPerPage = 6;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [currentProspects, setCurrentProspects] = useState([]);
    const [menuDirection, setMenuDirection] = useState('down');
    const [ageError, setAgeError] = useState(null);
    const [addressError, setAddressError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { openModalContext, closeModalContext, isOpenModal } = useContext(ModalContextIQ);


    const [formData, setFormData] = useState({
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

    const handleSubmit = async (e) => {
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
            if (result) {
                toast.info('Se creó correctamente el prospecto', {
                    icon: () => <img src={check} alt="Success Icon" /> // Usar el icono check importado
                });
                setIsModalOpen(false);
                closeModalContext()
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


    // Función para abrir el modal
    const openModal = () => {
        setIsModalOpen(true);
        openModalContext()
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


    const handleSearchTypeChange = (type) => {
        setSearchType(type);
        setIsSearchOpen(false);
    };


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

    const UpdateProspect = () => {
        console.log("Hola");
    };

    const DeleteProspect = () => {
        console.log("Hola");
    };

    useEffect(() => {
        const handleDocumentClick = (event) => {
            if (openMenuIndex !== null && !event.target.closest("#menu-button") && !event.target.closest(".menu-options")) {
                setOpenMenuIndex(null);
                setIsOpen(prevState => prevState.map((state, i) => i === openMenuIndex ? false : state));
            }
        };

        document.addEventListener("click", handleDocumentClick);

        return () => {
            document.removeEventListener("click", handleDocumentClick);
        };
    }, [openMenuIndex]);


    if (loading) return (
        <div className="flex items-start justify-start h-screen" style={{ position: 'relative' }}>
            <Spinner className="h-10 w-10" color="blue" style={{ position: 'absolute', top: '200px', left: '70px' }} />
        </div>
    );

    if (error) return <Error message={error.message} />;



    return (
        <div className="flex flex-col min-h-screen">
            <div className="bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-900 absolute top-0 left-0 z-0 w-full h-full"></div>

            <div data-dial-init className="fixed end-6 bottom-41 group">
                <div id="speed-dial-menu-bottom-right" className="flex flex-col items-center hidden mb-4 space-y-2">
                </div>
                <button onClick={openModal} type="button" className="flex items-center justify-center text-white bg-blue-700 rounded-full w-14 h-14 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none">
                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span className="sr-only">Open modal</span>
                </button>
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
                        <form onSubmit={handleSubmit} className="p-4 md:p-5">
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
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="relative z-0 w-full mb-5 group">
                                    <input
                                        type="tel"

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
                                            {addressError || formData.address || 'Selecciona tu ubicacion'}
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
                                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'text-white bg-blue-600' : 'text-gray-900'
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


            {!isOpenModal && (
                <form className="max-w-lg mx-auto mb-8" style={{ position: 'relative', top: '-1cm', zIndex: 999 }}>
                    <div className="flex">
                        <button
                            id="dropdown-button"
                            onClick={toggleDropdown}
                            className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                            type="button"
                        >
                            Filtrar por:
                            <svg
                                className={`w-2.5 h-2.5 ms-2.5 transition-transform ${isSearchOpen ? "rotate-180" : ""}`}
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
                                className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute mt-12"
                            >
                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                                    <li>
                                        <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => handleSearchTypeChange("Nombre")}>

                                            Nombre
                                            {searchType === "Nombre" && <IoMdCheckmark className="w-4 h-4 ml-2" />}
                                        </button>
                                    </li>
                                    <li>
                                        <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => handleSearchTypeChange("Id")}>
                                            Id
                                            {searchType === "Id" && <IoMdCheckmark className="w-4 h-4 ml-2" />}
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                        <div className="relative w-full">
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                type="search"
                                id="search-dropdown"
                                className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                                placeholder="Search Prospects:"
                                required
                                style={{ width: "300px" }} // Establece un ancho específico para el botón
                            />
                            <button
                                type="submit"
                                disabled={searchType === "Nombre"}
                                className={`absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white ${searchType === "Nombre" ? "bg-gray-400 border-gray-400 cursor-not-allowed" : "bg-blue-700 border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"}`}
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
            )}
            <div className="flex-grow relative" style={{ paddingLeft: '250px', marginTop: '-30px' }}>
                <div className="overflow-x-hidden"> {/* Modificado overflow-x-hidden */}
                    <Table hoverable className="relative z-10 min-w-max" style={{ minWidth: '400px', marginLeft: 'auto' }}>
                        <TableHead>
                            <TableHeadCell className="p-4">
                                <Checkbox color="blue" />
                            </TableHeadCell>
                            <TableHeadCell>Nombre</TableHeadCell>
                            <TableHeadCell>Apellido</TableHeadCell>
                            <TableHeadCell>Email</TableHeadCell>
                            <TableHeadCell>Número de Teléfono</TableHeadCell>
                            <TableHeadCell>Dirección</TableHeadCell>
                            <TableHeadCell>Edad</TableHeadCell>
                            <TableHeadCell>
                                <span className="sr-only">Acciones</span>
                            </TableHeadCell>
                        </TableHead>
                        <TableBody className="divide-y">
                            {currentProspects.map((prospect, index) => (
                                <TableRow key={prospect.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <TableCell className="p-4">
                                        <Checkbox color="blue" />
                                    </TableCell>
                                    <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {prospect.name}
                                    </TableCell>
                                    <TableCell>{prospect.lastname}</TableCell>
                                    <TableCell>{prospect.email}</TableCell>
                                    <TableCell>{prospect.phone_number}</TableCell>
                                    <TableCell>{prospect.addresses ? prospect.addresses : "No disponible"}</TableCell>
                                    <TableCell>{prospect.age}</TableCell>
                                    <TableCell>
                                        <button id="menu-button" onClick={() => handleMenuToggle(index)} className={`relative group p-2 ${isOpen[index] ? 'open' : ''}`}>
                                            <div className={`relative flex overflow-hidden items-center justify-center rounded-full w-[32px] h-[32px] transform transition-all bg-white ring-0 ring-gray-300 hover:ring-8  ${isOpen[index] ? 'ring-4' : ''} ring-opacity-30 duration-200 shadow-md`}>
                                                <div className="flex flex-col justify-between w-[12px] h-[12px] transform transition-all duration-300 origin-center overflow-hidden">
                                                    <div className={`bg-blue-500 h-[1px] w-3 transform transition-all duration-300 origin-left ${isOpen[index] ? 'translate-x-6' : ''}`}></div>
                                                    <div className={`bg-blue-500 h-[1px] w-3 rounded transform transition-all duration-300 ${isOpen[index] ? 'translate-x-6' : ''} delay-75`}></div>
                                                    <div className={`bg-blue-500 h-[1px] w-3 transform transition-all duration-300 origin-left ${isOpen[index] ? 'translate-x-6' : ''} delay-150`}></div>

                                                    <div className={`absolute items-center justify-between transform transition-all duration-500 top-1 -translate-x-6 ${isOpen[index] ? 'translate-x-0' : ''} flex w-0 ${isOpen[index] ? 'w-8' : ''}`}>
                                                        <div className={`absolute bg-blue-500 h-[1px] w-3 transform transition-all duration-500 rotate-0 delay-300 ${isOpen[index] ? 'rotate-45' : ''}`}></div>
                                                        <div className={`absolute bg-blue-500 h-[1px] w-3 transform transition-all duration-500 -rotate-0 delay-300 ${isOpen[index] ? '-rotate-45' : ''}`}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </button>
                                        {openMenuIndex === index && (
                                            <div className={`absolute right-0 bg-white mt-1 py-2 w-48 border rounded-lg shadow-lg menu-options ${menuDirection}`} style={{ zIndex: 9999, bottom: menuDirection === 'up' ? (index === currentProspects.length - 1 ? '2cm' : index === currentProspects.length - 2 ? '4cm' : 'initial') : 'initial' }}>
                                                <ul>
                                                    <li className="flex items-center">
                                                        <GrUpdate className="inline-block ml-8" />
                                                        <a onClick={UpdateProspect} href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Actualizar Prospecto</a>
                                                    </li>
                                                    <li className="flex items-center">
                                                        <IoTrash className="inline-block ml-8" />
                                                        <a onClick={DeleteProspect} href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Eliminar Prospecto</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex overflow-x-auto sm:justify-center">
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
                </div>
            </div>
        </div>
    );
};

export default Prospects;
