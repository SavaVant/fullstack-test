import React from 'react';
import { Card } from 'antd';
import { Search } from '../Search';
import { Sorting } from '../Sorting';
import { Filters } from '../Filters';
import { useStyles } from './style';

interface SidebarProps {
  onSearch: (value: string) => void;
  onSort: (value: string) => void;
  onPriceChange: (type: 'min' | 'max', value: number | null) => void;
  onApplyFilters: () => void;
  onResetFilters: () => void;
  tempFilters: {
    priceMin?: number;
    priceMax?: number;
  };
  currentFilters: {
    priceMin?: number;
    priceMax?: number;
  };
}

export const Sidebar: React.FC<SidebarProps> = (props) => {
  const { styles } = useStyles();

  return (
    <Card className={styles.sidebar}>
      <Search onSearch={props.onSearch} />
      <Sorting onSort={props.onSort} />
      <Filters {...props} />
    </Card>
  );
}; 