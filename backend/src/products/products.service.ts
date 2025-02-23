import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileUploadService } from './file-upload.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    private fileUploadService: FileUploadService,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productsRepository.create(createProductDto);
    return await this.productsRepository.save(product);
  }

  async findAll(
    page = 1,
    limit = 10,
    sort?: string,
    order?: 'ASC' | 'DESC',
    filter?: Record<string, any>,
  ) {
    const query = this.productsRepository.createQueryBuilder('product');

    if (filter) {
      Object.keys(filter).forEach((key) => {
        query.andWhere(`product.${key} LIKE :${key}`, {
          [key]: `%${filter[key]}%`,
        });
      });
    }

    if (sort) {
      query.orderBy(`product.${sort}`, order || 'ASC');
    }

    const [items, total] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      items,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.findOne(id);
    Object.assign(product, updateProductDto);
    return await this.productsRepository.save(product);
  }

  async remove(id: number): Promise<void> {
    const result = await this.productsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }

  async uploadImage(id: number, file: Express.Multer.File): Promise<Product> {
    const product = await this.findOne(id);

    // Удаляем старое изображение, если оно есть
    if (product.imageUrl) {
      await this.fileUploadService.deleteFile(product.imageUrl);
    }

    const fileName = await this.fileUploadService.saveFile(file);

    product.imageUrl = fileName;
    return await this.productsRepository.save(product);
  }

  async deleteImage(id: number): Promise<Product> {
    const product = await this.findOne(id);

    if (product.imageUrl) {
      await this.fileUploadService.deleteFile(product.imageUrl);
      product.imageUrl = null;
      return await this.productsRepository.save(product);
    }

    return product;
  }
}
