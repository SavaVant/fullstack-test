import React from 'react';
import { Button, Typography } from 'antd';
import { PlusOutlined, ShopOutlined } from '@ant-design/icons';
import { useStyles } from './style';

const { Title } = Typography;

interface HeaderProps {
  onAddProduct: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onAddProduct }) => {
  const { styles } = useStyles();

  return (
    <div className={styles.header}>
      <div className={styles.headerTitle}>
        <ShopOutlined className={styles.headerIcon} />
        <Title level={4} style={{ margin: 0 }}>Каталог товаров</Title>
      </div>
      <Button 
        type="primary" 
        icon={<PlusOutlined />} 
        onClick={onAddProduct}
        size="large"
      >
        Добавить товар
      </Button>
    </div>
  );
}; 