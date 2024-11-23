import { CUSTOM_MICROSERVICE_ERROR } from './../../../client_gateway_ms/src/common/validation';
import {
  BadRequestException,
  Controller,
  HttpStatus,
  ParseIntPipe,
  UseFilters,
} from '@nestjs/common';
import { ProductsService } from './products.service';

import { PaginationDTO } from 'src/common/dtos';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { CreateProductDto } from './dto/create-product.dto';
import DatabaseErrorFactorty from '@app/errors/DatabaseErrors';
import { throw_custom_ms_rpc_expection } from '@common/utils';
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern({ cmd: 'create_product' })
  async create(@Payload() createProductDto: CreateProductDto) {
    try {
      return await this.productsService.create(createProductDto);
    } catch (error) {
      const message = new DatabaseErrorFactorty(error).getFriendlyMessage();
      throw new RpcException(message);
    }
  }

  @MessagePattern({ cmd: 'get_all_products' })
  async findAll(@Payload() pagination: PaginationDTO) {
    try {
      return await this.productsService.findAll(
        pagination.page,
        pagination.page_size,
      );
    } catch (error) {
      throw new RpcException('Error while fetching all products');
    }
  }

  @MessagePattern({ cmd: 'get_product_by_id' })
  async findOne(@Payload('id', ParseIntPipe) id: number) {
    try {
      return await this.productsService.findOne(id);
    } catch (error) {
      return throw_custom_ms_rpc_expection({
        msg: `Product ${id} not found`,
        status: 404,
      });
    }
  }

  // update(
  //   @Payload('id', ParseIntPipe) id: number,
  //   @Payload() updateProductDto: UpdateProductDto,
  // ) {
  //   return this.productsService.update(id, updateProductDto);
  // }

  // remove(@Payload('id', ParseIntPipe) id: number) {
  //   return this.productsService.remove(id);
  // }
}
