/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { connection } from './dbConnection';

export const paginatedQuery = async (query: string, page: number, itemsPerPage: number) => {
  const offset = (itemsPerPage - 1) * page;

  return new Promise((resolve, reject) => {
    connection.query(query, [itemsPerPage, offset], (error, results, fields) => {
      if (error) {
        console.error(`Error:`, error);
        reject(error);
        return;
      }

      resolve(results);
    });
  });
};

export const simpleQuery = async (query: string) => {
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results, fields) => {
      if (error) {
        console.error(`Error: `, error);
        reject(error);
        return;
      }

      resolve(results);
    });
  });
};

export const parametarizedQuery = async (query: string, values: any) => {
  return new Promise((resolve, reject) => {
    connection.query(query, values, (error, results, fields) => {
      if (error) {
        console.error(`Error: `, error);
        reject(error);
        return;
      }

      resolve(results);
    });
  });
};

export const insertData = async (query: string, values: any) => {
  return new Promise((resolve, reject) => {
    connection.query(query, values, (error, results, fields) => {
      if (error) {
        console.error(`Error: `, error);
        reject(error);
        return;
      }

      resolve(results);
    });
  });
};

export const updateData = async (query: string, values: any) => {
  return new Promise((resolve, reject) => {
    connection.query(query, values, (error, results, fields) => {
      if (error) {
        console.error(`Error: `, error);
        reject(error);
        return;
      }

      resolve(results);
    });
  });
};

export const deleteData = async (query: string, values: any) => {
  return new Promise((resolve, reject) => {
    connection.query(query, values, (error, results, fields) => {
      if (error) {
        console.error(`Error: `, error);
        reject(error);
        return;
      }

      resolve(results);
    });
  });
};
