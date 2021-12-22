import { FormErrorsValues } from '../../types/formik/formErrors';

export default class FormErrors implements FormErrorsValues{
  static displayableError(
      form: {
        [rest: string]: any
      },
      fieldName: string,
      externalErrorMessage?: null | string,
  ) {
    if (externalErrorMessage) {
      return externalErrorMessage;
    }

    if (!form.touched[fieldName]) {
      return null;
    }

    const errors = form.errors[fieldName];

    if (!errors) {
      return null;
    }

    if (Array.isArray(errors)) {
      return errors[0];
    }

    return errors;
  }

  static validateStatus(
      form: {
        [rest: string]: any
      },
      fieldName: string,
      externalErrorMessage: null | string,
  ) {
    if (
        this.displayableError(
            form,
            fieldName,
            externalErrorMessage,
        )
    ) {
      return 'is-invalid';
    }

    return '';
  }
}
