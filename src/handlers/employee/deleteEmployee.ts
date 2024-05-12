import { deleteData, parametarizedQuery } from '../../db/dbQuery';
import { handleError, HttpError } from '../../middleware/errorHandler';
import { ProxyHandler } from '../../types/handler.types';
import { successResponse } from '../../utils/apiGatewayResponse';
import { createEmployeePayload } from '../../validation/employee.validation';

type TEmployee = {
  id?: number;
} & createEmployeePayload;

const updateEmployee: ProxyHandler = async event => {
  try {
    const id = event.pathParameters?.id;

    const queryEmployee = `SELECT * FROM employees WHERE id = ?`;
    const employee = (await parametarizedQuery(queryEmployee, id)) as TEmployee[];

    if (!employee.length) {
      throw new HttpError(404, {
        message: 'Employee not found',
      });
    }

    const queryDelete = `DELETE FROM employees WHERE id = ?`;

    await deleteData(queryDelete, [employee[0]?.id]);

    return successResponse({
      body: {
        message: 'Employee successfully deleted',
      },
    });
  } catch (error) {
    return handleError(error);
  }
};

export const handler = updateEmployee;
