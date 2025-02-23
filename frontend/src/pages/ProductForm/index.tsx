import React from 'react';
import { ProductForm } from '../../components/ProductForm';
import { useParams } from 'react-router-dom';

export const ProductFormPage: React.FC = () => {
  const { id } = useParams();
  return <ProductForm mode={id ? 'edit' : 'create'} />;
}; 