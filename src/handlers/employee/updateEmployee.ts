import { parametarizedQuery, updateData } from '../../db/dbQuery';
import { handleError, HttpError } from '../../middleware/errorHandler';
import validateResource from '../../middleware/validateResource';
import { ProxyHandler } from '../../types/handler.types';
import { successResponse } from '../../utils/apiGatewayResponse';
import {
  createEmployeePayload,
  createEmployeeValidationSchema,
} from '../../validation/employee.validation';

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

    const reqBody = JSON.parse(event.body as string) as createEmployeePayload;

    validateResource(createEmployeeValidationSchema, reqBody);

    const queryUpdate = `UPDATE employees SET firstName = ?, lastName = ?, dept = ? WHERE id = ?`;

    await updateData(queryUpdate, [
      reqBody.firstName,
      reqBody.lastName,
      reqBody.dept,
      employee[0]?.id,
    ]);

    return successResponse({
      body: {
        message: 'Employee successfully updated',
      },
    });
  } catch (error) {
    return handleError(error);
  }
};

export const handler = updateEmployee;
