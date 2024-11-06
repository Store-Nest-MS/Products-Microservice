import { Prisma } from '@prisma/client';
export const is_not_deleted: Prisma.ProductWhereInput = { isDeleted: false };
export const products_omit_fileds: Prisma.ProductOmit = { isDeleted: true }; //Fileds to omit in ever return of the query
