import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { DepartmentRouter } from './app/modules/department/department.routes';
import { EmployeeRouter } from './app/modules/employee/employee.routes';
import { DropItemRouter } from './app/modules/DropItem/dropItem.routes';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/departments', DepartmentRouter);
app.use('/api/employees', EmployeeRouter);
app.use('/api/items', DropItemRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
