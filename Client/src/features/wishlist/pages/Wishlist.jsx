import { useWishlistStore } from '@/store/wishlistStore';
import { Button } from '@/components/ui';
import { Link } from 'react-router-dom';

const Wishlist = () => {
    const items = useWishlistStore((state) => state.items);

    if (items.length === 0) {
        return (
            <div className="page-wrapper">
                <h1>My Wishlist</h1>
                <p>Your wishlist is empty</p>
                <Link to="/products"><Button>Browse Rugs</Button></Link>
            </div>
        );
    }

    return (
        <div className="page-wrapper">
            <h1>My Wishlist ({items.length} items)</h1>
            <p>Your saved items appear here</p>
        </div>
    );
};

export default Wishlist;
