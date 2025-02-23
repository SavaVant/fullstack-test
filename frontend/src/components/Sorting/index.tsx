import React from 'react';
import { Select, Typography, Divider } from 'antd';
import { useStyles } from './style';

const { Title } = Typography;
const { Option } = Select;

interface SortingProps {
  onSort: (value: string) => void;
}

export const Sorting: React.FC<SortingProps> = ({ onSort }) => {
  const { styles } = useStyles();

  return (
    <>
      <Divider />
      <div className={styles.sortingSection}>
        <Title level={5}>Сортировка</Title>
        <Select defaultValue="newest" style={{ width: '100%' }} onChange={onSort}>
          <Option value="newest">Сначала новые</Option>
          <Option value="oldest">Сначала старые</Option>
          <Option value="price_asc">Цена: по возрастанию</Option>
          <Option value="price_desc">Цена: по убыванию</Option>
          <Option value="name_asc">Название: А-Я</Option>
          <Option value="name_desc">Название: Я-А</Option>
        </Select>
      </div>
    </>
  );
}; 