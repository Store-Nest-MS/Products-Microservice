import { RpcException } from '@nestjs/microservices';
import { CUSTOM_MICROSERVICE_ERROR, is_valid_custom_error } from './validation';
import { HttpStatus } from '@nestjs/common';

export function throw_custom_ms_rpc_expection(err: any) {
  // Validate that the function receive a valid error object
  const { success, data } = is_valid_custom_error(err);
  if (!success) {
    const error: CUSTOM_MICROSERVICE_ERROR = {
      msg: 'Throwing and invalid error',
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    };
    throw new RpcException(error);
  }
  throw new RpcException(data);
}
