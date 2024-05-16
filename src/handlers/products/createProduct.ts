import { insertData } from '../../db/dbQuery';
import { handleError } from '../../middleware/errorHandler';
import validateResource from '../../middleware/validateResource';
import { ProxyHandler } from '../../types/handler.types';
import { successResponse } from '../../utils/apiGatewayResponse';
import {
  createProductPayload,
  createProductValidationSchema,
} from '../../validation/products.validation';

const createProduct: ProxyHandler = async event => {
  try {
    const reqBody = JSON.parse(event.body as string) as createProductPayload;

    validateResource(createProductValidationSchema, reqBody);

    const query = `INSERT INTO products (productName, category, unitPrice, unitsInStock, discontinued) VALUES (?, ?, ?, ?, ?)`;

    await insertData(query, [
      reqBody.productName,
      reqBody.category,
      reqBody.unitPrice,
      reqBody.unitsInStock,
      reqBody.discontinued,
    ]);

    return successResponse({
      body: {
        message: 'Product successfully created',
      },
    });
  } catch (error) {
    return handleError(error);
  }
};

export const handler = createProduct;
