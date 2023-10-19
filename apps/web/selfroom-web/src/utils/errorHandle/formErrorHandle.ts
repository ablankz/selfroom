import { API_RESPONSE_TYPES } from "@/constants/backend-response";
import { ErrorResponse } from "@/types/response/error-response";
import { Path, UseFormSetError } from "react-hook-form";

type InputData = {
  [key: string]: any;
};

const validationErrorSetter = <T extends InputData>(
  error: ErrorResponse,
  setError: UseFormSetError<T>
) => {
  let errors = error.errorAttributes || {};
  for (const key of Object.keys(errors) as (keyof T)[]) {
    setError(key as Path<T>, {
      type: "manual",
      message: error.errorAttributes[key as string][0],
    });
  }
};

const formErrorHandle = <T extends InputData>(
  error: ErrorResponse,
  setError: UseFormSetError<T>
) => {
  switch(error.code){
    case API_RESPONSE_TYPES.Validation:
      validationErrorSetter<T>(error, setError);
  }
};

export { formErrorHandle };
