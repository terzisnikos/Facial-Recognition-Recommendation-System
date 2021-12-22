import React from 'react';
import FormErrors from 'components/FormItems/formErrors';
import { FastField } from 'formik';
import { ItemProps } from '../../../types/formik/item';

const InputFormItem = (props: ItemProps) => {
  const {
    name,
    schema,
    hint,
    size,
    password,
    placeholder,
    autoFocus,
    autoComplete,
    inputProps,
    errorMessage,
    required = false,
  } = props;

  const { label } = schema[name!];

  const sizeLabelClassName =
    {
      small: 'col-form-label-sm',
      large: 'col-form-label-lg',
    }[size!] || '';

  const sizeInputClassName =
    {
      small: 'form-control-sm',
      large: 'form-control-lg',
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
          <input
            id={name}
            type={password ? 'password' : 'text'}
            onChange={(event) => {
              form!.setFieldValue(name, event.target.value);
              form!.setFieldTouched(name);
            }}
            value={form!.values[name!] || ''}
            placeholder={placeholder || undefined}
            autoFocus={autoFocus || undefined}
            autoComplete={autoComplete || undefined}
            className={`form-control ${sizeInputClassName} ${FormErrors.validateStatus(
              form!,
              name!,
              errorMessage!,
            )}`}
            {...inputProps}
          />
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
  );
}

export default InputFormItem;
