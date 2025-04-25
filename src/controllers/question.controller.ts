import { Request, Response } from 'express';
import { PaginateQuestionDtoType } from 'src/entities/question.dto';
import * as QuestionService from 'src/services/question.service';
export const getQuestions = async (req: Request, res: Response) => {
  const query = req.query as unknown as PaginateQuestionDtoType;
  const questions = await QuestionService.getQuestions(query);
  res.status(200).json(questions);
};
export const getQuestionById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const question = await QuestionService.getQuestionById(id);
  res.status(200).json(question);
};
export const createQuestion = async (req: Request, res: Response) => {
  const question = await QuestionService.createQuestion(req.body);
  res.status(201).json(question);
};
export const updateQuestion = async (req: Request, res: Response) => {
  const { id } = req.params;
  const question = await QuestionService.updateQuestion(id, req.body);
  res.status(200).json(question);
};
