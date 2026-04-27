import './Input.scss';

export const Input = ({
    label,
    error,
    touched,
    type = 'text',
    placeholder,
    value,
    onChange,
    onBlur,
    disabled = false,
    required = false,
    className = '',
    ...props
}) => {
    const hasError = error && touched;

    return (
        <div className={`input-group ${hasError ? 'input-group--error' : ''}`}>
            {label && (
                <label className="input-group__label">
                    {label}
                    {required && <span className="input-group__required">*</span>}
                </label>
            )}
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                disabled={disabled}
                className={`input-group__input ${className}`}
                {...props}
            />
            {hasError && <span className="input-group__error">{error}</span>}
        </div>
    );
};
