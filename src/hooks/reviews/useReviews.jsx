import { useState, useEffect, useCallback } from 'react';
import createReview from "../../views/reviews/createReview.js";
import getReviews from '../../views/reviews/getReviews.js';

export default function useReviews() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
        getReviews()
            .then(data => {
                setReviews(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });
    }, []);
  
    const createNewReview = useCallback(async ({ puntuacion, titulo, description, nombre }) => {
        try {
            const newReview = await createReview({ puntuacion, titulo, description, nombre });
    
            setReviews(prevReviews => [newReview.review, ...prevReviews]);

            return { success: true, data: newReview }; // Devuelve un indicador de éxito y los datos del nuevo review
        } catch (err) {
            console.error(err);
            return { success: false, error: err }; // Devuelve un indicador de error
        }
    }, []);
  
    return { reviews, loading, error, createNewReview, setReviews };
}
