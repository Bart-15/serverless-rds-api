import { ProxyHandler } from '@/types/handler.types';

import { simpleQuery } from '../../db/dbQuery';
import { handleError } from '../../middleware/errorHandler';
import { successResponse } from '../../utils/apiGatewayResponse';

const getDistinctCountry: ProxyHandler = async event => {
  try {
    const query = `SELECT country, COUNT(employeeId) AS employee_count
    FROM customers
    GROUP BY country
    ORDER BY employee_count DESC`;

    const countries = await simpleQuery(query);

    return successResponse({
      body: {
        countries: countries,
      },
    });
  } catch (error) {
    return handleError(error);
  }
};

export const handler = getDistinctCountry;
