/* eslint-disable @typescript-eslint/no-explicit-any */
import pool from '../../../server';
import { TDropItems } from './dropItem.interface';

const createItemIntoDB = async (payload: TDropItems) => {
  const { username, jobTitle, email, departmentId, expanded, item_order } = payload;
  console.log(payload);
  const existSql = `SELECT * FROM app1.items WHERE username = $1`;
  const isItemExist = await pool.query(existSql, [username]);

  if (isItemExist.rows?.length) {
    throw new Error(`item with username ${username} already exist`);
  }

  const sql = `
INSERT INTO app1.items  (username, job_title, email, department_id, expanded, item_order) 
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *`;

  const { rows } = await pool.query(sql, [
    username,
    jobTitle,
    email,
    departmentId,
    expanded,
    item_order
  ]);

  return rows[0];
};

const getItemsFromDB = async () => {
  const sql = `SELECT * FROM app1.items ORDER BY item_order ASC`;

  const { rows } = await pool.query(sql);

  return rows;
};

// update Items From DB
const updateItemsFromDB = async (payload: any[]) => {
  // map through the items
  const updateQueries = payload.map(async (item) => {
    const { username, job_title, email, department_id, expanded, id } = item;
    const sql = `UPDATE app1.items SET username = $1, job_title = $2
    , email = $3, department_id = $4, expanded = $5 
    WHERE id =$6 RETURNING *`;
    return await pool.query(sql, [
      username,
      job_title,
      email,
      department_id,
      expanded,
      id,
    ]);
  });

  // wait for all promises to resolve
  const results = await Promise.all(updateQueries);

  // return the resolved values
  return results.map((result) => result.rows[0]);
};
// update Items From DB
const updateItemsOrderFromDB = async (payload: any[]) => {
  // map through the items
  const updateQueries = payload.map((item, index) => {
    return pool.query('UPDATE app1.items SET item_order = $1 WHERE id = $2', [
      index,
      item.id,
    ]);
  });

  // wait for all promises to resolve
  const results = await Promise.all(updateQueries);

  // return the resolved values
  return results.map((result) => result.rows[0]);
};

// delete a specific Employee
const deleteItemFromDB = async (id: number) => {
  const selectSql = `SELECT * FROM app1.items WHERE id = $1`;
  const isExist = await pool.query(selectSql, [id]);
  if (isExist.rows?.length === 0) {
    throw new Error(`Employee with id ${id} does not exist`);
  }

  const deleteSql = `DELETE FROM app1.items WHERE id = $1
    RETURNING *`;
  const result = await pool.query(deleteSql, [id]);
  return result.rows[0];
};

export const DropItemsServices = {
  createItemIntoDB,
  getItemsFromDB,
  updateItemsFromDB,
  updateItemsOrderFromDB,
  deleteItemFromDB
};
