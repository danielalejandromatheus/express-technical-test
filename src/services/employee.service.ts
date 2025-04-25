import { EmployeeModel } from 'src/models/employee.model';
import { UserModel } from 'src/models/user.model';
import {
  NotFoundException,
  UnprocessableEntityException,
} from 'src/utils/exceptions/http.exception';
import {
  CreateEmployeeDtoType,
  PaginateEmployeeDtoType,
  UpdateEmployeeDtoType,
} from 'src/entities/employee.dto';

export const getEmployees = async (params: PaginateEmployeeDtoType) => {
  const {
    page,
    limit,
    query,
    field = 'fullName',
    orderBy,
    order = 'asc',
  } = params;
  const filter: Record<string, any> = {};

  if (query) {
    filter[field] = { $regex: query, $options: 'i' };
  }
  const sort: Record<string, 1 | -1> = {
    [orderBy || 'createdAt']: order === 'asc' ? 1 : -1,
  };

  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    EmployeeModel.find(filter).sort(sort).skip(skip).limit(limit),
    EmployeeModel.countDocuments(filter),
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

export const getEmployeeById = async (id: string) => {
  const employee = await EmployeeModel.findById(id);
  if (!employee) {
    throw new NotFoundException('Employee not found');
  }
  return employee;
};

export const createEmployee = async (data: CreateEmployeeDtoType) => {
  const userExists = await UserModel.findOne({ email: data.user.email });
  if (userExists)
    throw new UnprocessableEntityException({ message: 'User already exists' });
  console.log('data', data);
  const manager = await UserModel.findById(data.manager);
  if (!manager) throw new NotFoundException('Manager does not exist');
  const user = new UserModel({
    ...data.user,
    name: `${data.firstName} ${data.lastName}`,
  });
  await user.save();
  const employee = new EmployeeModel({
    ...data,
    user,
    manager,
  });
  await employee.save();
  return employee;
};

export const updateEmployee = async (
  id: string,
  data: UpdateEmployeeDtoType
) => {
  if (data.manager) {
    const manager = await UserModel.findById(data.manager);
    if (!manager) throw new NotFoundException('Manager does not exist');
  }
  const employee = await EmployeeModel.findByIdAndUpdate(
    id,
    { ...data },
    {
      new: true,
    }
  );
  if (!employee) {
    throw new NotFoundException('Employee not found');
  }
  return employee;
};
