const VALIDATION_MESSAGES: {[key: string]: ValidationMessageFunction} = {
  required: m`${'label'} is required.`,
  minlength: m`${'label'} must be at least ${'requiredLength'} characters long.`,
  maxlength: m`${'label'} must be at most ${'requiredLength'} characters long.`,
  email: m`${'label'} must be a proper email`,
  DEFAULT: m`${'label'} have validation error: ${'errorKey'}`
};

function m(strings, ...keys) {
  return (fieldLabel: string, errorKey: string, errorDetails: any) => {
    const result = [strings[0]];
    keys.forEach((key, i) => {
      switch (key) {
        case 'label':
          result.push(fieldLabel);
          break;
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

export type ValidationMessageFunction = (fieldLabel: string, errorKey: string, errorDetails: any) => string;

export default VALIDATION_MESSAGES;
