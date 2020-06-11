const VALIDATION_MESSAGES: {[key: string]: ValidationMessageFunction} = {
  required: m`Field is required.`,
  minlength: m`Field must be at least ${'requiredLength'} characters long.`,
  maxlength: m`Field must be at most ${'requiredLength'} characters long.`,
  email: m`Field must be a proper email`,
  DEFAULT: m`Field have validation error: ${'errorKey'}`
};

function m(strings, ...keys) {
  return (errorKey: string, errorDetails: any) => {
    const result = [strings[0]];
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

export default VALIDATION_MESSAGES;
