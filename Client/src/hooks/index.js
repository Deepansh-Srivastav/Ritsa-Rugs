import { useState, useCallback, useEffect } from 'react';
import axiosInstance from '@/services/api/axiosInstance';
import { getErrorMessage } from '@/utils/helpers';

// Hook for API calls
export const useFetch = (url, options = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axiosInstance.get(url, options);
            setData(response.data);
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    }, [url, options]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const refetch = useCallback(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch };
};

// Hook for mutations (POST, PUT, DELETE)
export const useMutation = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const mutate = useCallback(
        async (method, url, payload = null) => {
            try {
                setLoading(true);
                setError(null);

                let response;
                if (method === 'POST') {
                    response = await axiosInstance.post(url, payload);
                } else if (method === 'PUT') {
                    response = await axiosInstance.put(url, payload);
                } else if (method === 'DELETE') {
                    response = await axiosInstance.delete(url);
                } else if (method === 'PATCH') {
                    response = await axiosInstance.patch(url, payload);
                }

                return response.data;
            } catch (err) {
                const errorMessage = getErrorMessage(err);
                setError(errorMessage);
                throw err;
            } finally {
                setLoading(false);
            }
        },
        []
    );

    return { mutate, loading, error };
};

// Hook for form validation
export const useFormValidation = (initialValues, onSubmit, validate) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setValues({
            ...values,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched({ ...touched, [name]: true });

        if (validate) {
            const newErrors = validate({ ...values });
            setErrors(newErrors);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (validate) {
            const newErrors = validate(values);
            setErrors(newErrors);
            if (Object.keys(newErrors).length > 0) {
                setIsSubmitting(false);
                return;
            }
        }

        try {
            await onSubmit(values);
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        values,
        errors,
        touched,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        setValues,
        setErrors,
    };
};

// Hook for local storage
export const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return initialValue;
        }
    });

    const setValue = (value) => {
        try {
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error('Error writing to localStorage:', error);
        }
    };

    return [storedValue, setValue];
};

// Hook for debounced values
export const useDebouncedValue = (value, delay = 500) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
};

// Hook for media query
export const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }

        const listener = () => setMatches(media.matches);
        media.addEventListener('change', listener);

        return () => media.removeEventListener('change', listener);
    }, [matches, query]);

    return matches;
};

// Hook for outside click detection
export const useOutsideClick = (ref, callback) => {
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, callback]);
};
