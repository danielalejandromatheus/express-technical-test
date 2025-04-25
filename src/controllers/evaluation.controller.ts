import * as EvaluationService from 'src/services/evaluation.service';
import { Request, Response } from 'express';
import {
  PaginateEvaluationDtoType,
  CreateEvaluationDtoType,
  SubmitEvaluationDtoType,
  UpdateEvaluationDtoType,
} from 'src/entities/evaluation.dto';
export const getEvaluations = async (req: Request, res: Response) => {
  const query = req.query as unknown as PaginateEvaluationDtoType;
  const evaluations = await EvaluationService.getEvaluations(query);
  res.status(200).json(evaluations);
};
export const getPendingEvaluations = async (req: Request, res: Response) => {
  const userId = req.user?.sub || '';
  const evaluations = await EvaluationService.getPendingEvaluations(userId);
  res.status(200).json(evaluations);
};

export const getEvaluationById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userRole = req.user?.role || 'employee';
  const evaluation = await EvaluationService.getEvaluationById(id, userRole);
  res.status(200).json(evaluation);
};

export const createEvaluation = async (
  req: Request<{}, {}, CreateEvaluationDtoType>,
  res: Response
) => {
  if (!req.body.manager) {
    req.body.manager = req.user?.sub;
  }
  const evaluation = await EvaluationService.createEvaluation(req.body);
  res.status(201).json(evaluation);
};

export const updateEvaluation = async (
  req: Request<{ id: string }, {}, UpdateEvaluationDtoType>,
  res: Response
) => {
  const { id } = req.params;
  const evaluation = await EvaluationService.updateEvaluation(id, req.body);
  res.status(201).json(evaluation);
};

export const submitEvaluation = async (
  req: Request<{ id: string }, {}, SubmitEvaluationDtoType>,
  res: Response
) => {
  const { id } = req.params;
  const user = req.user?.sub || '';
  const evaluation = await EvaluationService.submitEvaluation(
    id,
    user,
    req.body
  );
  res.status(201).json(evaluation);
};
