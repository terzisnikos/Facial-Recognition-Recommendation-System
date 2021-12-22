import React from 'react';
import { FastField } from 'formik';
import {ItemProps} from '../../../types/formik/item';

const ViewFormItem = (props: ItemProps) => {
  const {
    label,
    name,
  } = props;

  return (
    <FastField
      name={name}
    >
      {({ form }: ItemProps) => (
        <div className="form-group">
          <label className="col-form-label" htmlFor={name}>
            {label}
          </label>
          <input
            type="text"
            readOnly
            className="form-control-plaintext"
            id={name}
            value={form!.values[name!]}
          />
        </div>
      )}
    </FastField>
  );
}

export default ViewFormItem;
