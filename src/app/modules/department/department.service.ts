import pool from "../../../server"
import { TDepartment } from "./department.interface"


const createDepartmentIntoDB = async(payload : TDepartment) =>{
    const {id, name} = payload
    const sql = `INSERT INTO app1.departments (id, name) 
                VALUES ($1, $2)
                RETURNING *`
    const client = await pool.query(sql, [id, name])
    console.log(client, 'from line 11 service');
    return client.rows[0]
}

export const DepartmentServices = {
    createDepartmentIntoDB
}