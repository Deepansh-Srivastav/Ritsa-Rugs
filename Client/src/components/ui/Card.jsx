import './Card.scss';

export const Card = ({
    children,
    className = '',
    onClick,
    elevated = false,
    hoverable = false,
    ...props
}) => {
    return (
        <div
            className={`card ${elevated ? 'card--elevated' : ''} ${hoverable ? 'card--hoverable' : ''} ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </div>
    );
};
