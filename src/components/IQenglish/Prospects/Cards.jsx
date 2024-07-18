import React, { useState, useEffect, useContext } from "react";
import { Card } from "flowbite-react";
import { IoTrash } from "react-icons/io5";
import { GrUpdate } from "react-icons/gr";
import { RxHamburgerMenu } from "react-icons/rx";
import { ModalContextIQ } from './IQContextModal.jsx';
import { FaWhatsapp } from "react-icons/fa";
import { MdCall } from "react-icons/md";
import { Pagination } from "flowbite-react";



const Cards = ({ currentProspects, handleMenuToggle, isOpen, openMenuIndex, openModalUpdate, openModalDelete, setOpenMenuIndex, setIsOpen, currentPage, totalPages, onPageChange }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProspect, setSelectedProspect] = useState(null);
  const { openModalViewAllContext, closeModalViewAllContext } = useContext(ModalContextIQ);

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
  }, [openMenuIndex, isOpen]);

  const handleMenuClose = () => {
    setOpenMenuIndex(null);
    setIsOpen([]);
  };

  const OpenModal = (prospect) => {
    setSelectedProspect(prospect);
    setShowModal(true);
    openModalViewAllContext()
  };

  const CloseModal = () => {
    setShowModal(false)
    closeModalViewAllContext()
  }

  return (
    <div>
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', marginBottom: '15rem', marginTop: '-1rem', overflow: 'auto' }}>
      {currentProspects.map((prospect, index) => (
        <div>
        <Card key={index} className="sm:max-w-xs bg-white text-black transform transition duration-500 ease-in-out hover:scale-105" style={{ width: '100%', maxWidth: '18rem', marginBottom: '5cm', margin: '1rem' }}>
          <div className="mb-4 flex items-center justify-between">
            {/* Botón con icono RxHamburgerMenu */}
            <button id="menu-button"
              onClick={() => handleMenuToggle(index)}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 "
            >
              <RxHamburgerMenu />
            </button>
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
              Propecto  #{prospect.id}
            </h5>
            <a
          
              onClick={() => OpenModal(prospect)}
              className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              Ver todo
            </a>

          </div>
          {openMenuIndex === index && (
            <div className={`absolute right-13 bg-white mt-1 py-2 w-48 border rounded-lg shadow-lg menu-options`}>
              <ul>
                <li className="flex items-center">
                  <GrUpdate className="inline-block ml-8" />
                  <a onClick={() => openModalUpdate(prospect)}  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Actualizar Prospecto</a>
                </li>
                <li className="flex items-center">
                  <IoTrash className="inline-block ml-8" />
                  <a onClick={() => openModalDelete(prospect)}  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Eliminar Prospecto</a>
                </li>
              </ul>
            </div>
          )}

          <div className="flow-root">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="shrink-0"></div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      Nombre: {prospect.name}
                    </p>
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      Apellido: {prospect.lastname}
                    </p>
                    <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                      Email: {prospect.email}
                    </p>
                    <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                      Numero de télefono: {prospect.phone_number}
                    </p>
                    <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                      Dirección: {prospect.addresses ? prospect.addresses : "No disponible"}
                    </p>
                    <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                      Edad: {prospect.age}
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          
        </Card>
       
    </div>
     
      ))}
        <div style={{ zIndex: 999 }}>
     <div className="flex overflow-x-auto justify-center">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
        </div>
        </div>
    
      </div>
      {showModal && (
        <div id="timeline-modal" tabIndex="-1" aria-hidden="true" className="fixed inset-0 z-50 overflow-y-auto bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="relative p-4 w-full max-w-md">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow-lg dark:bg-gray-700">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Prospecto #{selectedProspect.id}
                </h3>
                <button type="button" onClick={() => CloseModal()} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="timeline-modal">
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <div className="p-4 md:p-5" style={{ wordWrap: 'break-word' }}>
                {/* Your modal content goes here */}
                <p>Nombre: {selectedProspect.name}</p>
                <p>Apellido: {selectedProspect.lastname}</p>
                <p>Email: {selectedProspect.email}</p>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <p style={{ marginRight: '10px' }}>Numero de Telefono: {selectedProspect.phone_number}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '20px' }}>
                    <a href={`https://wa.me/52${selectedProspect.phone_number.replace(/\s/g, '')}`} target="_blank" rel="noopener noreferrer">
                      <FaWhatsapp />
                    </a>
                    <a href={`tel:${selectedProspect.phone_number.replace(/\s/g, '')}`}>
                      <MdCall />
                    </a>

                  </div>
                </div>

                <p>Dirección: {selectedProspect.addresses ? selectedProspect.addresses : "No disponible"}</p>
                <p> Edad: {selectedProspect.age} </p>
              </div>
            </div>
            
          </div>
          
        </div>
        
      )}

    </div>
  
    
  );
};

export default Cards;
