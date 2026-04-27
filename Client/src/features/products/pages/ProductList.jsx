import { useState } from 'react';
import { SkeletonGrid } from '@/components/ui';

const ProductList = () => {
    const [loading] = useState(false);

    return (
        <div className="page-wrapper">
            <h1>All Rugs</h1>
            {loading ? <SkeletonGrid count={12} /> : <p>Products will load here</p>}
        </div>
    );
};

export default ProductList;
