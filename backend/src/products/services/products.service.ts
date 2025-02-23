import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { FileUploadService } from './file-upload.service';
import { IProductService } from '../interfaces/product.service.interface';

@Injectable()
export class ProductsService implements IProductService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    private fileUploadService: FileUploadService,
  ) {}

  private generateArticleNumber(): string {
    return Array.from({ length: 10 }, () =>
      Math.floor(Math.random() * 10),
    ).join('');
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const product = this.productsRepository.create({
        ...createProductDto,
        articleNumber: this.generateArticleNumber(),
      });
      return await this.productsRepository.save(product);
    } catch (error) {
      this.logger.error(`Failed to create product: ${error.message}`);
      throw error;
    }
  }

  async findAll(
    page = 1,
    limit = 10,
    sort?: string,
    order?: 'ASC' | 'DESC',
    filter?: any,
  ) {
    try {
      const query = this.productsRepository.createQueryBuilder('product');
      let hasWhereCondition = false;

      if (filter?.name) {
        const filterNameTrim = filter.name;
        query.where('LOWER(product.name) LIKE LOWER(:name)', {
          name: `%${filter?.name?.trim()}%`,
        });
        hasWhereCondition = true;
      }

      if (filter?.priceMin !== undefined) {
        const condition = 'product.price >= :priceMin';
        if (hasWhereCondition) {
          query.andWhere(condition, { priceMin: Number(filter.priceMin) });
        } else {
          query.where(condition, { priceMin: Number(filter.priceMin) });
        }
        hasWhereCondition = true;
      }

      if (filter?.priceMax !== undefined) {
        const condition = 'product.price <= :priceMax';
        if (hasWhereCondition) {
          query.andWhere(condition, { priceMin: Number(filter.priceMin) });
        } else {
          query.where(condition, { priceMin: Number(filter.priceMin) });
        }
      }

      if (sort) {
        query.orderBy(`product.${sort}`, order || 'ASC');
      }

      query.skip((page - 1) * limit).take(limit);

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
      const product = await this.productsRepository.findOne({ where: { id } });
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
      return await this.productsRepository.save(product);
    } catch (error) {
      this.logger.error(`Failed to update product: ${error.message}`);
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const result = await this.productsRepository.delete(id);
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
      return await this.productsRepository.save(product);
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
        return await this.productsRepository.save(product);
      }

      return product;
    } catch (error) {
      this.logger.error(`Failed to delete image: ${error.message}`);
      throw error;
    }
  }
}
