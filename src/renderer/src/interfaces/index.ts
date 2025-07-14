export interface IError {
  message: string
  code: number
}

export interface IValidationError {
  errors: {
    [key: string]: string;
  }
}

export interface IRes<T = undefined> {
  res?: T
  error?: IError | IValidationError
}