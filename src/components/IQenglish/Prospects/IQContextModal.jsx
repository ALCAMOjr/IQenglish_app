import React, { useState, createContext } from 'react';

// Crear un Contexto Global
export const ModalContextIQ = createContext();

// Crear un Proveedor de Contexto Global
export const ProviderModalIQ = ({ children }) => {
  const [isOpenModalContext, setisOpenModalContext] = useState(false);
  const [isOpenModalUpdateContext, setisOpenModalUpdateContext] = useState(false); 
  const [isOpenModalDeleteContext, setisOpenModalDeleteContext] = useState(false);  
  const [isOpenModalViewAllContext, setisOpenModalViewAllContext] = useState(false);  

  // Definir el valor del contexto
  const contextValue = {
    isOpenModalContext,
    isOpenModalUpdateContext,
    isOpenModalDeleteContext,
    isOpenModalViewAllContext,
    openModalContext: () => setisOpenModalContext(true),
    closeModalContext: () => setisOpenModalContext(false),
    openModalUpdateContext: () => setisOpenModalUpdateContext(true),
    closeModalUpdateContext: () => setisOpenModalUpdateContext(false),
    openModalDeleteContext: () =>  setisOpenModalDeleteContext(true),
    closeModalDeleteContext: () =>  setisOpenModalDeleteContext(false),
    openModalViewAllContext: () =>  setisOpenModalViewAllContext(true),
    closeModalViewAllContext: () =>  setisOpenModalViewAllContext(false),
  };

  // Retornar el Provider del contexto con el valor definido
  return (
    <ModalContextIQ.Provider value={contextValue}>
      {children}
    </ModalContextIQ.Provider>
  );
};
