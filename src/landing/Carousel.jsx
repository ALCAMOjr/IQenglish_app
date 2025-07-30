import React, { useState, useEffect } from "react";
import { Card, CardHeader, Image } from "@nextui-org/react";
import foto1 from "../assets/gala/foto1.jpg";
import foto2 from "../assets/gala/foto2.jpg";
import foto3 from "../assets/gala/foto3.jpg";
import foto4 from "../assets/gala/foto4.jpg";
import foto5 from "../assets/gala/foto5.jpg";
import foto6 from "../assets/gala/foto6.jpg";
import foto7 from "../assets/gala/foto7.jpg";
import foto8 from "../assets/gala/foto8.jpg";
import foto9 from "../assets/graduado1.jpeg";
import foto10 from "../assets/graduado2.jpeg";
import foto11 from "../assets/graduado3.jpeg";
import foto12 from "../assets/graduado4.jpeg";

export default function Carousel() {
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
    if (windowWidth > 1300) {
      setCardsPerPage(4);
    } else if (windowWidth > 800) {
      setCardsPerPage(3);
    } else if (windowWidth > 500) {
      setCardsPerPage(2);
    } else {
      setCardsPerPage(1);
    }
  }, [windowWidth]);

  const nextCard = () => {
    setPage((page + 1) % Math.ceil(cards.length / cardsPerPage));
  };

  const prevCard = () => {
    setPage((page - 1 + Math.ceil(cards.length / cardsPerPage)) % Math.ceil(cards.length / cardsPerPage));
  };

  return (
    <div className="relative mb-32 mt-24 bg-white">
      <div className="w-[80vw] mx-auto flex justify-center flex-col items-center">
        <h1 className="text-2xl font-bold tracking-tight text-primary sm:text-4xl font-popping text-center">
          Nuestro Gran Evento de Gala Azul y Oro
        </h1>
        <p className="mb-2 max-w-[600px] text-xl lg:text-2xl text-base text-dark dark:text-dark-4 font-normal text-center mt-4" style={{ letterSpacing: '-0.01em' }}>
          Al terminar tu preparación. Reconocemos tu esfuerzo y dedicación en un evento de gala llamado Azul y Oro
        </p>
      </div>

      <div className="overflow-hidden relative mx-auto" style={{ height: '350px', maxWidth: '80%' }}>
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${page * (100 / cardsPerPage)}%)` }}
        >
          {cards.map((card, index) => (
            <div
              key={index}
              className="flex-shrink-0"
              style={{ width: `${100 / cardsPerPage}%`, minWidth: '300px' }}
            >
              <Card className="mx-2 mt-4 mb-8 relative flex-shrink-0" style={{ height: '300px', maxHeight: '300px' }}>
                <CardHeader className="absolute z-1 top-1 flex-col !items-start"></CardHeader>
                <Image
                  isZoomed
                  removeWrapper
                  alt="Card background"
                  className="z-0 w-full h-full object-cover aspect-content"
                  src={card}
                />
              </Card>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute top-2/2 transform -translate-y-1/2 right-8 flex space-x-2 mr-2">
        <button
          onClick={prevCard}
          className="bg-white text-black hover:bg-gray-200 p-2 rounded-[8px] shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={nextCard}
          className="bg-white text-black hover:bg-gray-200 p-2 rounded-[8px] shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
