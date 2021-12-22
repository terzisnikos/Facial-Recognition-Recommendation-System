import { FastField } from 'formik';
import React from 'react';
import FormErrors from 'components/FormItems/formErrors';
// @ts-ignore
import AsyncSelect from 'react-select/async';
import { ItemProps } from '../../../types/formik/item';

const AUTOCOMPLETE_SERVER_FETCH_SIZE = 100;

const AutocompleteFormItem = (props: ItemProps) => {
  const {
    form,
    name,
    mapper,
    schema,
    fetchFn,
    hint,
    size,
    placeholder,
    autoFocus,
    inputProps,
    errorMessage,
    isClearable = true,
    mode = 'default',
    required = false,
  } = props;

  const { label } = schema[name!];

  const valueOne = () => {
    if (form!.values[name!]) {
      return mapper!.intoSelect(form!.values[name!])
    }
    return '';
  };

  const valueMultiple = () => {
    if (form!.values[name!]) {
      return form!.values[name!].map((value: object) => mapper!.intoSelect(value))
    }
    return [];
  };

  const value = () => {
    return (mode === 'multiple')
      ? valueMultiple()
      : valueOne()
  };

  const handleSelectOne = (value: object) => {
    if (!value) {
      form!.setFieldValue(name, '');
      return;
    }
    form!.setFieldValue(name, mapper!.intoValue(value));
  };

  const handleSelectMultiple = (values: Array<any>) => {
    if (!values) {
      form!.setFieldValue(name, []);
      return;
    }

    form!.setFieldValue(
      name,
      values.map((value) => mapper!.intoValue(value))
    );
  }

  const handleSelect = (value: object | Array<any>) => {
    form!.setFieldTouched(name);
    if (mode === 'multiple' && Array.isArray(value)) {
      return handleSelectMultiple(value);
    } else {
      return handleSelectOne(value);
    }
  };

  const handleSearch = async (value: object) => {
    try {
      const results = await fetchFn!(
        value,
        AUTOCOMPLETE_SERVER_FETCH_SIZE,
      );
      return results.map((result: string) => mapper!.intoSelect(result));

    } catch (error) {
      console.error(error);
      return [];
    }
  }

  const sizeLabelClassName = {
    small: 'col-form-label-sm',
    large: 'col-form-label-lg',
  }[size!] || '';

  const isInvalid = !!FormErrors.displayableError(
    form!,
    name!,
    errorMessage!,
  );

  const controlStyles = isInvalid
    ? {
      control: (provided: React.CSSProperties) => ({
        ...provided,
        borderColor: 'red',
      }),
    }
    : undefined;

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
          <div style={{ display: 'flex' }}>
            <AsyncSelect
              className="w-100"
              styles={controlStyles}
              id={name}
              name={name}
              defaultOptions={true}
              isMulti={mode === 'multiple' ? true : false}
              loadOptions={handleSearch}
              placeholder={placeholder || ''}
              autoFocus={autoFocus || undefined}
              onChange={handleSelect}
              value={value()}
              isClearable={isClearable}
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

export default AutocompleteFormItem;
