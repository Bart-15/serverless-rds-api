import { insertData } from '../../db/dbQuery';
import { handleError } from '../../middleware/errorHandler';
import validateResource from '../../middleware/validateResource';
import { ProxyHandler } from '../../types/handler.types';
import { successResponse } from '../../utils/apiGatewayResponse';
import {
  createEmployeePayload,
  createEmployeeValidationSchema,
} from '../../validation/employee.validation';

const createEmployee: ProxyHandler = async event => {
  try {
    const reqBody = JSON.parse(event.body as string) as createEmployeePayload;

    validateResource(createEmployeeValidationSchema, reqBody);

    const query = `INSERT INTO employees (firstName, lastName, dept) VALUES (?, ?, ?)`;

    await insertData(query, [reqBody.firstName, reqBody.lastName, reqBody.dept]);

    return successResponse({
      body: {
        message: 'Employee successfully created',
      },
    });
  } catch (error) {
    return handleError(error);
  }
};

export const handler = createEmployee;
