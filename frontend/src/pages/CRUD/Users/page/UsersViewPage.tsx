import React, { useEffect } from 'react';
import UsersWidget from 'pages/CRUD/Users/page/UsersWidget';
import actions from 'store/actions/users/usersFormActions';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { useParams } from 'react-router';

const UsersViewPage = () => {
  const loading = useTypedSelector(store => store.users.form.findLoading);
  const record = useTypedSelector(store => store.users.form.record);
  const dispatch = useDispatch();
  const { id } = useParams<any>();

  useEffect(() => {
    dispatch(actions.doFind(id))
  }, [id]);

  return (
    <React.Fragment>
      <UsersWidget
      loading={loading}
      record={record}
      />
    </React.Fragment>
  );
}

export default UsersViewPage;
