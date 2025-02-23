import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Upload, Button, message, Typography } from 'antd';
import { PictureOutlined, LoadingOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { productsApi } from '../../api/products';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import { useStyles } from './style';
import {API_URL} from "../../api/config.ts";

const { Title } = Typography;

const MAX_PRICE = 1_000_000_000;

const productSchema = z.object({
  name: z.string().min(1, 'Название обязательно'),
  description: z.string().min(1, 'Описание обязательно'),
  price: z.number().min(0, 'Цена должна быть положительной'),
  discountPrice: z.number().min(0).optional(),
});

interface ProductFormProps {
  mode: 'create' | 'edit';
}

export const ProductForm: React.FC<ProductFormProps> = ({ mode }) => {
  const { styles } = useStyles();
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const { data: product } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productsApi.getById(Number(id)),
    enabled: mode === 'edit' && !!id,
  });

  useEffect(() => {
    if (product && mode === 'edit') {
      form.setFieldsValue({
        ...product,
        price: Number(product.price),
        discountPrice: product.discountPrice ? Number(product.discountPrice) : undefined,
      });
    }
  }, [product, mode, form]);

  useEffect(() => {
    if (product?.imageUrl) {
      setImageUrl(`${API_URL}/uploads/${product.imageUrl}`);
    }
  }, [product]);

  const mutation = useMutation({
    mutationFn: async (values: any) => {
      const productData = {
        ...values,
        price: Number(values.price),
        discountPrice: values.discountPrice ? Number(values.discountPrice) : null,
      };

      let result;
      if (mode === 'create') {
        result = await productsApi.create(productData);
      } else {
        result = await productsApi.update(Number(id), productData);
      }

      if (file) {
        const formData = new FormData();
        formData.append('image', file);
        return await productsApi.uploadImage(result.id, formData);
      }
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      message.success(`Товар успешно ${mode === 'create' ? 'создан' : 'обновлен'}`);
      navigate('/');
    },
    onError: () => {
      message.error('Произошла ошибка');
    },
  });

  const handleSubmit = async (values: any) => {
    try {
      productSchema.parse(values);
      await mutation.mutateAsync(values);
    } catch (error) {
      if (error instanceof z.ZodError) {
        message.error('Проверьте правильность заполнения полей');
      }
    }
  };

  const handleUploadChange = (info: any) => {
    const file = info.file.originFileObj || info.file;

    if (!file) {
      console.error('No file received');
      return;
    }

    setLoading(true);
    setFile(file);

    try {
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result as string);
        setLoading(false);
      };
      reader.onerror = () => {
        message.error('Ошибка при чтении файла');
        setLoading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error reading file:', error);
      setLoading(false);
    }
  };

  const validatePrice = (_: any, value: number) => {
    if (value > MAX_PRICE) {
      return Promise.reject('Цена не может превышать 1 миллиард');
    }
    return Promise.resolve();
  };

  const validateDiscountPrice = (_: any, value: number) => {
    if (!value) return Promise.resolve();

    if (value > MAX_PRICE) {
      return Promise.reject('Цена не может превышать 1 миллиард');
    }

    const price = form.getFieldValue('price');
    if (price && value >= price) {
      return Promise.reject('Цена со скидкой должна быть меньше обычной цены');
    }

    return Promise.resolve();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title level={2} className={styles.title}>
          {mode === 'create' ? 'Создание товара' : 'Редактирование товара'}
        </Title>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className={styles.form}
      >
        <Form.Item
          name="name"
          label="Название"
          rules={[{ required: true, message: 'Введите название' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label="Описание"
          rules={[{ required: true, message: 'Введите описание' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="Цена"
          name="price"
          rules={[
            { required: true, message: 'Введите цену товара' },
            { type: 'number', min: 0, message: 'Цена не может быть отрицательной' },
            { validator: validatePrice }
          ]}
        >
          <InputNumber
            placeholder="Введите цену"
            style={{ width: '100%' }}
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
            parser={(value) => Number(value!.replace(/\s/g, ''))}
            onChange={() => {
              form.validateFields(['discountPrice']);
            }}
          />
        </Form.Item>

        <Form.Item
          label="Цена со скидкой"
          name="discountPrice"
          rules={[
            { type: 'number', min: 0, message: 'Цена не может быть отрицательной' },
            { validator: validateDiscountPrice }
          ]}
        >
          <InputNumber
            placeholder="Введите цену со скидкой"
            style={{ width: '100%' }}
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
            parser={(value) => Number(value!.replace(/\s/g, ''))}
          />
        </Form.Item>

        <Form.Item
          name="image"
          label="Изображение товара"
          extra="Поддерживаются форматы: JPG, PNG, GIF. Максимальный размер: 5MB"
        >
          <div className={styles.uploadContainer}>
            <Upload
              accept="image/*"
              maxCount={1}
              showUploadList={false}
              customRequest={({ onSuccess }: any) => {
                setTimeout(() => {
                  onSuccess("ok");
                }, 0);
              }}
              onChange={handleUploadChange}
              listType="picture-card"
            >
              {imageUrl ? (
                <div className={styles.previewContainer}>
                  <img src={imageUrl} alt="preview" className={styles.preview} />
                  <div className={styles.previewOverlay}>
                    <PictureOutlined />
                    <span>Изменить</span>
                  </div>
                </div>
              ) : (
                <div className={styles.uploadButton}>
                  {loading ? <LoadingOutlined /> : <PictureOutlined />}
                  <div style={{ marginTop: 8 }}>
                    {loading ? 'Загрузка...' : 'Нажмите или перетащите файл'}
                  </div>
                </div>
              )}
            </Upload>
          </div>
        </Form.Item>

        <div className={styles.buttonGroup}>
          <Button onClick={() => navigate('/')}>
            Отмена
          </Button>
          <Button type="primary" htmlType="submit" loading={mutation.isPending}>
            {mode === 'create' ? 'Создать' : 'Сохранить'}
          </Button>
        </div>
      </Form>
    </div>
  );
};
