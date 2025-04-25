import { Request, Response, NextFunction } from 'express';

const dangerousKeys = ['__proto__', 'constructor', 'prototype'];

function isPlainObject(obj: any): obj is Record<string, any> {
  return typeof obj === 'object' && obj !== null && !Array.isArray(obj);
}

function sanitizeValue(value: any): any {
  if (typeof value === 'string') {
    return value.trim();
  }

  if (Array.isArray(value)) {
    return value.map(sanitizeValue);
  }

  if (isPlainObject(value)) {
    const clean: Record<string, any> = {};
    for (const key in value) {
      if (
        Object.prototype.hasOwnProperty.call(value, key) &&
        !key.startsWith('$') &&
        !dangerousKeys.includes(key)
      ) {
        clean[key] = sanitizeValue(value[key]);
      }
    }
    return clean;
  }

  return value;
}

export function basicSanitize(req: Request, res: Response, next: NextFunction) {
  req.body = sanitizeValue(req.body);

  for (const key in req.query) {
    req.query[key] = sanitizeValue(req.query[key]);
  }
  req.params = sanitizeValue(req.params);
  next();
}
