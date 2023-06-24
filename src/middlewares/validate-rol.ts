import { NextFunction, Response } from "express";
import { AuthenticatedRequest, Role } from "../utilities/types";

const isAdminRole = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

  if (!req.user) {
    return res.status(500).json({
      msg: 'Something wrong, it wants to verify role without validate the token first'
    });
  }

  const { rol, name } = req.user

  if (rol !== 'ADMIN_ROLE') {
    return res.status(401).json({
      msg: `Something wrong, ${name} not is admin`
    });
  }

  next();
  return;
}

const hasRole = (...roles: Role[]) => {

  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

    if (!req.user) {
      return res.status(500).json({
        msg: 'Something wrong, it wants to verify role without validate the token first'
      });
    }

    if (!roles.includes(req.user.rol)) {
      return res.status(401).json({
        msg: `Something wrong, service requires one of this roles: ${roles}`
      });
    }
    
    next()

    return;
  }

}

export {
  isAdminRole,
  hasRole
}