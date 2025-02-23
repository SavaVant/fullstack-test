import axios from 'axios';
import { Product, ProductsResponse } from '../types/product';
import {API_URL} from "./config.ts";

interface Filter {
  name?: string;
  priceMin?: number;
  priceMax?: number;
}

export const productsApi = {
  getAll: async (params: {
    page?: number;
    limit?: number;
    sort?: string;
    order?: 'ASC' | 'DESC';
    filter?: Filter;
  }): Promise<ProductsResponse> => {
    const { filter, ...rest } = params;
    const queryParams = {
      ...rest,
      filter: filter ? JSON.stringify(filter) : undefined
    };
    const { data } = await axios.get(`${API_URL}/products`, { params: queryParams });
    return data;
  },

  getById: async (id: number): Promise<Product> => {
    const { data } = await axios.get(`${API_URL}/products/${id}`);
    return data;
  },

  create: async (product: Partial<Product>): Promise<Product> => {
    const { data } = await axios.post(`${API_URL}/products`, product);
    return data;
  },

  update: async (id: number, product: Partial<Product>): Promise<Product> => {
    const { data } = await axios.patch(`${API_URL}/products/${id}`, product);
    return data;
  },

  delete: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/products/${id}`);
  },

  uploadImage: async (id: number, formData: FormData): Promise<Product> => {
    const { data } = await axios.post(`${API_URL}/products/upload/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return data;
  },

  deleteImage: async (id: number): Promise<Product> => {
    const { data } = await axios.delete(`${API_URL}/products/${id}/image`);
    return data;
  },
};
