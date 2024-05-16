import { deleteData, parametarizedQuery } from '../../db/dbQuery';
import { handleError, HttpError } from '../../middleware/errorHandler';
import { ProxyHandler } from '../../types/handler.types';
import { successResponse } from '../../utils/apiGatewayResponse';
import { createProductPayload } from '../../validation/products.validation';

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

    const queryDelete = `DELETE FROM products WHERE id = ?`;

    await deleteData(queryDelete, [product[0]?.id]);

    return successResponse({
      body: {
        message: 'Product successfully deleted',
      },
    });
  } catch (error) {
    return handleError(error);
  }
};

export const handler = updateProduct;
