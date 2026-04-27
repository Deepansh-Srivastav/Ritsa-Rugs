import { useState, useCallback } from 'react';
import './Toast.scss';

const toastQueue = [];
let toastId = 0;

export const useToast = () => {
    const [toasts, setToasts] = useState([]);

    const show = useCallback((message, type = 'info', duration = 3000) => {
        const id = toastId++;
        const toast = { id, message, type };

        setToasts((prev) => [...prev, toast]);

        if (duration > 0) {
            setTimeout(() => {
                setToasts((prev) => prev.filter((t) => t.id !== id));
            }, duration);
        }

        return id;
    }, []);

    const remove = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const success = useCallback((message, duration) => {
        return show(message, 'success', duration);
    }, [show]);

    const error = useCallback((message, duration) => {
        return show(message, 'error', duration);
    }, [show]);

    const warning = useCallback((message, duration) => {
        return show(message, 'warning', duration);
    }, [show]);

    const info = useCallback((message, duration) => {
        return show(message, 'info', duration);
    }, [show]);

    return { toasts, show, remove, success, error, warning, info };
};

export const ToastContainer = ({ toasts, onRemove }) => {
    return (
        <div className="toast-container">
            {toasts.map((toast) => (
                <Toast
                    key={toast.id}
                    {...toast}
                    onClose={() => onRemove(toast.id)}
                />
            ))}
        </div>
    );
};

const Toast = ({ id, message, type, onClose }) => {
    return (
        <div className={`toast toast--${type}`}>
            <p className="toast__message">{message}</p>
            <button className="toast__close" onClick={onClose}>
                ✕
            </button>
        </div>
    );
};
