import { isValidObjectId } from "mongoose";
import createHttpError, { HttpError } from 'http-errors';

const validateInputId = (req, res, next) => {
  const {id} = req.params;
  if(!isValidObjectId(id)) {
    return next(createHttpError(404, `${id} is not the valid id`));
  }
  next();
};

export default validateInputId;
