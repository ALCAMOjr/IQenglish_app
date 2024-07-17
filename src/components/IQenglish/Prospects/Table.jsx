import React, { useEffect } from 'react';
import { Checkbox, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { IoTrash } from "react-icons/io5";
import { GrUpdate } from "react-icons/gr";
import { Pagination } from "flowbite-react";
import { FaWhatsapp } from "react-icons/fa";
import { MdCall } from "react-icons/md";

const TableComponent = ({ currentProspects, currentPage, totalPages, onPageChange, handleMenuToggle, isOpen, openMenuIndex, openModalUpdate, openModalDelete, menuDirection, setOpenMenuIndex, setIsOpen }) => {

    console.log(currentProspects);

    useEffect(() => {
        const handleDocumentClick = (event) => {
            if (openMenuIndex !== null && !event.target.closest("#menu-button") && !event.target.closest(".menu-options")) {
                handleMenuClose();
            }
        };

        document.addEventListener("click", handleDocumentClick);

        return () => {
            document.removeEventListener("click", handleDocumentClick);
        };
    }, [openMenuIndex]);

    const handleMenuClose = () => {
        setOpenMenuIndex(null);
        setIsOpen([]);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES'); // Esto formateará la fecha como "dd/MM/yyyy"
    };

    return (
        <div class="overflow-x-auto">
        <div className="flex-grow relative" style={{ paddingLeft: '250px', marginTop: '10px', marginBottom: '20rem' }}>
    
                <Table hoverable className="relative min-w-max" style={{ minWidth: '400px', marginLeft: 'auto' }}>
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
                        <TableHeadCell>Dia de registro</TableHeadCell>
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
                                <TableCell className="whitespace-nowrap font-medium text-sm text-gray-900 dark:text-white">
                                    {prospect.name}
                                </TableCell>
                                <TableCell>{prospect.lastname}</TableCell>
                                <TableCell>{prospect.email}</TableCell>
                                <TableCell>
                                    {prospect.phone_number}
                                    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '40px' }}>
                                        <a href={`https://wa.me/52${prospect.phone_number.replace(/\s/g, '')}`} target="_blank" rel="noopener noreferrer">
                                            <FaWhatsapp />
                                        </a>
                                        <a href={`tel:${prospect.phone_number.replace(/\s/g, '')}`}>
                                            <MdCall />
                                        </a>
                                    </div>
                                </TableCell>
                                <TableCell>{prospect.addresses ? prospect.addresses : "No disponible"}</TableCell>
                                <TableCell>{prospect.age}</TableCell>
                                <TableCell>{formatDate(prospect.date)}</TableCell>
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
                                                    <a onClick={() => openModalUpdate(prospect)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Actualizar Prospecto</a>
                                                </li>
                                                <li className="flex items-center">
                                                    <IoTrash className="inline-block ml-8" />
                                                    <a onClick={() => openModalDelete(prospect)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Eliminar Prospecto</a>
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
  
    );
};

export default TableComponent;
