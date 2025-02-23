import React from 'react';
import { Input, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useStyles } from './style';

const { Title } = Typography;

interface SearchProps {
  onSearch: (value: string) => void;
}

export const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const { styles } = useStyles();

  return (
    <div className={styles.searchSection}>
      <Title level={5}>Поиск</Title>
      <Input.Search
        placeholder="Поиск по названию"
        allowClear
        enterButton={<SearchOutlined />}
        onSearch={(value) => onSearch(value.trim())}
        onChange={(e) => {
          if (!e.target.value.trim()) {
            onSearch('');
          }
        }}
        className={styles.searchInput}
      />
    </div>
  );
}; 