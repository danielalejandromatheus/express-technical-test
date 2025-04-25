import { Request, Response } from 'express';
import * as EmployeeService from 'src/services/employee.service';
import {
  CreateEmployeeDtoType,
  UpdateEmployeeDtoType,
  PaginateEmployeeDtoType,
} from 'src/entities/employee.dto';

export const getEmployees = async (
  req: Request,
  res: Response
) => {
  const query = req.query as unknown as PaginateEmployeeDtoType;
  const employees = await EmployeeService.getEmployees(query);
  res.status(200).json(employees);
};

export const getEmployeeById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const employee = await EmployeeService.getEmployeeById(id);
  res.status(200).json(employee);
};

export const createEmployee = async (
  req: Request<{}, {}, CreateEmployeeDtoType>,
  res: Response
) => {
  const data = req.body;
  req.body.manager = req.body.manager || req.user?.sub;
  const employee = await EmployeeService.createEmployee(data);
  res.status(201).json(employee);
};

export const updateEmployee = async (
  req: Request<{ id: string }, {}, UpdateEmployeeDtoType>,
  res: Response
) => {
  const { id } = req.params;
  const data = req.body;
  const employee = await EmployeeService.updateEmployee(id, data);
  res.status(200).json(employee);
};
