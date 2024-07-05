import pool from '../../../server';
import { TDepartment } from './department.interface';

const createDepartmentIntoDB = async (payload: TDepartment) => {
  const { id, name } = payload;
  const sql = `INSERT INTO app1.departments (id, name) 
                VALUES ($1, $2)
                RETURNING *`;
  const client = await pool.query(sql, [id, name]);
  console.log(client.rows, 'from line 11 service');
  return client.rows[0];
};
const getDepartmentsFromDB = async () => {
  const sql = `SELECT * FROM app1.departments`;
  const client = await pool.query(sql);
  return client.rows;
};

export const DepartmentServices = {
  createDepartmentIntoDB,
  getDepartmentsFromDB,
};
