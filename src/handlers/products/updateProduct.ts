import { parametarizedQuery, updateData } from '../../db/dbQuery';
import { handleError, HttpError } from '../../middleware/errorHandler';
import validateResource from '../../middleware/validateResource';
import { ProxyHandler } from '../../types/handler.types';
import { successResponse } from '../../utils/apiGatewayResponse';
import {
  createProductPayload,
  createProductValidationSchema,
} from '../../validation/products.validation';

type TProduct = {
  id?: number;
} & createProductPayload;

const updateProduct: ProxyHandler = async event => {
  try {
    const id = event.pathParameters?.id;

    const queryProduct = `SELECT * FROM products WHERE id = ?`;
    const product = (await parametarizedQuery(queryProduct, id)) as TProduct[];

    if (!product.length) {
      throw new HttpError(404, {
        message: 'Product not found',
      });
    }

    const reqBody = JSON.parse(event.body as string) as createProductPayload;

    validateResource(createProductValidationSchema, reqBody);

    const queryUpdate = `UPDATE products SET productName = ?, category = ?, unitPrice = ?, unitsInStock = ?, discontinued = ? WHERE id = ?`;

    await updateData(queryUpdate, [
      reqBody.productName,
      reqBody.category,
      reqBody.unitPrice,
      reqBody.unitsInStock,
      reqBody.discontinued,
      product[0]?.id,
    ]);

    return successResponse({
      body: {
        message: 'Product successfully updated',
      },
    });
  } catch (error) {
    return handleError(error);
  }
};

export const handler = updateProduct;
