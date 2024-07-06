import pool from '../../../server';
import { TEmployee } from './employee.interface';

// create departments
const createEmployeeIntoDB = async (payload: TEmployee) => {
  const { firstName, lastName, email, jobTitle, departmentId } = payload;
  const sql = `INSERT INTO app1.employees (first_name, last_name, email, job_title, department_id) 
                VALUES ($1, $2, $3, $4, $5)
                RETURNING *`;
  const result = await pool.query(sql, [
    firstName,
    lastName,
    email,
    jobTitle,
    departmentId,
  ]);
  return result.rows[0];
};

// get all departments
const getEmployeesFromDB = async () => {
  const sql = `
  SELECT 
    e.first_name,
    e.last_name,
    e.email,
    e.job_title,
    d.name AS department_name
  FROM 
    app1.employees e
  JOIN 
    app1.departments d
  ON 
    e.department_id = d.id;

    `;
  const result = await pool.query(sql);
  return result.rows;
};

// // get department by id
// const getSingleDepartmentFromDB = async (id: number,) => {
//   const selectSql = `SELECT * FROM app1.departments WHERE id = $1`;
//   const isExist = await pool.query(selectSql, [id]);
//   if (isExist.rows?.length === 0) {
//     throw new Error(`Department with id ${id} does not exist`);
//   }
//   return isExist.rows[0]
// }
// // update a specific department
// const updateDepartmentsFromDB = async (id: number, name: string) => {
//   const selectSql = `SELECT * FROM app1.departments WHERE id = $1`;
//   const isExist = await pool.query(selectSql, [id]);
//   if (isExist.rows?.length === 0) {
//     throw new Error(`Department with id ${id} does not exist`);
//   }

//   const updatedSql = `UPDATE app1.departments SET name = $2 WHERE id = $1
//     RETURNING *`;
//   const result = await pool.query(updatedSql, [id, name]);
//   return result.rows[0];
// };

// // delete a specific department
// const deleteDepartmentsFromDB = async (id: number) => {
//   const selectSql = `SELECT * FROM app1.departments WHERE id = $1`;
//   const isExist = await pool.query(selectSql, [id]);
//   if (isExist.rows?.length === 0) {
//     throw new Error(`Department with id ${id} does not exist`);
//   }

//   const deleteSql = `DELETE FROM app1.departments WHERE id = $1
//     RETURNING *`;
//   const result = await pool.query(deleteSql, [id]);
//   return result.rows[0];
// };

export const EmployeeServices = {
  createEmployeeIntoDB,
  getEmployeesFromDB,
  // getSingleDepartmentFromDB,
  // updateDepartmentsFromDB,
  // deleteDepartmentsFromDB,
};
