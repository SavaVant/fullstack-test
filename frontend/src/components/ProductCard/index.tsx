import React, { useState } from 'react';
import { Card, Typography, Button, Modal, Tooltip, Space } from 'antd';
import { EditOutlined, DeleteOutlined, PictureOutlined, BarcodeOutlined } from '@ant-design/icons';
import { Product } from '../../types/product';
import { useStyles } from './style';
import { useNavigate } from 'react-router-dom';
import {API_URL} from "../../api/config.ts";

const { Text, Paragraph } = Typography;

interface ProductCardProps {
  product: Product;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  loading?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onEdit,
  onDelete,
  loading,
}) => {
  const { styles } = useStyles();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  const handleDelete = () => {
    onDelete(product.id);
    setIsModalVisible(false);
  };
  const onProductDetails = () => navigate(`/products/${product.id}`)

  return (
    <Card
      className={styles.card}
      cover={
        product.imageUrl ? (
          <div className={styles.imageContainer} onClick={onProductDetails}>
            <img
              alt={product.name}
              src={`${API_URL}/uploads/${product.imageUrl}`}
              className={styles.productImage}
            />
          </div>
        ) : (
          <div className={styles.noImage} onClick={onProductDetails}>
            <PictureOutlined style={{ fontSize: 48 }} />
          </div>
        )
      }
      actions={[
        <Tooltip title="Редактировать" key="edit">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              onEdit(product.id);
            }}
          />
        </Tooltip>,
        <Tooltip title="Удалить" key="delete">
        <Button
          key="delete"
          type="text"
          danger
          icon={<DeleteOutlined />}
          loading={loading}
          onClick={(e) => {
            e.stopPropagation();
            setIsModalVisible(true);
          }}
        />
      </Tooltip>
      ]}
    >
      <Modal
        title="Удалить товар?"
        open={isModalVisible}
        onOk={handleDelete}
        okText="Удалить"
        cancelText="Отменить"
        onCancel={() => setIsModalVisible(false)}
      >
        <p>Это действие нельзя отменить.</p>
      </Modal>
      <div className={styles.productInfo} onClick={onProductDetails}>
        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          <Text strong>{product.name}</Text>
          <Paragraph
            type="secondary"
            ellipsis={{ rows: 2, expandable: true, symbol: 'ещё' }}
            className={styles.description}
          >
            {product.description || 'Описание отсутствует'}
          </Paragraph>
          <div className={styles.priceContainer}>
            <Text className={styles.price}>
              {product.price.toLocaleString()} ₽
            </Text>
            {product.discountPrice && (
              <Text className={styles.oldPrice}>
                {product.discountPrice.toLocaleString()} ₽
              </Text>
            )}
          </div>
          <Space className={styles.articleNumber}>
            <BarcodeOutlined />
            <Text type="secondary" className={styles.articleNumberText}>
              Артикул: {product.articleNumber}
            </Text>
          </Space>
        </Space>
      </div>
    </Card>
  );
};
