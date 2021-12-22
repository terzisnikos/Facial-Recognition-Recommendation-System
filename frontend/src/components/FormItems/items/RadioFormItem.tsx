import React from 'react';
import FormErrors from 'components/FormItems/formErrors';
import { FastField } from 'formik';
import {ItemProps} from '../../../types/formik/item';

const RadioFormItem = (props: ItemProps) => {
  const {
    name,
    schema,
    hint,
    errorMessage,
    required = false
  } = props;

  const { label, options } = schema[name!];

  return (
    <FastField
      name={name}
    >
      {({ form }: ItemProps) => (
        <div className="form-group">
          {!!label && (
            <label
              className={`col-form-label ${
                required ? 'required' : null
              }`}
            >
              {label}
            </label>
          )}

          <br />

          {options.map((option: {[rest: string]: any}) => (
            <div
              key={option.value}
              className="form-check form-check-inline"
            >
              <input
                className={`form-check-input ${FormErrors.validateStatus(
                  form!,
                  name!,
                  errorMessage!,
                )}`}
                type="radio"
                id={`${name}-${option.value}`}
                name={`${name}-${option.value}`}
                value={option.value}
                checked={option.value === form!.values[name!]}
                onChange={(e) => {
                  form!.setFieldValue(name, e.target.value);
                  form!.setFieldTouched(name);
                }}
              />
              <label
                htmlFor={`${name}-${option.value}`}
                className="form-check-label"
              >
                {option.label}
              </label>
            </div>
          ))}

          <div className="invalid-feedback">
            {FormErrors.displayableError(
              form!,
              name!,
              errorMessage!,
            )}
          </div>

          {!!hint && (
            <small className="form-text text-muted">
              {hint}
            </small>
          )}
        </div>
      )}
    </FastField>
  )
}

export default RadioFormItem;
