import { useContext, useState, useEffect, useCallback } from 'react';
import Context from '../../context/advisor.context.jsx';
import getProspects from "../../views/prospects/getProspects.js"
import { deleteProspects, updateProspects } from "../../views/prospects/optional.js";

export default function useProspects() {
    const { jwt } = useContext(Context);
    const [prospects, setProspects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      if (jwt && jwt !== "" && jwt !== "null") {
        getProspects({ token: jwt })
          .then(data => {
            setProspects(data);
            setLoading(false);
          })
          .catch(err => {
            setError(err);
            setLoading(false);
          });
       }
    }, []);  [jwt] 
  
    const deleteProspect = useCallback(async (id) => {
      try {
          const responseStatus = await deleteProspects({id, token: jwt});
          if (responseStatus === 204) {
              setProspects(prevProspects => prevProspects.filter(prospect => prospect.id !== id.id));
          }
          return { success: responseStatus === 204 }; // Devuelve un indicador de éxito
      } catch (err) {
          console.error(err);
          return { success: false, error: err }; // Devuelve un indicador de error
      }
  }, [jwt]);
  
    
    const updateProspect = useCallback(async ({ id, name, lastname, email, phone_number, age, address }) => {
      try {
        const updatedProspect = await updateProspects({ id, name, lastname, email, phone_number, age, address, token: jwt });
        setProspects(prevProspects => prevProspects.map(prospect => prospect.id === id ? updatedProspect : prospect));
        return { success: true, data: updatedProspect }; // Devuelve un indicador de éxito y los datos actualizados
      } catch (err) {
        console.error(err);
        return { success: false, error: err }; // Devuelve un indicador de error
      }
    }, [jwt]);
    
  
    return { prospects, loading, error, deleteProspect, updateProspect, setProspects };
}
