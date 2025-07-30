import { useState, useEffect } from 'react';
import useReviews from '../hooks/reviews/useReviews';
import StarRatings from 'react-rating-stars-component';
import { toast } from 'react-toastify';
import { IconButton } from "@material-tailwind/react";
import { Pagination } from "@nextui-org/pagination";
import { useTransition, animated, config } from 'react-spring';
import check from "../../src/assets/check.png"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea } from "@nextui-org/react";

const Reviews = () => {
  const [name, setName] = useState({ value: '', completed: false });
  const [title, setTitle] = useState({ value: '', completed: false });
  const [comment, setComment] = useState({ value: '', completed: false });
  const [rating, setRating] = useState({ value: '', completed: false });
  const [isLoading, setIsLoading] = useState(false);
  const [nameError, setNameError] = useState('');
  const [titleError, setTitleError] = useState('');
  const [commentError, setCommentError] = useState('');
  const [ratingError, setRatingError] = useState('');
  const { createNewReview, reviews } = useReviews();
  const [startIndex, setStartIndex] = useState(0); // Índice del primer comentario mostrado en la página actual
  const [direction, setDirection] = useState(0); // 0 para adelante, 1 para atrás
  const [currentReviews, setCurrentReviews] = useState([]);
  const [reviewsLoaded, setReviewsLoaded] = useState(false);
  const [TotalPage, setTotalPage] = useState(0)
  const [currentPage, setCurrentPage] = useState(1);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const reviewsPerPage = 3;



  // Actualiza el estado de la página actual al cambiar de página
  const handleNextReview = () => {
    setDirection(0);
    if (startIndex + reviewsPerPage < reviews.length) {
      setStartIndex(startIndex => startIndex + 3);
      setCurrentPage(currentPage => currentPage + 1); // Incrementa la página actual
    } else {
      setStartIndex(0); // Vuelve al principio si estás en el último comentario
      setCurrentPage(1); // Reinicia la página actual
    }
  };

  const handlePrevReview = () => {
    setDirection(1);
    if (startIndex > 0) {
      setStartIndex(startIndex => startIndex - 3);
      setCurrentPage(currentPage => currentPage - 1); // Decrementa la página actual
    } else {
      setStartIndex(reviews.length - reviewsPerPage); // Vuelve al último comentario si estás en el primero
      setCurrentPage(Math.ceil(reviews.length / reviewsPerPage)); // Establece la página actual como la última
    }
  };


  const handlePageChange = (newPage) => {
    setCurrentPage(newPage); // Actualiza la página actual
    setStartIndex((newPage - 1) * reviewsPerPage); // Actualiza el índice de inicio basado en la nueva página
  };


  useEffect(() => {
    // Verifica si las revisiones están cargadas
    if (Array.isArray(reviews) && reviews.length) {
      const newCurrentReviews = reviews.slice(startIndex, startIndex + reviewsPerPage);
      setCurrentReviews(newCurrentReviews);
      // Calcula el total de páginas
      setTotalPage(Math.ceil(reviews.length / reviewsPerPage));
      // Marcamos que las revisiones están cargadas
      setReviewsLoaded(true);
    }
  }, [reviews, startIndex, reviewsPerPage]);



  const transitions = useTransition(currentReviews, {
    from: { opacity: 0, transform: direction === 0 ? 'translate3d(100%,0,0)' : 'translate3d(-100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    config: config.molasses, // Añade esta línea
  });




  const handleNameChange = (event) => {
    const value = event.target.value;
    setName({ value: value, completed: !!value });
    if (value.length > 20) {
      setNameError('Se acepta un máximo de 20 caracteres.');
    } else {
      setNameError('');
    }
  };



  const handleTitleChange = (event) => {
    const value = event.target.value;
    setTitle({ value: value, completed: !!value });
    if (value.length > 100) {
      setTitleError('Se acepta un máximo de 60 caracteres.');
    } else {
      setTitleError('');
    }
  };

  const handleCommentChange = (event) => {
    const value = event.target.value;
    setComment({ value: value, completed: !!value });
    if (value.length > 250) {
      setCommentError('Se acepta un máximo de 250 caracteres.');
    } else {
      setCommentError('');
    }
  };

  const ratingChanged = (newRating) => {
    setRating({ value: newRating, completed: !!newRating });
    setRatingError(''); // Limpiar el error cuando se seleccione una calificación
  };

  const openModal = () => {
    onOpen()
    setStartIndex(0);
    setCurrentPage(1);
  };

  const closeModal = () => {
    onClose()
    setName('')
    setTitle('')
    setComment('')
    setRating('')
  }


  const handleSubmit = async () => {


    if (!name.completed || !title.completed || !comment.completed || !rating.completed) {
      // Establecer errores para campos vacíos
      setNameError(name.completed ? '' : 'Este campo es obligatorio');
      setTitleError(title.completed ? '' : 'Este campo es obligatorio');
      setCommentError(comment.completed ? '' : 'Este campo es obligatorio');
      setRatingError(rating.completed ? '' : 'Este campo es obligatorio');
      return;
    }

    setIsLoading(true);

    try {
      const result = await createNewReview({
        puntuacion: rating.value,
        titulo: title.value,
        description: comment.value,
        nombre: name.value
      });

      if (result.success) {
        toast.info('¡El comentario se creó exitosamente!', {
          icon: () => <img src={check} alt="Success Icon" />, // Usar el icono check importado
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          progressStyle: {
            background: '#1D4ED8', // Color de la barra de progreso (azul oscuro)
          }

        });
        setName('')
        setTitle('')
        setComment('')
        setRating('')
      } else if (result.error) {
        toast.error('¡Algo mal sucedio al crear el comentario intenta de nuevo!.')
      }
    } catch (error) {
      console.error(error)
      toast.error('¡Algo mal sucedio al crear el comentario intenta de nuevo!.')
    } finally {
      setIsLoading(false);
      onClose()
    }


  };




  return (
    <section className="bg-[#F0F4F9]">
      <div className="mx-auto max-w-screen-2xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="md:flex md:items-end md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-4xl font-bold tracking-tight text-rose-600 sm:text-5xl font-popping">
              Lo que nuestros estudiantes dicen de nosotros.
            </h2>
          </div>

          <button
            onClick={openModal}
            className="mt-6 inline-flex shrink-0 items-center gap-2 rounded-full border border-rose-600 px-5 py-3 text-primary transition hover:bg-rose-600 hover:text-white md:mt-0"
          >
            <span className="font-popping">Añade un comentario...</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4 rtl:rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>



        <div className="mt-8 buttom-10 grid grid-cols-1 gap-4 md:grid-cols-3 relative mb-20 z-1 ">
          {transitions((props, item) => (
            <animated.blockquote style={props} className="flex h-full flex-col justify-between bg-white p-6 shadow-sm sm:p-8 min-h-[500px] rounded-xl ">
              <div>
                <div className="flex gap-0.5 text-yellow-500">
                  <StarRatings
                    count={item.puntuacion}
                    value={item.puntuacion}
                    size={24}
                    activeColor="#ffd700"
                  />
                </div>

                <div className="mt-4">
                  <p className="text-2xl font-bold text-rose-600 sm:text-3xl font-montserrat">{item.titulo}</p>
                  <p className="mt-4 leading-relaxed text-gray-700 font-montserrat">{item.description}</p>
                </div>
              </div>

              <footer className="mt-4 text-sm font-medium text-gray-700 sm:mt-6 font-montserrat">
                — {item.nombre}
              </footer>
            </animated.blockquote>
          ))}




          <div className="absolute -bottom-12 right-0 space-x-4">
            <IconButton
              onClick={handlePrevReview}
              variant="text"
              color="black"
              size="lg"
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

            <IconButton
              onClick={handleNextReview}
              variant="text"
              color="black"
              size="lg"
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
          {reviewsLoaded && TotalPage > 0 && (
            <div className="pagination-container absolute -bottom-20 right-100 mb-8 mr-4">
              <Pagination active initialPage={1} total={TotalPage} page={currentPage} color='primary' onChange={handlePageChange} /> {/* Agrega la función handlePageChange a onChange */}
            </div>
          )}
        </div>

        {/* Modal */}
        <Modal
          isOpen={isOpen}
          placement="top-center"
          onOpenChange={onOpenChange}
          backdrop="opaque"
        >
          <ModalContent>

            <ModalHeader className="flex flex-col text-primary gap-1 font-montserrat">Añadir Comentario</ModalHeader>
            <ModalBody>
              <Input
                label="Nombre"
                value={name.value}
                onChange={handleNameChange}
                placeholder="Tu nombre"
                required // Campo requerido
              />
              {nameError && <p className="text-red-500 text-xs mt-1 font-montserrat">{nameError}</p>}
              <Input
                label="Titulo"
                value={title.value}
                onChange={handleTitleChange}
                placeholder="Titulo de el comentario"
                required // Campo requerido
              />
              {titleError && <p className="text-red-500 text-xs mt-1 font-montserrat">{titleError}</p>}
              <Textarea
                value={comment.value}
                onChange={handleCommentChange}
                label="Description"
                placeholder="Tu comentario"
                required // Campo requerido
                style={{ width: "400px" }} // Ajusta el ancho aquí según tus necesidades
              />
              {commentError && <p className="text-red-500 text-xs mt-1 font-montserrat">{commentError}</p>}
              <p className="-mb-3 font-semibold">¿Cuántas estrellas le darías a IQenglish?</p>
              <StarRatings
                count={5}
                onChange={ratingChanged}
                size={24}
                activeColor="#ffd700"
              />
              {ratingError && <p className="text-red-500 text-xs mt-1 font-montserrat">{ratingError}</p>}
            </ModalBody>
            <ModalFooter>
              <Button color="primary" variant="light" onPress={closeModal}>
                Close
              </Button>
              <Button color="primary" onPress={handleSubmit}>
                {isLoading ? (
                  <div role="status">
                    <svg aria-hidden="true" className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="white" />
                    </svg>
                    <span className="sr-only font-montserrat">Enviando...</span>
                  </div>
                ) : (
                  'Crear'
                )}
              </Button>

            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </section>
  );
};

export default Reviews;
