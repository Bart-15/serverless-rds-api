import { Event } from '@/types/handler.types';

import { paginatedQuery, simpleQuery } from '../../db/dbQuery';
import { handleError } from '../../middleware/errorHandler';
import { successResponse } from '../../utils/apiGatewayResponse';
const getEmployees = async (event: Event) => {
  try {
    const params = event.queryStringParameters;
    const dataCount = (await simpleQuery(`SELECT COUNT(*) as total FROM employees`)) as {
      total: number;
    }[];

    const totalCount = dataCount[0].total;
    // get all the data if theres no params
    if (!params) {
      const query = `SELECT * FROM employees`;

      const employees = await simpleQuery(query);
      return successResponse({
        body: {
          employees: employees,
          totalCount,
        },
      });
    }

    const page = parseInt(params?.page || '1');
    const itemsPerPage = parseInt(params?.itemsPerPage || '10');
    const totalPages = Math.ceil(totalCount / itemsPerPage);

    const query = `SELECT *
    FROM employees
    LIMIT ?
    OFFSET ?`;

    const paginatedData = await paginatedQuery(query, page, itemsPerPage);

    return successResponse({
      body: {
        employees: paginatedData,
        totalCount,
        itemsPerPage,
        totalPages,
        currentPage: page,
      },
    });
  } catch (error) {
    return handleError(error);
  }
};

export const handler = getEmployees;
