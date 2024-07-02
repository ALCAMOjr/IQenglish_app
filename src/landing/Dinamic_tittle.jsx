// DynamicTitle.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const DynamicTitle = ({ defaultTitle }) => {
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get('search');
    
    const keywordMap = {
      'escuela de ingles en monterrey': 'Escuela de Inglés en Monterrey - IQEnglish',
      'la mejor escuela de ingles en monterrey': 'La Mejor Escuela de Inglés en Monterrey - IQEnglish',
      'curso de ingles en monterrey': 'Curso de Inglés en Monterrey - IQEnglish',
      'practica de ingles en monterrey': 'Práctica de Inglés en Monterrey - IQEnglish'
    };

    const title = keywordMap[searchTerm?.toLowerCase()] || defaultTitle;
    document.title = title;
  }, [location, defaultTitle]);

  return null;
};

export default DynamicTitle;
