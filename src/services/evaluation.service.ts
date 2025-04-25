// getEvaluations
// getEvaluationsPending (to user/employee)
// getEvaluationById
// createEvaluation
// updateEvaluation
// submitEvaluation

import { AnswerModel } from 'src/models/answer.model';
import {
  EvaluationDocument,
  EvaluationModel,
} from 'src/models/evaluation.model';
import { Role } from 'src/types/user';
import { NotFoundException } from 'src/utils/exceptions/http.exception';
import {
  PaginateEvaluationDtoType,
  SubmitEvaluationDtoType,
  CreateEvaluationDtoType,
  UpdateEvaluationDtoType,
} from 'src/entities/evaluation.dto';

export const getEvaluations = async (params: PaginateEvaluationDtoType) => {
  const { page, limit, query, field = 'name', orderBy, order = 'asc' } = params;
  const filter: Record<string, any> = {};

  const sort: Record<string, 1 | -1> = {
    [orderBy || 'createdAt']: order === 'asc' ? 1 : -1,
  };
  let data: EvaluationDocument[] = [];
  let total = 0;
  const skip = (page - 1) * limit;

  // Handle special fields using statics
  if (field === 'manager' && query) {
    data = await EvaluationModel.findByManager(query)
      .sort(sort)
      .skip(skip)
      .limit(limit);
    total = await EvaluationModel.countDocuments({ manager: query });
  } else if (field === 'answers.user' && query) {
    data = await EvaluationModel.findDoneByUser(query)
      .sort(sort)
      .skip(skip)
      .limit(limit);
    total = await EvaluationModel.countDocuments({ 'answers.user': query });
  } else {
    // Generic search
    const filter: Record<string, any> = {};
    if (query) {
      filter[field] = { $regex: query, $options: 'i' };
    }

    [data, total] = await Promise.all([
      EvaluationModel.find(filter).sort(sort).skip(skip).limit(limit),
      EvaluationModel.countDocuments(filter),
    ]);
  }

  return {
    data,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};
export const getPendingEvaluations = async (userId: string) => {
  const data = await EvaluationModel.findPendingByUser(userId);
  return { data };
};

export const getEvaluationById = async (id: string, userRole: Role) => {
  const evaluation = await EvaluationModel.findById(id).populate({
    path: 'questions',
    ...(userRole === 'employee' ? { select: '-answer' } : {}),
  });
  if (!evaluation) {
    throw new NotFoundException('Evaluation not found');
  }
  return evaluation;
};

export const createEvaluation = async (data: CreateEvaluationDtoType) => {
  const evaluation = new EvaluationModel(data);
  await evaluation.save();
  return evaluation;
};

export const updateEvaluation = async (
  id: string,
  updateData: UpdateEvaluationDtoType
) => {
  const evaluation = await EvaluationModel.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  if (!evaluation) {
    throw new NotFoundException('Evaluation not found');
  }
  return evaluation;
};

export const submitEvaluation = async (
  id: string,
  user: string,
  submissionData: SubmitEvaluationDtoType
) => {
  const evaluation = await EvaluationModel.findById(id);
  if (!evaluation) {
    throw new Error('Evaluation not found');
  }
  // check if user already submit evaluation
  const existingAnswer = await AnswerModel.findOne({
    user,
    evaluation: id,
  });
  if (existingAnswer) {
    throw new Error('Evaluation already submitted');
  }
  const answers = new AnswerModel({
    user,
    evaluation,
    answers: submissionData.answers,
  });
  await answers.save();

  return answers;
};
