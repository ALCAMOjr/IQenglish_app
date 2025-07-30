import React, { useEffect, useState } from 'react';
import TableComponent from './Table.jsx';
import Cards from './Cards.jsx'; // Asegúrate de importar el componente Card correctamente

const TablaCondicionada = ({
    currentProspects,
    currentPage,
    totalPages,
    onPageChange,
    handleMenuToggle,
    isOpen,
    openMenuIndex,
    openModalUpdate,
    openModalDelete,
    menuDirection,
    setOpenMenuIndex,
    setIsOpen

}) => {
    const [shouldRenderTable, setShouldRenderTable] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1200) {
                setShouldRenderTable(true);
            } else {
                setShouldRenderTable(false);
            }
        };

        // Add event listener to handle window resize
        window.addEventListener('resize', handleResize);

        // Call handleResize initially to determine whether to render table
        handleResize();

        // Remove event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return shouldRenderTable ? (
        <TableComponent
            currentProspects={currentProspects}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            handleMenuToggle={handleMenuToggle}
            isOpen={isOpen}
            openMenuIndex={openMenuIndex}
            openModalUpdate={openModalUpdate}
            openModalDelete={openModalDelete}
            menuDirection={menuDirection} // Pasar menuDirection a TableComponent
            setOpenMenuIndex={setOpenMenuIndex}
            setIsOpen={setIsOpen}
        />
    ) : (
        <Cards
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
    );
};

export default TablaCondicionada;
