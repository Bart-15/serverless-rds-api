import { Event } from '@/types/handler.types';

import { paginatedQuery, simpleQuery } from '../../db/dbQuery';
import { handleError } from '../../middleware/errorHandler';
import { successResponse } from '../../utils/apiGatewayResponse';
const getCustomers = async (event: Event) => {
  try {
    const params = event.queryStringParameters;
    const dataCount = (await simpleQuery(`SELECT COUNT(*) as total FROM customers`)) as {
      total: number;
    }[];

    const totalCount = dataCount[0].total;
    // get all the data if theres no params
    if (!params) {
      const query = `SELECT employees.firstName, employees.lastName, customers.companyName, customers.country
      FROM employees 
      LEFT JOIN customers ON customers.employeeId = employees.id`;

      const customers = await simpleQuery(query);
      return successResponse({
        body: {
          customers: customers,
          totalCount,
        },
      });
    }

    const page = parseInt(params?.page || '1');
    const itemsPerPage = parseInt(params?.itemsPerPage || '10');
    const totalPages = Math.ceil(totalCount / itemsPerPage);

    const query = `SELECT employees.firstName, employees.lastName, customers.companyName, customers.country
    FROM employees 
    LEFT JOIN employees ON customers.employeeId = employees.id 
    LIMIT ?
    OFFSET ?`;

    const paginatedData = await paginatedQuery(query, page, itemsPerPage);

    return successResponse({
      body: {
        customers: paginatedData,
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

export const handler = getCustomers;
