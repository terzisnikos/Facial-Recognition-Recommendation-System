import React from 'react';
import FormErrors from 'components/FormItems/formErrors';
import { FastField } from 'formik';
import {ItemProps} from '../../../types/formik/item';

const CheckboxFormItem = (props: ItemProps) => {
  const {
    name,
    schema,
    hint,
    size,
    inputProps,
    errorMessage,
    required,
  } = props;

  const { label } = schema[name!];

  const sizeLabelClassName = {
    small: 'col-form-label-sm',
    large: 'col-form-label-lg',
  }[size!] || '';

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
              } ${sizeLabelClassName}`}
              htmlFor={name}
            >
              {label}
            </label>
          )}

          <div>
            <input
              type="checkbox"
              id={name}
              name={name}
              onChange={(event) => {
                form!.setFieldValue(
                  name,
                  !!event.target.checked,
                );
                form!.setFieldTouched(name);
              }}
              checked={!!form!.values[name!]}
              {...inputProps}
            />
          </div>

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

export default CheckboxFormItem;
