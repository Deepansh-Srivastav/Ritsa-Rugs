import { useParams } from 'react-router-dom';
import { Spinner } from '@/components/ui';

const ProductDetails = () => {
    const { id } = useParams();

    return (
        <div className="page-wrapper">
            <h1>Product Details - {id}</h1>
            <Spinner fullScreen={false} />
        </div>
    );
};

export default ProductDetails;
