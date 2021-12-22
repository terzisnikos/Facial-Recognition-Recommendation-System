import React from 'react';
import FormErrors from 'components/FormItems/formErrors';
import { FastField } from 'formik';
// @ts-ignore
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ItemProps } from '../../../types/formik/item';

const DatePickerFormItem = (props: ItemProps) => {
  const {
    name,
    schema,
    hint,
    size,
    placeholder,
    autoFocus,
    autoComplete,
    inputProps,
    errorMessage,
    required = false,
    showTimeInput,
  } = props;

  const { label } = schema[name!];

  const sizeLabelClassName = {
    small: 'col-form-label-sm',
    large: 'col-form-label-lg',
  }[size!] || '';

  const sizeInputClassName = {
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
          )}{' '}
          <br />
          <DatePicker
            id={name}
            className={`form-control ${sizeInputClassName} ${FormErrors.validateStatus(
              form!,
              name!,
              errorMessage!,
            )}`}
            selected={form!.values[name!]}
            onChange={(value: any) => {
              form!.setFieldValue(name, value);
              form!.setFieldTouched(name);
            }}
            showTimeInput={showTimeInput}
            popperModifiers={{
              preventOverflow: {
                enabled: true,
                escapeWithReference: false,
              },
            }}
            placeholderText={placeholder || ''}
            autoFocus={autoFocus || undefined}
            autoComplete={autoComplete || undefined}
            dateFormat={
              showTimeInput
                ? 'yyyy-MM-dd HH:mm'
                : 'yyyy-MM-dd'
            }
            timeIntervals={15}
            {...inputProps}
          />
          <div className="invalid-feedback">
            {FormErrors.displayableError(
              form!,
              name!,
              errorMessage,
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

export default DatePickerFormItem;
