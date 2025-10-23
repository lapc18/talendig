import { Request, Response, NextFunction } from 'express';
import { ApiResponse, ErrorResponse } from '../types/response.types';

export const sendSuccess = <T>(res: Response, data: T, message?: string): void => {
  const response: ApiResponse<T> = {
    success: true,
    data,
    message: message || '',
    timestamp: new Date().toISOString()
  };
  res.json(response);
};

export const sendError = (res: Response, error: string, message: string, statusCode: number = 500): void => {
  const response: ErrorResponse = {
    success: false,
    error,
    message,
    timestamp: new Date().toISOString()
  };
  res.status(statusCode).json(response);
};

export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
