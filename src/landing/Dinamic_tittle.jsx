// DynamicTitle.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const DynamicTitle = ({ defaultTitle }) => {
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get('search');
    
    const keywordMap = {
        'mejor curso de inglés online' : 'Clases de Inglés Online IQ English Monterrey',
        'mejores cursos de ingles online' : 'Clases de Inglés Online IQ English Monterrey',
        'cursos de ingles virtuales' : 'Clases de Inglés Online IQ English Monterrey',
        'clases de ingles presenciales monterrey' : 'Curso de Inglés Intensivo IQ English Monterrey',
        'manera facil de aprender ingles' : 'Curso de Inglés Intensivo IQ English Monterrey',
        'escuelas presenciales de ingles en monterrey' : 'Curso de Inglés Intensivo IQ English Monterrey',
        'curso de ingles rapido y facil' : 'Curso de Inglés Intensivo IQ English Monterrey',
        'escuelas de ingles buenas monterrey' : 'Curso de Inglés Para Jovenes IQ English Monterrey'
    };

    const title = keywordMap[searchTerm?.toLowerCase()] || defaultTitle;
    document.title = title;
  }, [location, defaultTitle]);

  return null;
};

export default DynamicTitle;
