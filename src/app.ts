import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { DepartmentRouter } from './app/modules/department/department.routes';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/departments', DepartmentRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
