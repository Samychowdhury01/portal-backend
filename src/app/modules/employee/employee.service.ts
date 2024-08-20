/* eslint-disable @typescript-eslint/no-unused-vars */
import prisma from '../../utils/prisma';
import { TEmployee } from './employee.interface';

// create Employee
const createEmployeeIntoDB = async (payload: TEmployee) => {
  const isEmployeeExist = await prisma.employees.findUnique({
    where: {
      email: payload.email,
    },
  });
  if (isEmployeeExist) {
    throw new Error('Employee already exist');
  }
  const employee = await prisma.employees.create({
    data: payload,
  });
  return employee;
};

// get all Employees
const getEmployeesFromDB = async () => {
  const employees = await prisma.employees.findMany();
  return employees;
};

// get Employee by id
const getSingleEmployeeFromDB = async (id: number) => {
  const isEmployeeExist = await prisma.employees.findUnique({
    where: {
      id,
    },
  });
  if (!isEmployeeExist) {
    throw new Error('Employee not found');
  }
  return isEmployeeExist;
};

// update a specific Employee
const updateEmployeeFromDB = async (
  id: number,
  payload: Partial<TEmployee>,
) => {
  const employee = await prisma.employees.findUnique({
    where: { id },
  });
  if (!employee) {
    throw new Error(`Employee with id ${id} does not exist`);
  }
  const updatedEmployee = await prisma.employees.update({
    where: { id },
    data: payload,
  });
  
  return updatedEmployee;
};

// delete a specific Employee
const deleteEmployeeFromDB = async (id: number) => {
  const employee = await prisma.employees.findUnique({
    where: { id },
  });
  if (!employee) {
    throw new Error(`Employee with id ${id} does not exist`);
  }

  return await prisma.employees.delete({
    where: { id },
  });
};

export const EmployeeServices = {
  createEmployeeIntoDB,
  getEmployeesFromDB,
  getSingleEmployeeFromDB,
  updateEmployeeFromDB,
  deleteEmployeeFromDB,
};

//! For Raw queries
// import pool from '../../../server';
// import { TEmployee } from './employee.interface';

// // create Employee
// const createEmployeeIntoDB = async (payload: TEmployee) => {
//   const { firstName, lastName, email, jobTitle, departmentId } = payload;
//   const sql = `INSERT INTO app1.employees (first_name, last_name, email, job_title, department_id)
//                 VALUES ($1, $2, $3, $4, $5)
//                 RETURNING *`;
//   const result = await pool.query(sql, [
//     firstName,
//     lastName,
//     email,
//     jobTitle,
//     departmentId,
//   ]);
//   return result.rows[0];
// };

// // get all Employees
// const getEmployeesFromDB = async () => {
//   const sql = `
//   SELECT
//     e.first_name || ' ' || e.last_name AS full_name,
//     e.first_name,
//     e.last_name,
//     e.email,
//     e.job_title,
//     e.id,
//     d.id as department_id,
//     d.name AS department_name
//   FROM
//     app1.employees e
//   JOIN
//     app1.departments d
//   ON
//     e.department_id = d.id;

//     `;
//   const result = await pool.query(sql);
//   return result.rows;
// };

// // get Employee by id
// const getSingleEmployeeFromDB = async (id: number) => {
//   const selectSql = `SELECT * FROM app1.employees WHERE id = $1`;
//   const isExist = await pool.query(selectSql, [id]);
//   if (isExist.rows?.length === 0) {
//     throw new Error(`Department with id ${id} does not exist`);
//   }
//   return isExist.rows[0];
// };

// // update a specific Employee
// const updateEmployeeFromDB = async (id: number, payload: any) => {
//   const { first_name, last_name, email, job_title, department_id } = payload;

//   const selectSql = `SELECT * FROM app1.employees WHERE id = $1`;
//   const isExist = await pool.query(selectSql, [id]);
//   if (isExist.rows?.length === 0) {
//     throw new Error(`Department with id ${id} does not exist`);
//   }

//   const updatedSql = `UPDATE app1.employees
//   SET
//   first_name = $2,
//   last_name = $3,
//   email= $4,
//   job_title = $5,
//   department_id = $6
//   WHERE id = $1
//     RETURNING *`;
//   const result = await pool.query(updatedSql, [
//     id,
//     first_name,
//     last_name,
//     email,
//     job_title,
//     department_id,
//   ]);
//   return result.rows[0];
// };

// // delete a specific Employee
// const deleteEmployeeFromDB = async (id: number) => {
//   const selectSql = `SELECT * FROM app1.employees WHERE id = $1`;
//   const isExist = await pool.query(selectSql, [id]);
//   if (isExist.rows?.length === 0) {
//     throw new Error(`Employee with id ${id} does not exist`);
//   }

//   const deleteSql = `DELETE FROM app1.employees WHERE id = $1
//     RETURNING *`;
//   const result = await pool.query(deleteSql, [id]);
//   return result.rows[0];
// };

// export const EmployeeServices = {
//   createEmployeeIntoDB,
//   getEmployeesFromDB,
//   getSingleEmployeeFromDB,
//   updateEmployeeFromDB,
//   deleteEmployeeFromDB,
// };
