import React from 'react';
import { Row, Col, Spin, Typography, Pagination } from 'antd';
import { ProductCard } from '../ProductCard';
import { EmptyState } from '../EmptyState';
import { Product } from '../../types/product';
import { useStyles } from './style';

const { Text } = Typography;

interface ProductGridProps {
  items: Product[];
  total: number;
  loading: boolean;
  page: number;
  pageSize: number;
  onPageChange: (page: number, pageSize: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  loadingId: number | null;
  searchText?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  items,
  total,
  loading,
  page,
  pageSize,
  onPageChange,
  onEdit,
  onDelete,
  loadingId,
  searchText
}) => {
  const { styles } = useStyles();

  if (loading) {
    return (
      <Spin tip="Загрузка товаров...">
        <div style={{ minHeight: 200 }} />
      </Spin>
    );
  }

  if (!items.length) {
    return <EmptyState isSearchActive={!!searchText} searchText={searchText} />;
  }

  return (
    <>
      <Text type="secondary" className={styles.totalCount}>
        Найдено товаров: {total}
      </Text>

      <Row gutter={[16, 16]} className={styles.cardGrid}>
        {items.map(product => (
          <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
            <ProductCard
              product={product}
              onEdit={onEdit}
              onDelete={onDelete}
              loading={loadingId === product.id}
            />
          </Col>
        ))}
      </Row>

      <div className={styles.pagination}>
        <Pagination
          current={page}
          total={total}
          pageSize={pageSize}
          showSizeChanger
          pageSizeOptions={['10', '50', '100']}
          onChange={onPageChange}
        />
      </div>
    </>
  );
};
