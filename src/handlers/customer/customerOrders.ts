import { ProxyHandler } from '@/types/handler.types';

import { parametarizedQuery } from '../../db/dbQuery';
import { handleError } from '../../middleware/errorHandler';
import { successResponse } from '../../utils/apiGatewayResponse';

const customerOrders: ProxyHandler = async event => {
  try {
    const id = event.pathParameters?.id;

    const query = `SELECT orders.shipper, orders.freight, orders.orderDate FROM 
    orders
    LEFT JOIN customers ON orders.customerId  = customers.id 
    WHERE customers.id = ?
    ORDER BY orders.orderDate DESC`;

    const orders = await parametarizedQuery(query, id);

    return successResponse({
      body: {
        orders: orders,
      },
    });
  } catch (error) {
    return handleError(error);
  }
};

export const handler = customerOrders;
