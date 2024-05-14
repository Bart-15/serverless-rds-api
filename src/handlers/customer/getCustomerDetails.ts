import { ProxyHandler } from '@/types/handler.types';

import { parametarizedQuery } from '../../db/dbQuery';
import { handleError } from '../../middleware/errorHandler';
import { successResponse } from '../../utils/apiGatewayResponse';

const getCustomerDetails: ProxyHandler = async event => {
  try {
    const id = event.pathParameters?.id;

    const query = `SELECT * FROM customers WHERE id = ?`;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const customer = (await parametarizedQuery(query, id)) as any[];

    return successResponse({
      body: {
        customer: customer.length > 0 ? customer[0] : {},
      },
    });
  } catch (error) {
    return handleError(error);
  }
};

export const handler = getCustomerDetails;
