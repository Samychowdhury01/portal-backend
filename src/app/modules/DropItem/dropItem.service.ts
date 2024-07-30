/* eslint-disable @typescript-eslint/no-explicit-any */
import pool from '../../../server';
import { TDropItems } from './dropItem.interface';

const createItemIntoDB = async (payload: TDropItems) => {
  const { username, job_title, email, department_id, expanded, item_order } =
    payload;

  const existSql = `SELECT * FROM app1.items WHERE username = $1`;
  const isItemExist = await pool.query(existSql, [username]);

  if (isItemExist.rows?.length) {
    throw new Error(`item with username ${username} already exist`);
  }

  const itemsSql = `
INSERT INTO app1.items  (username, job_title, email, department_id) 
VALUES ($1, $2, $3, $4)
RETURNING *`;

  const { rows } = await pool.query(itemsSql, [
    username,
    job_title,
    email,
    department_id,
  ]);

  if (rows.length) {
    const itemsOrderSql = `
    INSERT INTO app1.items_order  (employee_id, expanded, item_order) 
    VALUES ($1, $2, $3)
    RETURNING *`;
    const { rows: itemsOrderRows } = await pool.query(itemsOrderSql, [
      rows[0].id,
      expanded,
      item_order,
    ]);
    return {
      ...rows[0],
      ...itemsOrderRows[0],
    };
  }
};

const getItemsFromDB = async () => {
  // const sql = `SELECT * FROM app1.items ORDER BY item_order ASC`;
  const sql = `
  SELECT 
  i.id,
  i.username,
  i.job_title,
  i.email,
  i.department_id,
  io.expanded,
  io.item_order
  FROM 
  app1.items i
  JOIN 
  app1.items_order io 
  ON 
  i.id = io.employee_id
  ORDER BY 
  io.item_order ASC`;

  const { rows } = await pool.query(sql);

  return rows;
};

// update items from DB
const updateItemsFromDB = async (payload: any[]) => {
  // map through the items
  const updateQueries = payload.map(async (item) => {
    const { username, job_title, email, department_id, id, expanded } = item;
    const sql = `
    UPDATE app1.items 
    SET username = $1, job_title = $2, email = $3, department_id = $4 
    WHERE id = $5 
    RETURNING *`;

    const itemsResult = await pool.query(sql, [
      username,
      job_title,
      email,
      department_id,
      id,
    ]);

    const itemsOrderSql = `
    UPDATE app1.items_order 
    SET expanded = $1
    WHERE employee_id = $2 
    RETURNING *`;

    const itemsOrderResult = await pool.query(itemsOrderSql, [expanded, id]);

    return {
      ...itemsResult.rows[0],
      ...itemsOrderResult.rows[0],
    };
  });

  // wait for all promises to resolve
  const results = await Promise.all(updateQueries);

  // return the resolved values
  return results.map((result) => result);
};
// update Items From DB
const updateItemsOrderFromDB = async (payload: any[]) => {
  // map through the items
  const updateQueries = payload.map((item, index) => {
    return pool.query(
      'UPDATE app1.items_order SET item_order = $1 WHERE employee_id = $2',
      [index, item.id],
    );
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
  deleteItemFromDB,
};

/**
 *
 * emp_id
 * position
 * widget_state
 */
