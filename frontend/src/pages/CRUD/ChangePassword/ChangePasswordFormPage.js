import React from 'react';
import ChangePasswordForm from 'pages/CRUD/ChangePassword/ChangePasswordForm';
import { push } from 'connected-react-router';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../../store/actions/passwordActions';

const ChangePasswordFormPage = () => {

  const dispatch = useDispatch();
  const findLoading = useSelector((store) => store.users.form.findLoading);
  const saveLoading = useSelector((store) => store.users.form.saveLoading);

  const doSubmit = (data) => {
    dispatch(actions.doChangePassword(data));
  }

  return (
    <React.Fragment>
      <ChangePasswordForm
        saveLoading={saveLoading}
        findLoading={findLoading}
        onSubmit={doSubmit}
        onCancel={() => dispatch(push('/app/dashboard'))}
      />
    </React.Fragment>
  );
}

export default ChangePasswordFormPage;
