const errMessages: Record<number, string> = {
  400: "Bad request!",
  401: "Unauthorized!",
  403: "Forbidden!",
  404: "Not found!",
  409: "Conflict!",
  500: "Server Error",
};

export interface CustomError extends Error {
  status: number;
}

const errorHandler = (status = 500, message = errMessages[status]) => {
  const err = Error();
  (err as unknown as CustomError).status = status;
  err.message = message;
  return err;
};

export default errorHandler;
