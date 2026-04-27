import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
    const { orderId } = useParams();

    return (
        <div className="page-wrapper" style={{ textAlign: 'center' }}>
            <h1>Order Confirmed!</h1>
            <p>Your order {orderId} has been placed successfully</p>
            <Link to="/orders"><Button>View Orders</Button></Link>
        </div>
    );
};

export default OrderSuccess;
