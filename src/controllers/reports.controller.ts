import * as ReportService from 'src/services/reports.service';
import { Request, Response } from 'express';

export const getEmployeeReport = async (req: Request, res: Response) => {
  const { id } = req.params;
  const report = await ReportService.getEmployeeReport(id);
  res.status(200).json(report);
};

export const getDepartmentReport = async (req: Request, res: Response) => {
  const { department } = req.params;
  const report = await ReportService.getDepartmentReport(department);
  res.status(200).json(report);
};
