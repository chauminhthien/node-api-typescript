export interface IError {
  code: string;
  message: string;
  details: Array<any> | string
}

export interface IOptionError {
  statusCode: number;
}