import './Button.scss';

export const Button = ({
    children,
    onClick,
    disabled = false,
    type = 'button',
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    loading = false,
    className = '',
    ...props
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`btn btn--${variant} btn--${size} ${fullWidth ? 'btn--full' : ''} ${className}`}
            {...props}
        >
            {loading ? <span className="btn__loader">Loading...</span> : children}
        </button>
    );
};
