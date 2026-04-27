import './Loader.scss';

export const Loader = ({ size = 'md', className = '' }) => {
    return <div className={`loader loader--${size} ${className}`}></div>;
};

export const SkeletonCard = () => {
    return (
        <div className="skeleton-card">
            <div className="skeleton-card__image"></div>
            <div className="skeleton-card__title"></div>
            <div className="skeleton-card__text"></div>
            <div className="skeleton-card__price"></div>
        </div>
    );
};

export const SkeletonGrid = ({ count = 4 }) => {
    return (
        <div className="skeleton-grid">
            {Array.from({ length: count }).map((_, i) => (
                <SkeletonCard key={i} />
            ))}
        </div>
    );
};

export const Spinner = ({ fullScreen = false }) => {
    return (
        <div className={`spinner-container ${fullScreen ? 'spinner-container--fullscreen' : ''}`}>
            <div className="spinner"></div>
        </div>
    );
};
