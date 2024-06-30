import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {

  if (err instanceof HttpError) {
    const { status, message, errors } = err;
    res.status(status).json({
      status,
      message,
      data: errors || err,
    });
    return;
  }

  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    data: err.message,
  });
};
