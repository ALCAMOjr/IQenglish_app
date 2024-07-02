// utils.js
export const updateTitle = (searchTerm) => {
    const keywordMap = {
      'escuela de ingles en monterrey': 'Escuela de Inglés en Monterrey - IQEnglish',
      'la mejor escuela de ingles en monterrey': 'La Mejor Escuela de Inglés en Monterrey - IQEnglish',
      'curso de ingles en monterrey': 'Curso de Inglés en Monterrey - IQEnglish',
      'practica de ingles en monterrey': 'Práctica de Inglés en Monterrey - IQEnglish'
    };
  
    const title = keywordMap[searchTerm.toLowerCase()] || 'IQEnglish Monterrey';
    document.title = title;
  };
  