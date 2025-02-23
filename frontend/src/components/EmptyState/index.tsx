import React from 'react';
import { Empty, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useStyles } from './style';

interface EmptyStateProps {
  isSearchActive?: boolean;
  searchText?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ isSearchActive, searchText }) => {
  const { styles } = useStyles();
  const navigate = useNavigate();

  const getEmptyDescription = () => {
    if (isSearchActive) {
      return `По запросу «${searchText}» ничего не найдено`;
    }
    return 'Товары не найдены';
  };

  return (
    <div className={styles.container}>
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={getEmptyDescription()}
      >
        {!isSearchActive && (
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={() => navigate('/products/create')}
          >
            Добавить первый товар
          </Button>
        )}
      </Empty>
    </div>
  );
}; 