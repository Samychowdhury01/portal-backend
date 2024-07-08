import pool from '../../../server';
import { TDepartment } from './department.interface';

// create departments
const createDepartmentIntoDB = async (payload: TDepartment) => {
  const { id, name } = payload;
  const sql = `INSERT INTO app1.departments (id, name) 
                VALUES ($1, $2)
                RETURNING *`;
  const result = await pool.query(sql, [id, name]);
  return result.rows[0];
};

// get all departments
const getDepartmentsFromDB = async () => {
  const sql = `SELECT * FROM app1.departments`;
  const result = await pool.query(sql);
  return result.rows;
};

// get department by id
const getSingleDepartmentFromDB = async (id: number) => {
  const selectSql = `SELECT * FROM app1.departments WHERE id = $1`;
  const isExist = await pool.query(selectSql, [id]);
  if (isExist.rows?.length === 0) {
    throw new Error(`Department with id ${id} does not exist`);
  }
  return isExist.rows[0];
};
// update a specific department
const updateDepartmentFromDB = async (id: number, name: string) => {
  const selectSql = `SELECT * FROM app1.departments WHERE id = $1`;
  const isExist = await pool.query(selectSql, [id]);
  if (isExist.rows?.length === 0) {
    throw new Error(`Department with id ${id} does not exist`);
  }

  const updatedSql = `UPDATE app1.departments SET name = $2 WHERE id = $1
    RETURNING *`;
  const result = await pool.query(updatedSql, [id, name]);
  return result.rows[0];
};

// delete a specific department
const deleteDepartmentFromDB = async (id: number) => {
  const selectSql = `SELECT * FROM app1.departments WHERE id = $1`;
  const isExist = await pool.query(selectSql, [id]);
  if (isExist.rows?.length === 0) {
    throw new Error(`Department with id ${id} does not exist`);
  }

  const deleteSql = `DELETE FROM app1.departments WHERE id = $1
    RETURNING *`;
  const result = await pool.query(deleteSql, [id]);
  return result.rows[0];
};

export const DepartmentServices = {
  createDepartmentIntoDB,
  getDepartmentsFromDB,
  getSingleDepartmentFromDB,
  updateDepartmentFromDB,
  deleteDepartmentFromDB,
};
