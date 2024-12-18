import { Controller, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { ProductsService } from '@app/products/products.service';
import { PaginationDTO } from '@common/dtos/pagination';
import { CreateProductDto } from '@app/products/dto/create-product.dto';
import { UpdateProductDto } from '@app/products/dto/update-product.dto';

import DatabaseErrorFactorty from '@app/errors/DatabaseErrors';
import { PRODUCTS_MSG_PATTERNS } from '@app/const';
import { throw_custom_ms_rpc_expection } from '@common/utils';

// Use the throw_custom_ms_rpc_expection() to throw all the RPC exceptions in the coontrollers catch
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern(PRODUCTS_MSG_PATTERNS.CREATE_PRODUCT)
  async create(@Payload() createProductDto: CreateProductDto) {
    try {
      return await this.productsService.create(createProductDto);
    } catch (error) {
      const msg = new DatabaseErrorFactorty(error).getFriendlyMessage();
      throw_custom_ms_rpc_expection({
        msg,
        status: HttpStatus.BAD_REQUEST,
        meta: error,
      });
    }
  }

  @MessagePattern(PRODUCTS_MSG_PATTERNS.GET_ALL_PRODUCTS)
  async findAll(@Payload() pagination: PaginationDTO) {
    try {
      return await this.productsService.findAll(
        pagination.page,
        pagination.page_size,
      );
    } catch (error) {
      const msg = new DatabaseErrorFactorty(error).getFriendlyMessage();
      throw_custom_ms_rpc_expection({
        msg,
        status: HttpStatus.BAD_REQUEST,
        meta: error,
      });
    }
  }

  @MessagePattern(PRODUCTS_MSG_PATTERNS.GET_PRODUCT_BY_ID)
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

  @MessagePattern(PRODUCTS_MSG_PATTERNS.UPDATE_PRODUCT_BY_ID)
  async update(
    @Payload('id', ParseIntPipe) id: number,
    @Payload('product') updateProductDto: UpdateProductDto,
  ) {
    try {
      return await this.productsService.update(id, updateProductDto);
    } catch (error) {
      // It might be recived the errr throws by the findOne service (and RPC exception)
      // We need to handle that case
      const message = new DatabaseErrorFactorty(error).getFriendlyMessage();
      return throw_custom_ms_rpc_expection({
        msg: message,
        status: 400,
        meta: error,
      });
    }
  }

  @MessagePattern(PRODUCTS_MSG_PATTERNS.REMOVE_PRODUCT_BY_ID)
  async remove(@Payload('id', ParseIntPipe) id: number) {
    try {
      return id;
    } catch (error) {
      const msg = new DatabaseErrorFactorty(error).getFriendlyMessage();
      throw_custom_ms_rpc_expection({
        msg,
        status: HttpStatus.BAD_REQUEST,
        meta: error,
      });
    }
  }

  @MessagePattern(PRODUCTS_MSG_PATTERNS.VALIDATE_PRODUCT_EXIST)
  async validate_products_exist(ids: number[]) {
    try {
      const ids_array = Array.from(new Set(ids));
      return await this.productsService.validate_products_id(ids_array);
    } catch (error) {
      throw_custom_ms_rpc_expection({
        msg: error.message,
        status: HttpStatus.BAD_REQUEST,
        meta: error,
      });
    }
  }
}
