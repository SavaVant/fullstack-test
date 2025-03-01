import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { FileUploadService } from './file-upload.service';
import { IProductService } from '../interfaces/product.service.interface';
import {
  PRODUCTS_DEFAULT_LIMIT,
  PRODUCTS_DEFAULT_PAGE,
} from '../constants/product.constants';

@Injectable()
export class ProductsService implements IProductService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly fileUploadService: FileUploadService,
  ) {}

  private generateArticleNumber(): string {
    return Array.from({ length: 10 }, () =>
      Math.floor(Math.random() * 10),
    ).join('');
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const product = this.productRepository.create({
        ...createProductDto,
        articleNumber: this.generateArticleNumber(),
      });
      return await this.productRepository.save(product);
    } catch (error) {
      this.logger.error(`Failed to create product: ${error.message}`);
      throw error;
    }
  }

  async findAll(
    page = PRODUCTS_DEFAULT_PAGE,
    limit = PRODUCTS_DEFAULT_LIMIT,
    sort = 'id',
    order: 'ASC' | 'DESC' = 'DESC',
    filter?: Record<string, any>,
  ) {
    try {
      const skip = (page - 1) * limit;
      const query = this.productRepository.createQueryBuilder('product');

      if (filter) {
        if (filter.name) {
          query.andWhere('LOWER(product.name) LIKE LOWER(:name)', {
            name: `%${filter.name}%`,
          });
        }
        
        if (filter.priceMin !== undefined) {
          query.andWhere('product.price >= :priceMin', {
            priceMin: filter.priceMin,
          });
        }
        
        if (filter.priceMax !== undefined) {
          query.andWhere('product.price <= :priceMax', {
            priceMax: filter.priceMax,
          });
        }
      }

      query.orderBy(`product.${sort}`, order);
      query.skip(skip);
      query.take(limit);

      const [items, total] = await query.getManyAndCount();

      return {
        items,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      this.logger.error(`Failed to fetch products: ${error.message}`);
      throw error;
    }
  }

  async findOne(id: number): Promise<Product> {
    try {
      const product = await this.productRepository.findOne({ where: { id } });
      if (!product) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
      return product;
    } catch (error) {
      this.logger.error(`Failed to find product: ${error.message}`);
      throw error;
    }
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    try {
      const product = await this.findOne(id);
      Object.assign(product, updateProductDto);
      return await this.productRepository.save(product);
    } catch (error) {
      this.logger.error(`Failed to update product: ${error.message}`);
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const result = await this.productRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
    } catch (error) {
      this.logger.error(`Failed to remove product: ${error.message}`);
      throw error;
    }
  }

  async uploadImage(id: number, file: Express.Multer.File): Promise<Product> {
    try {
      const product = await this.findOne(id);

      if (product.imageUrl) {
        await this.fileUploadService.deleteFile(product.imageUrl);
      }

      const fileName = this.fileUploadService.saveFile(file);

      product.imageUrl = fileName;
      return await this.productRepository.save(product);
    } catch (error) {
      this.logger.error(`Failed to upload image: ${error.message}`);
      throw error;
    }
  }

  async deleteImage(id: number): Promise<Product> {
    try {
      const product = await this.findOne(id);

      if (product.imageUrl) {
        await this.fileUploadService.deleteFile(product.imageUrl);
        product.imageUrl = null;
        return await this.productRepository.save(product);
      }

      return product;
    } catch (error) {
      this.logger.error(`Failed to delete image: ${error.message}`);
      throw error;
    }
  }
}

