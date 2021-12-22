import React from 'react';
import {ItemProps} from '../../../types/formik/item';

const TextViewItem = (props: ItemProps) => {
  const { value, prefix, label } = props;

  if (!value && value !== 0 && value !== false) {
    return null;
  }

  const inputValue = `${prefix ? `${prefix} ` : ''}${value}`;

  return (
    <div className="form-group">
      <label className="col-form-label">
        {label}
      </label>

      <input
        type="text"
        readOnly
        className="form-control-plaintext"
        value={inputValue}
      />
    </div>
  );
}

export default TextViewItem;
