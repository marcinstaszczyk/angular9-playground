const VALIDATION_MESSAGES: ValidationMessagesDict = {
  required: m`Field is required.`,
  minlength: m`Must be at least ${'requiredLength'} characters long.`,
  maxlength: m`Must be at most ${'requiredLength'} characters long.`,
  email: m`Must be a proper email`,
  DEFAULT: m`Field have validation error: ${'errorKey'}`
};

export function m(strings: TemplateStringsArray, ...keys: any[]) {
  return (errorKey: string, errorDetails: any) => {
    const result: string[] = [strings[0]];
    keys.forEach((key, i) => {
      switch (key) {
        case 'details':
          result.push(errorDetails);
          break;
        case 'errorKey':
          result.push(errorKey);
          break;
        default:
          result.push(errorDetails[key]);
      }
      result.push(strings[i + 1]);
    });
    return result.join('');
  };
}

export type ValidationMessageFunction = (errorKey: string, errorDetails: any) => string;
export type ValidationMessagesDict = {[key: string]: ValidationMessageFunction};

export default VALIDATION_MESSAGES;
