import React from 'react';
import { Button, Typography, Divider, Slider } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import { useStyles } from './style';

const { Title } = Typography;

interface FiltersProps {
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

export const Filters: React.FC<FiltersProps> = ({
  onPriceChange,
  onApplyFilters,
  onResetFilters,
  tempFilters,
  currentFilters
}) => {
  const { styles } = useStyles();

  const isFiltersChanged =
    tempFilters.priceMin !== currentFilters.priceMin ||
    tempFilters.priceMax !== currentFilters.priceMax;
  const isReset = currentFilters?.priceMin || currentFilters?.priceMax;

  return (
    <>
      <div className={styles.filterSection}>
        <Title level={5}>Цена</Title>
        <Slider
          range
          min={0}
          max={150000}
          step={1000}
          value={[tempFilters.priceMin || 0, tempFilters.priceMax || 150000]}
          onChange={(values) => {
            if (Array.isArray(values)) {
              onPriceChange('min', values[0]);
              onPriceChange('max', values[1]);
            }
          }}
          className={styles.priceSlider}
          tooltip={{
            formatter: (value) => `${value?.toLocaleString()} ₽`
          }}
        />
      </div>

      <Divider />

      <div className={styles.filterActions}>
        <Button
          type="primary"
          block
          onClick={onApplyFilters}
          icon={<FilterOutlined />}
          disabled={!isFiltersChanged}

        >
          Применить фильтры
        </Button>
        <Button
          block
          onClick={onResetFilters}
          className={styles.resetButton}
          disabled={!isReset && !isFiltersChanged}
        >
          Сбросить фильтры
        </Button>
      </div>
    </>
  );
};
