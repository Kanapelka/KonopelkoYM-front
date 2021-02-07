// eslint-disable-next-line max-len
const validateEmailAddressPattern = '(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])';

class SignUpValidationService {
  static ValidateEmailAddress(emailAddress: string) : boolean {
    const validateEmailAddressRegExpr = new RegExp(validateEmailAddressPattern);
    return validateEmailAddressRegExpr.test(emailAddress);
  }

  static ValidatePasswordIsStrong(password: string): boolean {
    // password has to include at least one digit and capital letter,
    // additionally it should be 8 or more chas longer
    return /\d/.test(password) && /[a-zA-Z]/.test(password) && password.length >= 8;
  }

  static ValidateName(name: string): boolean {
    return name.length >= 1;
  }
}

export default SignUpValidationService;
