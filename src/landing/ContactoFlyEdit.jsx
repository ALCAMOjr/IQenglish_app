import { Tooltip, Button } from '@nextui-org/react';
import { IoCall } from "react-icons/io5";
import { IoLogoWhatsapp } from "react-icons/io";
import icon from "../assets/logo2.jpeg";
import { useEffect, useState } from 'react';

function ContactoFlyEdit() {
    const telefono = "+5218180144572";
    const [mostrarBotones, setMostrarBotones] = useState(false);
    const [mostrarContactos, setMostrarContactos] = useState(false);

    const hacerLlamada = (e) => {
        e.stopPropagation();
        window.location.href = `tel:${telefono}`;
    };

    const enviarMensaje = (e) => {
        e.stopPropagation();
        window.location.href = `https://wa.me/${telefono}`;
    };

    const toggleContactos = (e) => {
        e.stopPropagation();
        setMostrarContactos(!mostrarContactos);
    };


    return (
        <div className="fixed bottom-5 right-5 flex flex-col items-end" style={{ zIndex: '999' }}>
    
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}> {/* Cambio aquí */}
                    {mostrarContactos && (
                        <>
                            <Tooltip showArrow={true} color='foreground' content="Llamada">
                                <Button isIconOnly color="primary" variant="light" aria-label="Like" onClick={hacerLlamada} style={{ margin: '0.5rem' }}>
                                    <IoCall size="4.5em" />
                                </Button>
                            </Tooltip>
                            <Tooltip showArrow={true} color='foreground' content="WhatsApp">
                                <Button isIconOnly color="primary" variant="light" aria-label="Like" onClick={enviarMensaje} style={{ margin: '0.5rem' }}>
                                    <IoLogoWhatsapp size="4.5em" />
                                </Button>
                            </Tooltip>
                        </>
                    )}
                    <Button color="secondary" onClick={toggleContactos} radius="lg"  size="lg" variant="solid">
                    ¡Contáctanos!
                    </Button>
                </div>

        </div>
    );
}

export default ContactoFlyEdit;
