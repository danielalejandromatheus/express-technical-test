import {
  CreateQuestionDtoType,
  PaginateQuestionDtoType,
  UpdateQuestionDtoType,
} from 'src/entities/question.dto';
import { QuestionModel } from 'src/models/question.model';
import { NotFoundException } from 'src/utils/exceptions/http.exception';

export const getQuestions = async (params: PaginateQuestionDtoType) => {
  const {
    page,
    limit,
    query,
    field = 'evaluation',
    orderBy,
    order = 'asc',
  } = params;
  const filter: Record<string, any> = {};

  if (query) {
    filter[field] = query;
  }
  const sort: Record<string, 1 | -1> = {
    [orderBy || 'createdAt']: order === 'asc' ? 1 : -1,
  };

  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    QuestionModel.find(filter).sort(sort).skip(skip).limit(limit),
    QuestionModel.countDocuments(filter),
  ]);

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

export const getQuestionById = async (id: string) => {
  const question = await QuestionModel.findById(id);
  if (!question) {
    throw new NotFoundException('Question not found');
  }
  return question;
};

export const createQuestion = async (data: CreateQuestionDtoType) => {
  const question = new QuestionModel(data);
  await question.save();
  return question;
};

export const updateQuestion = async (
  id: string,
  data: UpdateQuestionDtoType
) => {
  const question = await QuestionModel.findByIdAndUpdate(id, data, {
    new: true,
  });
  if (!question) {
    throw new NotFoundException('Question not found');
  }
  return question;
};
