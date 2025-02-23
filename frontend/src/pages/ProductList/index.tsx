import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { message, Row, Col } from 'antd';
import { productsApi } from '../../api/products';
import { useNavigate } from 'react-router-dom';
import { useStyles } from './style';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { ProductGrid } from '../../components/ProductGrid';

type SortOrder = 'ASC' | 'DESC';

interface SortConfig {
  field: string;
  order: SortOrder;
}

interface Filter {
  priceMin?: number;
  priceMax?: number;
}

export const ProductList: React.FC = () => {
  const { styles } = useStyles();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const [searchText, setSearchText] = useState('');
  const [currentFilters, setCurrentFilters] = useState<Filter>({});
  const [tempFilters, setTempFilters] = useState<Filter>({});
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sort, setSort] = useState<SortConfig>({ field: 'id', order: 'DESC' });
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['products', page, pageSize, searchText, currentFilters, sort],
    queryFn: () => productsApi.getAll({
      page,
      limit: pageSize,
      sort: sort.field,
      order: sort.order,
      filter: {
        ...(searchText ? { name: searchText } : {}),
        ...(currentFilters.priceMin !== undefined ? { priceMin: currentFilters.priceMin } : {}),
        ...(currentFilters.priceMax !== undefined ? { priceMax: currentFilters.priceMax } : {})
      }
    })
  });

  const handleDelete = async (id: number) => {
    try {
      setLoadingId(id);
      await productsApi.delete(id);
      await queryClient.invalidateQueries({ queryKey: ['products'] });
      message.success('Товар успешно удален');
    } catch (error) {
      message.error('Ошибка при удалении товара');
    } finally {
      setLoadingId(null);
    }
  };

  const handleSort = (value: string) => {
    switch (value) {
      case 'price_asc':
        setSort({ field: 'price', order: 'ASC' });
        break;
      case 'price_desc':
        setSort({ field: 'price', order: 'DESC' });
        break;
      case 'name_asc':
        setSort({ field: 'name', order: 'ASC' });
        break;
      case 'name_desc':
        setSort({ field: 'name', order: 'DESC' });
        break;
      case 'newest':
        setSort({ field: 'id', order: 'DESC' });
        break;
      case 'oldest':
        setSort({ field: 'id', order: 'ASC' });
        break;
      default:
        setSort({ field: 'id', order: 'DESC' });
    }
  };

  const handlePriceChange = (type: 'min' | 'max', value: number | null) => {
    setTempFilters((prev) => ({
      ...prev,
      [type === 'min' ? 'priceMin' : 'priceMax']: value ?? undefined
    }));
  };

  const handleApplyFilters = () => {
    setCurrentFilters(tempFilters);
    setPage(1);
  };

  const handleResetFilters = () => {
    setTempFilters({});
    setCurrentFilters({});
    setPage(1);
  };

  return (
    <div className={styles.container}>
      <Header onAddProduct={() => navigate('/products/create')} />
      <Row gutter={24}>
        <Col xs={24} sm={24} md={6} lg={6} xl={5}>
          <Sidebar
            onSearch={setSearchText}
            onSort={handleSort}
            onPriceChange={handlePriceChange}
            onApplyFilters={handleApplyFilters}
            onResetFilters={handleResetFilters}
            tempFilters={tempFilters}
            currentFilters={currentFilters}
          />
        </Col>
        <Col xs={24} sm={24} md={18} lg={18} xl={19}>
          <ProductGrid
            items={data?.items || []}
            total={data?.total || 0}
            loading={isLoading}
            page={page}
            pageSize={pageSize}
            onPageChange={(newPage, newPageSize) => {
              if (newPageSize !== pageSize) {
                setPageSize(newPageSize);
                setPage(1);
              } else {
                setPage(newPage);
              }
            }}
            onEdit={(id) => navigate(`/products/edit/${id}`)}
            onDelete={handleDelete}
            loadingId={loadingId}
            searchText={searchText}
          />
        </Col>
      </Row>
    </div>
  );
}; 