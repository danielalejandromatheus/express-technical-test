import { NextFunction } from 'express';
import { ForbiddenException } from 'src/utils/exceptions/http.exception';
import { Request, Response } from 'express';
import { Role } from 'src/types/user';
import { ROLES } from 'src/consts/user';
export const hasRole =
  (role: Role) => (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const roleIndex = ROLES.indexOf(role);
    // This slice allows role by prio
    const allowedRoles = ROLES.slice(0, roleIndex + 1);
    if (!user || !allowedRoles.includes(user.role)) {
      throw new ForbiddenException(
        'You do not have permission to access this resource.'
      );
    }
    next();
  };
