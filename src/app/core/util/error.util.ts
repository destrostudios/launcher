import { ErrorCode } from '../../interfaces/error-code.enum';

export function getErrorMessage(error: any): string {
  const errorCode = getErrorCode(error);
  return errorCode || 'AN_UNEXPECTED_ERROR_OCCURRED';
}

export function getErrorCode(error: any): ErrorCode {
  if (error.error) {
    try {
      // Errors from backend currently come sometimes as string, sometimes as object
      const errorObject =
        typeof error.error === 'string' ? JSON.parse(error.error) : error.error;
      if (errorObject.type === 'destrostudios') {
        return errorObject.code;
      }
    } catch (e) {
      // Ignore
    }
  }
  return null;
}
