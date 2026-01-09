export default function AppError(message, status_code) {
    const error = new Error(message);
    error.statusCode = status_code;
    throw error;
};