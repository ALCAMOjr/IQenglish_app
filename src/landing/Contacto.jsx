import { Tooltip } from '@nextui-org/react'; // Importa Tooltip desde NextUI
import llamada from "../assets/llamada.png";
import whatsapp from "../assets/whatsapp.png";
import check from "../assets/marker.png";

function Contacto() {
    const telefono = "+5218180144572"; // Número de teléfono
    const ubicacionURL = "https://www.google.com/maps/place/IQ+English+Monterrey+Sur/@25.6664105,-100.2794679,17z/data=!3m1!4b1!4m6!3m5!1s0x8662bf8567e963bd:0x84ca661e31896d55!8m2!3d25.6664057!4d-100.276893!16s%2Fg%2F11q4bl0x8y?hl=es&entry=ttu";

    // Función para redirigir al usuario a la ubicación en Google Maps
    const irALocalizacion = () => {
        window.location.href = ubicacionURL;
    };


    // Función para realizar una llamada al número de teléfono
    const hacerLlamada = () => {
        window.location.href = `tel:${telefono}`;
    };

    // Función para enviar un mensaje por WhatsApp al número de teléfono
    const enviarMensaje = () => {
        window.location.href = `https://wa.me/${telefono}`;
    };

    return (
        <div className="h-24 w-full relative flex justify-center items-start">
            <div className="absolute bottom-7 left-10">
                <div className="flex">
                    {/* Envuelve cada imagen en un Tooltip */}
                    <Tooltip showArrow={true} color='default' content="Llamada">
                        <img src={llamada} alt="Llamada" className="h-6 w-6 mr-3 hover:shadow-md hover:opacity-50" onClick={hacerLlamada} />
                    </Tooltip>
                    <Tooltip showArrow={true} color='default' content="WhatsApp">
                        <img src={whatsapp} alt="WhatsApp" className="h-6 w-6 mr-3 hover:shadow-md hover:opacity-50" onClick={enviarMensaje} />
                    </Tooltip>
                    <Tooltip showArrow={true} color='default' content="Ubicación">
                        <img src={check} alt="Check" className="h-6 w-6 hover:shadow-md hover:opacity-50" onClick={irALocalizacion} />
                    </Tooltip>
                </div>
            </div>
        </div>
    );
}

export default Contacto;
