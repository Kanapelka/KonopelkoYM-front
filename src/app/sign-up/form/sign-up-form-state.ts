/* eslint-disable */
import InputError from '../../shared/blurred-text-field/input-error';

class SignUpFormState {
  public constructor(public emailAddress: string = '',
                     public password: string = '',
                     public confirmPassword: string = '',
                     public firstName: string = '',
                     public lastName: string = '',
                     public location: string = '',
                     public jobTitle: string = '',
                     public emailError: InputError = new InputError(),
                     public passwordError: InputError = new InputError(),
                     public confirmPasswordError: InputError = new InputError(),
                     public firstNameError: InputError = new InputError(),
                     public lastNameError: InputError = new InputError(),
                     public openAlert: boolean = false,
                     public alertMessage: string = '') {
  }
}

export default SignUpFormState;
