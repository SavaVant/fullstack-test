import { Product } from '../entities/product.entity';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

export interface IProductService {
  create(createProductDto: CreateProductDto): Promise<Product>;
  findAll(
    page?: number,
    limit?: number,
    sort?: string,
    order?: 'ASC' | 'DESC',
    filter?: Record<string, any>,
  ): Promise<{
    items: Product[];
    total: number;
    page: number;
    totalPages: number;
  }>;
  findOne(id: number): Promise<Product>;
  update(id: number, updateProductDto: UpdateProductDto): Promise<Product>;
  remove(id: number): Promise<void>;
  uploadImage(id: number, file: Express.Multer.File): Promise<Product>;
  deleteImage(id: number): Promise<Product>;
}
