import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Typography, Spin, message } from 'antd';
import { productsApi } from '../../api/products';
import { Product } from '../../types/product';
import { useStyles } from './style';
import {API_URL} from "../../api/config.ts";

const { Title, Paragraph } = Typography;

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { styles } = useStyles();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productsApi.getById(Number(id));
        setProduct(response);
      } catch (error) {
        message.error('Ошибка при загрузке товара');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <Spin tip="Загрузка товара..." />;
  }

  if (!product) {
    return <div>Товар не найден</div>;
  }

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <div className={styles.imageContainer}>
          <img
            alt={product.name}
            src={`${API_URL}/uploads/${product.imageUrl}`}
            className={styles.productImage}
          />
        </div>
        <Title level={2}>{product.name}</Title>
        <Paragraph>{product.description || 'Описание отсутствует'}</Paragraph>
        <Paragraph strong>
          Цена: {product.price.toLocaleString()} ₽
          {product.discountPrice && (
            <span style={{ textDecoration: 'line-through', marginLeft: 8 }}>
              {product.discountPrice.toLocaleString()} ₽
            </span>
          )}
        </Paragraph>
        <Paragraph>Артикул: {product.articleNumber}</Paragraph>
      </Card>
    </div>
  );
};
