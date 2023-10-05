import { ErrorResponse } from '@/types/response/error-response';
import {
  displayErrorModal,
  displayErrorToast,
  logoutForcibly,
  requestRefreshToken,
  transitionToLogin,
} from './handlers';
import {
  API_RESPONSE_HANDLING,
  RESPONSE_LEVEL,
} from '@/constants/response-code';

type ErrorHandling = {
  logoutForcibly?: (message: string) => Promise<void>;
  transitionToLogin?: (message: string) => Promise<void>;
  requestRefreshToken?: (message: string) => Promise<void>;
  displayErrorModal?: (message: string) => Promise<void>;
  displayErrorToast?: (message: string) => Promise<void>;
};

export const handleError = async (
  error?: ErrorResponse,
  errorHandling?: ErrorHandling
): Promise<string> => {
  let message = 'Unexpected Error';
  let handler = async (_: string) => {};

  if (!error) return message;

  if (API_RESPONSE_HANDLING.hasOwnProperty(error.code)) {
    const errorType = API_RESPONSE_HANDLING[error.code];
    message = errorType.message;
    switch (errorType.level) {
      case RESPONSE_LEVEL.Logout:
        handler = errorHandling?.logoutForcibly || logoutForcibly;
        message;
        break;
      case RESPONSE_LEVEL.Transition:
        (errorHandling?.transitionToLogin || transitionToLogin)(message);
        break;
      case RESPONSE_LEVEL.RequestRefreshToken:
        (errorHandling?.requestRefreshToken || requestRefreshToken)(message);
        break;
      case RESPONSE_LEVEL.Modal:
        (errorHandling?.displayErrorModal || displayErrorModal)(message);
        break;
      case RESPONSE_LEVEL.Toast:
        (errorHandling?.displayErrorToast || displayErrorToast)(message);
        break;
      case RESPONSE_LEVEL.None:
      default:
        break;
    }
  }

  await handler(message);

  return message;
};
