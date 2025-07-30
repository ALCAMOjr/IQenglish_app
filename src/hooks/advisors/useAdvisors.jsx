import { useContext, useState, useEffect, useCallback } from 'react';
import Context from '../../context/advisor.context.jsx';
import getAllAdvisors from "../../views/advisors/getAvisors.js"
import { deleteAdvisors, updateAdvisors } from "../../views/advisors/optional.js";
import register from '../../views/advisors/register.js';

export default function useAdvisors() {
    const { jwt } = useContext(Context);
    const [advisors, setAdvisors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      if (jwt && jwt !== "" && jwt !== "null") {
        getAllAdvisors({ token: jwt })
          .then(data => {
            setAdvisors(data);
            setLoading(false);
          })
          .catch(err => {
            setError(err);
            setLoading(false);
          });
      }
    }, [jwt]);
  
    const deleteAdvisor = useCallback(async (id) => {
      try {
          const responseStatus = await deleteAdvisors({ id, token: jwt });
          if (responseStatus === 204) {
              setAdvisors(prevAdvisors => prevAdvisors.filter(advisor => advisor.id !== id));
          }
          return { success: responseStatus === 204 }; // Devuelve un indicador de éxito
      } catch (err) {
          console.error(err);
          return { success: false, error: err }; // Devuelve un indicador de error
      }
  }, [jwt]);
  
  
  const updateAdvisor = useCallback(async ({ id, username, password, userType }) => {
      try {
          const updatedAdvisor = await updateAdvisors({ id, username, password, userType, token: jwt });
          setAdvisors(prevAdvisors => prevAdvisors.map(advisor => advisor.id === id ? updatedAdvisor : advisor));
          return { success: true, data: updatedAdvisor }; // Devuelve un indicador de éxito y los datos actualizados
      } catch (err) {
          console.error(err);
          return { success: false, error: err }; // Devuelve un indicador de error
      }
  }, [jwt]);

  const registerNewAdvisor = useCallback(async ({ username, password, userType }) => {
    try {
        const newAdvisor = await register({ username, password, userType, token: jwt });
        setAdvisors(prevAdvisors => [...prevAdvisors, newAdvisor]);
        return { success: true, data: newAdvisor };
    } catch (error) {
        if (error.response && error.response.status === 400 && error.response.data.error === 'Username already exists') {
            // El error es que el nombre de usuario ya existe
            return { success: false, error: 'El nombre de usuario ya existe' };
        } else {
            // Otro tipo de error
            console.error(error);
            return { success: false, error: 'Error al crear el prospecto' };
        }
    }
}, [jwt]);



  
  return { advisors, loading, error, deleteAdvisor, updateAdvisor, registerNewAdvisor };
  
  }
  




  