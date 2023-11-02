import { AxiosError } from "axios";
import { ApplicationResponse } from "./application-response";

export type ErrorResponse = ApplicationResponse<null>;

export const isApplicationErrorResponse = (obj: any): obj is AxiosError<ErrorResponse> => {
  return obj.hasOwnProperty('response') 
  && obj.response.data.hasOwnProperty('success')
  && obj.response.data.hasOwnProperty('errorAttributes')
};