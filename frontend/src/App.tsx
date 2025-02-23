import { Routes, Route } from 'react-router-dom';
import { ProductList } from './pages/ProductList';
import { ProductFormPage } from './pages/ProductForm';
import { ProductDetail } from './pages/ProductDetail';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/products/create" element={<ProductFormPage />} />
      <Route path="/products/edit/:id" element={<ProductFormPage />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
} 