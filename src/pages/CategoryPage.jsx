import React from 'react';
import { useParams } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';

const CategoryPage = () => {
  const { categoryId } = useParams();

  return (
    <div>
      <ProductGrid categoryId={categoryId} />
    </div>
  );
};

export default CategoryPage;
