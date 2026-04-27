import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui';
import { Link } from 'react-router-dom';

const Cart = () => {
    const items = useCartStore((state) => state.items);

    if (items.length === 0) {
        return (
            <div className="page-wrapper">
                <h1>Shopping Cart</h1>
                <p>Your cart is empty</p>
                <Link to="/products"><Button>Continue Shopping</Button></Link>
            </div>
        );
    }

    return (
        <div className="page-wrapper">
            <h1>Shopping Cart ({items.length} items)</h1>
            <Link to="/checkout"><Button>Proceed to Checkout</Button></Link>
        </div>
    );
};

export default Cart;
