export class ValidationService {
  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    let config = {
      'required': 'Required',
      'minlength': `At least ${validatorValue.requiredLength} characters`,
      'pattern': `Only english letters`,
      'min':`Should be >= ${validatorValue.min}`
    };

    return config[validatorName];
  }
}
