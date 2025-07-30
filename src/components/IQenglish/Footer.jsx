import React, { useContext } from 'react';
import { Footer, FooterCopyright, FooterDivider, FooterLink, FooterLinkGroup } from "flowbite-react";
import logo2 from "../../assets/logo2.jpeg";
import { ModalContextIQ } from './Prospects/IQContextModal.jsx';

function FooterPage() {
  const { isOpenModalContext, isOpenModalUpdateContext, isOpenModalDeleteContext } = useContext(ModalContextIQ);

  return (
    !isOpenModalContext && !isOpenModalUpdateContext && !isOpenModalDeleteContext && (
      <Footer container className="fixed bottom-0 w-full z-1000">
        <div className="w-full text-center">
          <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
            <a href="https://flowbite.com" className="flex items-center">
              <img src={logo2} className="h-12 w-12 me-3 rounded-full" alt="IQenglish Logo" />
              <span className="text-xl font-bold">IQenglish</span>
            </a>
            <FooterLinkGroup>
              <FooterLink href="#">Acerca de</FooterLink>
              <FooterLink href="#">Política de privacidad</FooterLink>
              <FooterLink href="#">Licencia</FooterLink>
              <FooterLink href="#">Contacto</FooterLink>
            </FooterLinkGroup>
          </div>
          <FooterDivider />
          <FooterCopyright href="#" by="IQenglish™" year={2024} />
        </div>
      </Footer>
    )
  );
}

export default FooterPage;
