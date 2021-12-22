import {FormikProps} from 'formik';

export type ItemProps = {
  form?: {
    [rest: string]: any
  },
  name?: string,
  mapper?: {
    [rest: string]: any
  },
  schema?: any,
  fetchFn?: Function,
  hint?: string,
  size?: string | number,
  placeholder?: string,
  autoFocus?: boolean,
  inputProps?: any,
  errorMessage?: string,
  isClearable?: boolean,
  mode?: string,
  required?: boolean,
  password?: string;
  autoComplete?: any;
  path?: string;
  fileProps?: any;
  max?: any;
  label?: string;
  showCreate?: boolean;
  hasPermissionToCreate?: any;
  value?: any;
  prefix?: string;
  type?: string;
  showTimeInput?: boolean;
}
