import { EmployeeModel } from 'src/models/employee.model';
import { NotFoundException } from 'src/utils/exceptions/http.exception';

export const getEmployeeReport = async (id: string) => {
  const employee = await EmployeeModel.findById(id).populate({
    path: 'evaluations',
    populate: {
      path: 'evaluation',
      model: 'Evaluation',
    },
  });
  if (!employee) {
    throw new Error('Employee not found');
  }
  if (!employee.evaluations) {
    return employee;
  }
  const evaluationsWithScores = await Promise.all(
    employee.evaluations.map(async (answer) => {
      const score = await answer.getScore();
      return {
        ...answer.toJSON(), // convert to plain object
        score,
      };
    })
  );
  return {
    data: {
      ...employee.toJSON(),
      evaluations: evaluationsWithScores,
      overallScore: evaluationsWithScores.reduce(
        (acc: number, evaluation: any) => acc + evaluation.score,
        0
      ),
    },
  };
};

export const getDepartmentReport = async (id: string) => {
  const employees = await EmployeeModel.find({ department: id }).populate({
    path: 'evaluations',
    populate: {
      path: 'evaluation',
      model: 'Evaluation',
    },
  });

  if (!employees || employees.length === 0) {
    throw new NotFoundException('Department not found');
  }

  const report = await Promise.all(
    employees.map(async (employee) => {
      if (!employee.evaluations)
        return {
          employee,
          evaluations: [],
        };
      const evaluationsWithScores = await Promise.all(
        employee.evaluations.map(async (answer) => {
          const score = await answer.getScore();
          return {
            ...answer.toJSON(),
            score,
          };
        })
      );

      return {
        employee,
        evaluations: evaluationsWithScores,
      };
    })
  );

  return report;
};
