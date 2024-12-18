import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prima.service';
import { ProductsArrayDto } from './dto/seedProducts';
import { PaginatedResponse } from 'src/common/types';
import { Product } from './entities/product.entity';
import {
  is_not_deleted,
  products_omit_fileds,
} from 'src/common/queries/notDeleted';
import { Prisma } from '@prisma/client';
import { readFile } from 'fs/promises';
import path from 'path';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}
  async create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: createProductDto,
    });
  }

  async createMany(seedProductsDTO: ProductsArrayDto) {
    return this.prisma.product.createManyAndReturn({
      data: seedProductsDTO.products,
    });
  }

  async findAll(
    page: number,
    page_size: number,
  ): Promise<PaginatedResponse<Omit<Product, 'isDeleted'>[]>> {
    //TODO: Mov this logic to a function that recives a model and the pagination data
    // The function will return the pagianated data of the model and the pagination data

    const skip = (page - 1) * page_size;
    const total_docs = await this.prisma.product.count({
      where: is_not_deleted,
    });
    const total_pages = total_docs / page_size;
    const data = await this.prisma.product.findMany({
      take: page_size,
      skip,
      orderBy: { name: 'asc' },
      omit: products_omit_fileds,
      where: is_not_deleted,
    });

    return {
      data,
      pagination: {
        current_page: page,
        total_docs,
        total_pages: Math.ceil(total_pages),
      },
    };
  }

  async findOne(id: number) {
    const match = await this.prisma.product.findUnique({ where: { id } });
    if (match) return match;

    throw new RpcException(`Product with id ${id} not found`);
  }

  async findOneMatch(filter: Partial<Prisma.ProductWhereInput>) {
    const match = await this.prisma.product.findFirst({
      where: { ...filter, ...is_not_deleted },
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.findOne(id);

    return this.prisma.product.update({
      data: updateProductDto,
      where: { id },
      omit: products_omit_fileds,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.product.update({
      data: { isDeleted: true },
      where: { id },
      omit: products_omit_fileds,
    });
  }

  async seed() {
    // Check if alredy exist data in the prorducts
    //  In case it doesn't exist
    // Read the json file and insert the data
    const data_path = path.join(process.cwd(), 'src/mock/products.mock.json');
    const string_data = await readFile(data_path, { encoding: 'utf-8' });
    const products = (await JSON.parse(string_data).products) || [];
    return this.prisma.product.createMany({
      data: products.map(({ name, price }) => ({ name, price })),
    });
  }

  async validate_products_id(ids: number[]) {
    const products = await this.prisma.product.findMany({
      where: {
        id: { in: ids },
      },
    });

    if (products.length === 0) {
      throw new RpcException('No products found');
    }

    return products;
  }
}
