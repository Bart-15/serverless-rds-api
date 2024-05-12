import { parametarizedQuery } from '../../db/dbQuery';
import { handleError, HttpError } from '../../middleware/errorHandler';
import { ProxyHandler } from '../../types/handler.types';
import { successResponse } from '../../utils/apiGatewayResponse';
import { createEmployeePayload } from '../../validation/employee.validation';

type TEmployee = {
  id?: number;
} & createEmployeePayload;

const getEmployee: ProxyHandler = async event => {
  try {
    const id = event.pathParameters?.id;

    const queryEmployee = `SELECT * FROM employees WHERE id = ?`;
    const employee = (await parametarizedQuery(queryEmployee, id)) as TEmployee[];

    if (!employee.length) {
      throw new HttpError(404, {
        message: 'Employee not found',
      });
    }

    return successResponse({
      body: {
        employee: employee[0],
      },
    });
  } catch (error) {
    return handleError(error);
  }
};

export const handler = getEmployee;
