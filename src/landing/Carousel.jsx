import React, { useState, useEffect } from "react";
import { Card, CardHeader, Image } from "@nextui-org/react";
import { IconButton } from "@material-tailwind/react";
import { useTransition, animated, config } from 'react-spring';
import foto1 from "../assets/gala/foto1.jpg"
import foto2 from "../assets/gala/foto2.jpg"
import foto3 from "../assets/gala/foto3.jpg"
import foto4 from "../assets/gala/foto4.jpg"
import foto5 from "../assets/gala/foto5.jpg"
import foto6 from "../assets/gala/foto6.jpg"
import foto7 from "../assets/gala/foto7.jpg"
import foto8 from "../assets/gala/foto8.jpg"
import foto9 from "../assets/graduado1.jpeg"
import foto10 from "../assets/graduado2.jpeg"
import foto11 from "../assets/graduado3.jpeg"
import foto12 from "../assets/graduado4.jpeg"


export default function Carousel() {
  const [direction, setDirection] = useState('left');
  const [page, setPage] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(4); 
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const cards = [
    foto1,
    foto2,
    foto3,
    foto4,
    foto5,
    foto6,
    foto7,
    foto8,
    foto9, 
    foto10,
    foto11,
    foto12
  ];
  

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth > 1800) {
      setCardsPerPage(4);
    } else if (windowWidth > 1400) {
      setCardsPerPage(3);
    } else if (windowWidth > 1000) {
      setCardsPerPage(2);
    } else {
      setCardsPerPage(1);
    }
  }, [windowWidth]);

  const nextCard = () => {
    setDirection("right");
    setPage((page + 1) % Math.ceil(cards.length / cardsPerPage));
  };

  const prevCard = () => {
    setDirection("left");
    setPage((page - 1 + Math.ceil(cards.length / cardsPerPage)) % Math.ceil(cards.length / cardsPerPage));
  };

  const transitions = useTransition(page, {
    from: { opacity: 10, transform: direction === 'left' ? `translate3d(-${100 / cardsPerPage}%,0,0)` : `translate3d(${100 / cardsPerPage}%,0,0)` },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    update: { transform: 'translate3d(0%,0,0)' },
    config: config.molasses
  });

  return (
    <div className="relative mb-32 mt-24">
<div className="w-[80vw] mx-auto flex justify-center flex-col items-center">
  <h1 className="text-2xl font-bold tracking-tight text-primary sm:text-4xl font-popping text-center">
    Nuestro Gran Evento de Gala Azul y Oro
  </h1>
  <p className="mb-2 max-w-[600px] text-xl lg:text-2xl text-base text-dark dark:text-dark-4  font-normal text-center mt-4 mb-8" style={{ letterSpacing: '-0.01em' }}>Al terminar tu preparación. Reconocemos tu esfuerzo y dedicación en un evento de gala llamado Azul y Oro</p>
</div>




      <div className="flex justify-center px-8 mx-auto -mb-4 mt-15" style={{ height: '350px', maxWidth: '80%' }}>
        {transitions((style, i) => (
          <animated.div style={style} key={i} className="flex justify-center">
            {cards.slice(i * cardsPerPage, i * cardsPerPage + cardsPerPage).map((card, index) => (
              <Card className="mx-2 mt-4 mb-8 relative flex-shrink-0 xs:w-full sm:w-1/2 md:w-1/4" style={{ minWidth: '300px', width: `${100 / cardsPerPage}%`, height: '300px', maxHeight: '300px' }} key={index}>
                <CardHeader className="absolute z-1 top-1 flex-col !items-start">
                </CardHeader>
                <Image
                  isZoomed
                  removeWrapper
                  alt="Card background"
                  className="z-0 w-full h-full object-cover aspect-content"
                  src={card}
                />
              </Card>
            ))}
            {/* Push a la siguiente tarjeta si el número total de tarjetas es impar */}
            {(cards.length % cardsPerPage !== 0 && i === Math.floor(cards.length / cardsPerPage)) && 
              <Card className="mx-2 mt-4 mb-8 relative flex-shrink-0 xs:w-full sm:w-1/2 md:w-1/4" style={{ minWidth: '300px', width: `${100 / cardsPerPage}%`, height: '300px', maxHeight: '300px' }} key={'extra'}>
                <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                </CardHeader>
                <Image
                  isZoomed
                  removeWrapper
                  alt="Card background"
                  className="z-0 w-full h-full object-cover aspect-content"
                  src={cards[0]} // Aquí podrías cambiar por otra imagen si prefieres
                />
              </Card>
            }
          </animated.div>
        ))}
      </div>
      
      {/* Botones */}
      {windowWidth < 500 && (
        <>
          <div className="absolute -bottom-16 left-16 transform -translate-y-1/2">
            <IconButton
              variant="text"
              color="black"
              size="lg"
              onClick={nextCard}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
            </IconButton>
          </div>
          <div className="absolute -bottom-16 right-16 transform -translate-y-1/2">
            <IconButton
              variant="text"
              color="black"
              size="lg"
              onClick={prevCard}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </IconButton>
          </div>
        </>
      )}

      {windowWidth >= 500 && windowWidth < 680 && (
        <>
          <div className="absolute -bottom-10 left-72 transform -translate-y-1/2">
            <IconButton
              variant="text"
              color="black"
              size="lg"
              onClick={nextCard}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
            </IconButton>
          </div>
          <div className="absolute -bottom-10 right-32 transform -translate-y-1/2">
            <IconButton
              variant="text"
              color="black"
              size="lg"
              onClick={prevCard}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </IconButton>
          </div>
        </>
      )}

      {windowWidth > 680 && (
        <>
          <div className="absolute bottom-28 left-28 transform -translate-y-1/2">
            <IconButton
              variant="text"
              color="black"
              size="lg"
              onClick={nextCard}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
            </IconButton>
          </div>
          <div className="absolute bottom-28 right-28 transform -translate-y-1/2">
            <IconButton
              variant="text"
              color="black"
              size="lg"
              onClick={prevCard}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </IconButton>
          </div>
        </>
      )}
    </div>
  );
}
